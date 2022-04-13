import React from 'react';
import PinCodeBackup from '../components/pinCodeBackupAuth/PinCodeBackup';
import {useHasUserSetPinData} from '../components/pinCodeBackupAuth/useHasUserSetPinData';
import {useSavePinInKeyChain} from '../components/pinCodeBackupAuth/useSavePinInKeyChain';
import {render} from '@testing-library/react-native';

jest.mock('@haskkor/react-native-pincode', () => jest.fn());
jest.mock('react-query', () => ({
  useQueryClient: jest.fn(),
  useMutation: jest.fn(),
}));
jest.mock('react-native-snackbar', () => ({
  show: jest.fn(),
}));

jest.mock('../components/pinCodeBackupAuth/useHasUserSetPinData', () => ({
  useHasUserSetPinData: jest.fn(),
}));
jest.mock('../components/pinCodeBackupAuth/useSavePinInKeyChain', () => ({
  useSavePinInKeyChain: jest.fn(),
}));

describe('does PinCodeBackup handles hasUserSetPinData results correctly', () => {
  it('should display Activity indecator when isLoading is true', async () => {
    useSavePinInKeyChain.mockImplementation(() => ({}));
    useHasUserSetPinData.mockImplementation(() => ({isLoading: true}));
    const rendered = render(<PinCodeBackup />);
    const activityIndicatorComponent =
      rendered.getByTestId('ActivityIndicator');

    expect(activityIndicatorComponent).toBeTruthy();
  });
});
