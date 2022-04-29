import {useMutation} from 'react-query';

interface Props {
  navigate: (text: string) => void;
}
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import encryptedStorage from '../../services/encryptedStorage';
export interface ErrException extends Error {
  code?: string;
}
export const useSignInWithGoogle = (navigation: Props) => {
  const signInWithGoogle = () => {
    return GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    }).then(() => {
      return GoogleSignin.signIn();
    });
  };
  const {
    mutateAsync: signIn,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(signInWithGoogle, {
    onSuccess: async () => {
      const accessToken = (await GoogleSignin.getTokens()).accessToken;

      await encryptedStorage.saveUserGoogleAccessToken(accessToken);
    },
    onError: (error: ErrException) => {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('sign in cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('in progress ');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('play services not available');
      } else {
        // some other error happened
        console.log('some error happened');
        console.log(error);
      }
      navigation.navigate('PinCodeBackupAuth');
    },
  });

  return {signIn, isLoading, isError, isSuccess};
};
