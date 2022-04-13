import {useMutation} from 'react-query';
import storageServices from '../../../services/encryptedStorage';

interface Props {
  navigate: (text: string) => void;
}

export const useSaveQRCode = (navigation: Props) => {
  const saveQRCodeRequest = (data: string) => {
    return storageServices.addQRCode(data);
  };
  const {mutate, isLoading, isError, isSuccess, data} = useMutation(
    saveQRCodeRequest,
    {
      onSuccess: () => {
        navigation.navigate('QRCodeMenu');
      },
    },
  );

  return {mutate, isLoading, isError, isSuccess, data};
};
