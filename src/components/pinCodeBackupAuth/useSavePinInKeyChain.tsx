import {useMutation} from 'react-query';
import * as Keychain from 'react-native-keychain';

const pinCodeKeychainName = 'pincode';

export const useSavePinInKeyChain = (navigation: {
  navigate: (text: string) => void;
}) => {
  const saveToKeychain = (pin: string | undefined) => {
    if (pin) {
      return Keychain.setInternetCredentials(
        pinCodeKeychainName,
        pinCodeKeychainName,
        pin,
      );
    } else {
      throw new Error();
    }
  };
  const {mutate, isLoading, isError, isSuccess, data} = useMutation(
    saveToKeychain,
    {
      onSuccess: () => {
        navigation.navigate('QRCodeMenu');
      },
    },
  );

  return {mutate, isLoading, isError, isSuccess, data};
};
