import {useQuery} from 'react-query';
import storageServices from '../../../services/encryptedStorage';

export const useGetQRCodesData = () => {
  const getQRCodes = () => {
    return storageServices.getQRCodes();
  };
  const {isLoading, isError, isSuccess, data} = useQuery('getQRCodesData', () =>
    getQRCodes(),
  );

  return {isLoading, isError, isSuccess, data};
};
