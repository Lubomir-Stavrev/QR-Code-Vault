import React from 'react';
import QRCodeScan from '../QRCodeScan';
import {render} from '@testing-library/react-native';
import {useSaveQRCode} from '../queryServices/useSaveQRCode';
jest.mock('react-native-snackbar', () => ({
  Snackbar: {show: jest.fn()},
}));

jest.mock('react-native-encrypted-storage', () => {
  const RNEncryptedStorage = {
    setItem: jest.fn(() => Promise.resolve()),
    getItem: jest.fn(() => Promise.resolve()),
    removeItem: jest.fn(() => Promise.resolve()),
    clear: jest.fn(() => Promise.resolve()),
  };

  return RNEncryptedStorage;
});

jest.mock('../queryServices/useSaveQRCode', () => ({
  useSaveQRCode: jest.fn(),
}));
interface SaveQRCode {
  mutate?: any;
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  data?: void | undefined;
}
const mockUseSaveQRCode = useSaveQRCode as jest.Mock<SaveQRCode>;
describe('does QR code scan handles useSaveQRCode results correctly', () => {
  const navigation = {navigate: jest.fn()};
  it('should display activity indicator when the isLoading is true', () => {
    mockUseSaveQRCode.mockImplementation(() => ({
      isLoading: true,
    }));

    const rendered = render(<QRCodeScan navigation={navigation} />);
    const activityIndicatorComponent =
      rendered.getByTestId('ActivityIndicator');

    expect(activityIndicatorComponent).toBeTruthy();
  });
});
