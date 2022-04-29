import {useQuery} from 'react-query';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const useConfigureGoogleSignIn = () => {
  const configuration = () => {
    return GoogleSignin.configure({
      scopes: [
        'https://www.googleapis.com/auth/drive.appdata',
        'https://www.googleapis.com/auth/drive.file',
      ], // We want   read and write access
      webClientId:
        '593703282853-7522cadoh0u4vegingb458cmbul1gd6t.apps.googleusercontent.com', // REPLACE WITH YOUR ACTUAL  CLIENT ID !
      offlineAccess: true,
    });
  };
  const {isLoading, isError, isSuccess} = useQuery(
    'configureGoogleSignIn',
    () => configuration(),
  );

  return {isLoading, isError, isSuccess};
};
