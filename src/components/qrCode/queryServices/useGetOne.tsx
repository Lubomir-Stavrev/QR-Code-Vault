import {useMutation} from 'react-query';
import storageServices from '../../../services/encryptedStorage';

export const useGetOne = () => {
  const getOne = (qrDataId: string) => {
    return storageServices.getOneQRCode(qrDataId);
  };
  const {mutate, isLoading, isError, isSuccess, data} = useMutation(getOne);

  return {mutate, isLoading, isError, isSuccess, data};
};
