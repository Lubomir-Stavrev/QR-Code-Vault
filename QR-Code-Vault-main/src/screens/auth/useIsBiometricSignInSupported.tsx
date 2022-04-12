import TouchID from 'react-native-touch-id';
import {useMutation} from 'react-query';

interface Props {
  navigate: (text: string) => void;
}

export const useIsBiometricSignInSupported = (navigation: Props) => {
  const checkIsSupported = () => {
    return TouchID.isSupported();
  };
  const {mutateAsync, isLoading, isError} = useMutation(checkIsSupported, {
    onSuccess: () => {
      navigation.navigate('BiometricAuth');
    },
    onError: () => {
      navigation.navigate('PinCodeBackupAuth');
    },
  });

  return {mutateAsync, isLoading, isError};
};
