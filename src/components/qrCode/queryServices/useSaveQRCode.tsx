import {useMutation} from 'react-query';
import storageServices from '../../../services/encryptedStorage';
import googleDriveServices from '../../../services/googleDriveServices';

interface Props {
  navigate: (text: string) => void;
}

export const useSaveQRCode = (navigation: Props) => {
  const saveQRCodeInDrive = async (data: string) => {
    const isSignedIn = await storageServices.isUserSignedInWithGoogle();
    if (isSignedIn) {
      return googleDriveServices.addQRCode(data);
    }
  };
  const saveQRCodeRequest = (data: string) => {
    saveQRCodeInDrive(data);
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
