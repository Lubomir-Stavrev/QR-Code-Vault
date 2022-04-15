import React from 'react';
import AuthenticationRoute from '../../AuthenticationRoute';
import {useIsBiometricSignInSupported} from '../../useIsBiometricSignInSupported';
import {render} from '@testing-library/react-native';

jest.mock('../../useIsBiometricSignInSupported', () => ({
  useIsBiometricSignInSupported: jest.fn(),
}));

jest.mock('react-query', () => ({
  useQueryClient: jest.fn(),
}));
jest.mock('react-native-touch-id', () => ({
  isSupported: jest.fn(),
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

describe('does Bimetric Authentication handles press events as it shoulds', () => {
  it('should calls navigate to PinCodeBackupAuth on press', async () => {
    mockUseAuthenticateId.mockImplementation(() => ({
      isLoading: true,
    }));
    const {getByLabelText} = render(
      <AuthenticationRoute navigation={navigation} />,
    );

    expect(getByLabelText('loadingIndicator')).toBeTruthy();
  });
});
