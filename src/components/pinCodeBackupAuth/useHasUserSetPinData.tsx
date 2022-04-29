import {useQuery} from 'react-query';
import {hasUserSetPinCode} from '@haskkor/react-native-pincode';

const pinCodeKeychainName = 'pincode';

export const useHasUserSetPinData = () => {
  const {isLoading, isError, isSuccess, data} = useQuery(
    'hasUserSetPinData',
    () => hasUserSetPinCode(pinCodeKeychainName),
  );

  return {isLoading, isError, isSuccess, data};
};
