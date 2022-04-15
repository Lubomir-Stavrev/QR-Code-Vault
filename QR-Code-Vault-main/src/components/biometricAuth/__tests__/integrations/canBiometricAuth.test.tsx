import React from 'react';
import BiometricAuth from '../../BiometricAuth';
import {useAuthenticateId} from '../../useAuthenticateId';
import {render, fireEvent} from '@testing-library/react-native';

jest.mock('../../useAuthenticateId', () => ({
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

describe('does Bimetric Authentication handles press events as it shoulds', () => {
  it('should calls navigate to PinCodeBackupAuth on press', () => {
    const spy = jest.spyOn(navigation, 'navigate');
    mockUseAuthenticateId.mockImplementation(() => ({
      isError: true,
    }));
    const {getByLabelText} = render(<BiometricAuth navigation={navigation} />);
    const pinCodeBackUpTouchableOpacityComponent = getByLabelText(
      'pinCodeBackUpTouchableOpacity',
    );

    fireEvent.press(pinCodeBackUpTouchableOpacityComponent);
    expect(spy).toBeCalledWith('PinCodeBackupAuth');
  });
});
