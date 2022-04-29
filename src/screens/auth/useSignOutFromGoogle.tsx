import {useMutation} from 'react-query';

interface Props {
  navigate: (text: string) => void;
}

import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const useSignOutFromGoogle = (navigation: Props) => {
  const signOutFromGoogle = async () => {
    await GoogleSignin.revokeAccess();
    return await GoogleSignin.signOut();
  };
  const {
    mutate: signOut,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(signOutFromGoogle, {
    onSuccess: () => {
      navigation.navigate('Auth');
    },
    onError: () => {
      navigation.navigate('PinCodeBackupAuth');
    },
  });

  return {signOut, isLoading, isError, isSuccess};
};
