import {useMutation} from 'react-query';

interface Props {
  navigate: (text: string) => void;
}

import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const useSignOutFromGoogle = (navigation: Props) => {
  const signOut = async () => {
    await GoogleSignin.revokeAccess();
    return await GoogleSignin.signOut();
  };
  const {mutate, isLoading, isError, isSuccess} = useMutation(signOut, {
    onSuccess: () => {
      navigation.navigate('Auth');
    },
    onError: () => {
      navigation.navigate('PinCodeBackupAuth');
    },
  });

  return {mutate, isLoading, isError, isSuccess};
};
