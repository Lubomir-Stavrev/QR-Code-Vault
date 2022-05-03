import React from 'react';
import AuthenticationRoute from '../../AuthenticationRoute';
import {useIsBiometricSignInSupported} from '../../useIsBiometricSignInSupported';
import {useConfigureGoogleSignIn} from '../../useConfigureGoogleSignIn';
import {useSignInWithGoogle} from '../../useSignInWithGoogle';
import {render} from '@testing-library/react-native';

jest.mock('../../useIsBiometricSignInSupported', () => ({
  useIsBiometricSignInSupported: jest.fn(),
}));
jest.mock('../../useConfigureGoogleSignIn', () => ({
  useConfigureGoogleSignIn: jest.fn(),
}));
jest.mock('../../useSignInWithGoogle', () => ({
  useSignInWithGoogle: jest.fn(),
}));

jest.mock('react-native-touch-id', () => ({
  isSupported: jest.fn(),
}));
jest.mock('@react-native-google-signin/google-signin', () => {});
interface BiometricSignInSupported {
  mutateAsync?: () => Promise<any>;
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
}
interface GoogleConfiguration {
  signIn?: () => Promise<any>;
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
}
jest.mock('react-native-encrypted-storage', () => {
  const RNEncryptedStorage = {
    setItem: jest.fn(() => Promise.resolve()),
    getItem: jest.fn(() => Promise.resolve()),
    removeItem: jest.fn(() => Promise.resolve()),
    clear: jest.fn(() => Promise.resolve()),
  };

  return RNEncryptedStorage;
});
jest.mock('react-query', () => ({
  useQueryClient: jest.fn(),
  useQuery: jest.fn(),
  useMutation: jest.fn(),
}));
const mockUseAuthenticateId =
  useIsBiometricSignInSupported as jest.Mock<BiometricSignInSupported>;
const navigation = {navigate: jest.fn()};

const mockGoogle = useConfigureGoogleSignIn as jest.Mock<GoogleConfiguration>;
const mockGoogleSignIn = useSignInWithGoogle as jest.Mock<GoogleConfiguration>;

describe('does Bimetric Authentication handles press events as it shoulds', () => {
  it('should calls navigate to PinCodeBackupAuth on press', async () => {
    mockUseAuthenticateId.mockImplementation(() => ({
      isLoading: true,
    }));
    mockGoogle.mockImplementation(() => ({
      isLoading: true,
    }));
    mockGoogleSignIn.mockImplementation(() => ({
      isLoading: true,
    }));
    const {getByLabelText} = render(
      <AuthenticationRoute navigation={navigation} />,
    );

    expect(getByLabelText('loadingIndicator')).toBeTruthy();
  });
});
