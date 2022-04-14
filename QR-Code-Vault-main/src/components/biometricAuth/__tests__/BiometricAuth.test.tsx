import React from 'react';
import BiometricAuth from '../BiometricAuth';
import {useAuthenticateId} from '../useAuthenticateId';
import {render, fireEvent} from '@testing-library/react-native';

jest.mock('../useAuthenticateId', () => ({
  useAuthenticateId: jest.fn(),
}));

jest.mock('react-query', () => ({
  useQueryClient: jest.fn(),
}));

interface AuthenticateId {
  isLoading?: boolean;
  isError?: boolean;
}
const mockUseAuthenticateId = useAuthenticateId as jest.Mock<AuthenticateId>;
const navigation = {navigate: jest.fn()};
describe('does Biometric Authentication handles useAuthenticateId results correctly', () => {
  it('should display Activity indecator when isLoading is true', async () => {
    mockUseAuthenticateId.mockImplementation(() => ({
      isLoading: true,
    }));
    const rendered = render(<BiometricAuth navigation={navigation} />);
    const activityIndicatorComponent =
      rendered.getByTestId('ActivityIndicator');

    expect(activityIndicatorComponent).toBeTruthy();
  });
  it('should display text that the user canceled authentication when an error occures', async () => {
    mockUseAuthenticateId.mockImplementation(() => ({
      isError: true,
    }));
    const rendered = render(<BiometricAuth navigation={navigation} />);
    const textComponent = rendered.getByTestId('textUserCanceledAuth');

    expect(textComponent).toBeTruthy();
  });
});

describe('does Bimetric Authentication handles press events as it shoulds', () => {
  it('should calls navigate to PinCodeBackupAuth on press', () => {
    const spy = jest.spyOn(navigation, 'navigate');
    mockUseAuthenticateId.mockImplementation(() => ({
      isError: true,
    }));
    const rendered = render(<BiometricAuth navigation={navigation} />);
    const pinCodeBackUpTouchableOpacityComponent = rendered.getByTestId(
      'pinCodeBackUpTouchableOpacity',
    );
    fireEvent.press(pinCodeBackUpTouchableOpacityComponent);
    expect(spy).toBeCalledWith('PinCodeBackupAuth');
  });
});
