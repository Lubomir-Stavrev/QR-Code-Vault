import React from 'react';

import AuthenticationRoute from '../../AuthenticationRoute';
import renderer from 'react-test-renderer';

import {useConfigureGoogleSignIn} from '../../useConfigureGoogleSignIn';
import {useSignInWithGoogle} from '../../useSignInWithGoogle';
import {useIsBiometricSignInSupported} from '../../useIsBiometricSignInSupported';

jest.mock('../../useIsBiometricSignInSupported', () => ({
  useIsBiometricSignInSupported: jest.fn(),
}));

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

const mockGoogle = useConfigureGoogleSignIn as jest.Mock<GoogleConfiguration>;
const mockGoogleSignIn = useSignInWithGoogle as jest.Mock<GoogleConfiguration>;
const mockUseAuthenticateId =
  useIsBiometricSignInSupported as jest.Mock<BiometricSignInSupported>;
const navigation = {navigate: jest.fn()};

it('renders correctly the activity indicator', async () => {
  mockUseAuthenticateId.mockImplementation(() => ({
    isLoading: true,
  }));
  mockGoogle.mockImplementation(() => ({
    isLoading: true,
  }));
  mockGoogleSignIn.mockImplementation(() => ({
    isLoading: true,
  }));
  const tree = renderer
    .create(<AuthenticationRoute navigation={navigation} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
it('renders correctly the authentication route', async () => {
  mockUseAuthenticateId.mockImplementation(() => ({
    isLoading: false,
  }));
  mockGoogle.mockImplementation(() => ({
    isLoading: true,
  }));
  mockGoogleSignIn.mockImplementation(() => ({
    isLoading: true,
  }));
  const tree = renderer
    .create(<AuthenticationRoute navigation={navigation} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
