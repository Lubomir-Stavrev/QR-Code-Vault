import {useMutation, useQueryClient} from 'react-query';
import storageServices from '../../../services/encryptedStorage';

export const useDeleteQRCode = () => {
  const queryClient = useQueryClient();

  const deleteQrCodeFromStorage = (qrCode: string) => {
    return storageServices.deleteQRCode(qrCode);
  };
  const {mutate, isLoading, isError, isSuccess, data} = useMutation(
    deleteQrCodeFromStorage,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getQRCodesData');
      },
    },
  );

  return {mutate, isLoading, isError, isSuccess, data};
};
