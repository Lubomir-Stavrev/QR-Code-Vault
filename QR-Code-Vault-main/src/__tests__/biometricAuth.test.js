import React from 'react';
import BiometricAuth from '../components/biometricAuth/BiometricAuth';
import { useAuthenticateId } from '../components/biometricAuth/useAuthenticateId';
import { render, fireEvent } from '@testing-library/react-native';

jest.mock('../components/biometricAuth/useAuthenticateId', () => ({
    useAuthenticateId: jest.fn(),
}));

jest.mock('react-query', () => ({
    useQueryClient: jest.fn(),
}));

describe('does Biometric Authentication handles useAuthenticateId results correctly', () => {
    it('should display Activity indecator when isLoading is true', async() => {
        useAuthenticateId.mockImplementation(() => ({
            isLoading: true,
        }));
        const rendered = render( < BiometricAuth / > );
        const activityIndicatorComponent =
            rendered.getByTestId('ActivityIndicator');

        expect(activityIndicatorComponent).toBeTruthy();
    });
    it('should display text that the user canceled authentication when an error occures', async() => {
        useAuthenticateId.mockImplementation(() => ({
            isError: true,
        }));
        const errorMessage = 'User canceled authentication';
        const rendered = render( < BiometricAuth / > );
        const textComponent = rendered.getByTestId('textUserCanceledAuth');

        expect(textComponent.props.children).toEqual(errorMessage);
    });
});

describe('does Bimetric Authentication handles press events as it shoulds', () => {
            it('should calls navigate to PinCodeBackupAuth on press', () => {
                    const navigation = { navigate: jest.fn() };
                    const spy = jest.spyOn(navigation, 'navigate');
                    useAuthenticateId.mockImplementation(() => ({
                        isError: true,
                    }));
                    const rendered = render( < BiometricAuth navigation = { navigation }
                        />);
                        const pinCodeBackUpTouchableOpacityComponent = rendered.getByTestId(
                            'pinCodeBackUpTouchableOpacity',
                        ); fireEvent.press(pinCodeBackUpTouchableOpacityComponent); expect(spy).toBeCalledWith('PinCodeBackupAuth');
                    });
            });