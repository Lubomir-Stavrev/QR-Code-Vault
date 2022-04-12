import {useMutation} from 'react-query';
import * as Keychain from 'react-native-keychain';

const pinCodeKeychainName = 'pincode';

export const useSavePinInKeyChain = () => {
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
  const {mutate, isLoading, isError, isSuccess, data} =
    useMutation(saveToKeychain);

  return {mutate, isLoading, isError, isSuccess, data};
};
