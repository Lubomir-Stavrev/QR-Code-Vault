import {useQuery} from 'react-query';
import TouchID from 'react-native-touch-id';
interface Props {
  navigation: {navigate: (text: string) => void};
}
export const useAuthenticateId = (props: Props) => {
  const optionalConfigObject = {
    title: 'Authentication Required',
    imageColor: '#FFCC1D',
    imageErrorColor: '#ff0000',
    sensorDescription: 'Touch sensor',
    cancelText: 'Cancel',
    fallbackLabel: 'Show Passcode',
    unifiedErrors: true,
    passcodeFallback: true,
    sensorErrorDescription: 'Too many attempts',
  };

  const {isSuccess, isLoading, isError} = useQuery<Boolean, Error>(
    TouchID.authenticate('Authenticate', optionalConfigObject),
    {
      onSuccess: () => {
        props.navigation.navigate('QRCodeMenu');
      },
    },
  );

  return {isSuccess, isLoading, isError};
};
