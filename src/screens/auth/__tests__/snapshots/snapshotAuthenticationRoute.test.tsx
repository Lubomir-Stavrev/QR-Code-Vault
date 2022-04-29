import React from 'react';

import AuthenticationRoute from '../../AuthenticationRoute';
import renderer from 'react-test-renderer';

import {useIsBiometricSignInSupported} from '../../useIsBiometricSignInSupported';

jest.mock('../../useIsBiometricSignInSupported', () => ({
  useIsBiometricSignInSupported: jest.fn(),
}));

jest.mock('react-query', () => ({
  useQueryClient: jest.fn(),
}));
interface BiometricSignInSupported {
  mutateAsync?: () => Promise<any>;
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
}
const mockUseAuthenticateId =
  useIsBiometricSignInSupported as jest.Mock<BiometricSignInSupported>;
const navigation = {navigate: jest.fn()};

it('renders correctly the activity indicator', async () => {
  mockUseAuthenticateId.mockImplementation(() => ({
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
  const tree = renderer
    .create(<AuthenticationRoute navigation={navigation} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
