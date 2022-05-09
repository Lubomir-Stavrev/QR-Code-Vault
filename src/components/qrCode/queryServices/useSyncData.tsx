import {useMutation} from 'react-query';
import googleDriveServices from '../../../services/googleDriveServices';

export const useSyncData = () => {
  const syncDataWithDrive = async () => {
    return await googleDriveServices.syncDataWithDrive();
  };
  const {
    mutate: syncData,
    isLoading,
    isError,
    isSuccess,
    data,
  } = useMutation(syncDataWithDrive);

  return {syncData, isLoading, isError, isSuccess, data};
};
