import React from 'react';
import QRCodeMenu from '../../QRCodeMenu';
import {render, fireEvent} from '@testing-library/react-native';
import {useSyncData} from '../../queryServices/useSyncData';

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
  QueryClientProvider: jest.fn(),
  useMutation: jest.fn(),
}));

jest.mock('../../queryServices/useSyncData', () => ({
  useSyncData: jest.fn(),
}));
interface SyncData {
  syncData?: any;
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  data?: any;
}

const mockUseSyncData = useSyncData as jest.Mock<SyncData>;
describe('does the menu navigates correctly', () => {
  const navigation = {navigate: jest.fn()};
  it('should call navigate to QRCodeScan on press event', () => {
    mockUseSyncData.mockImplementation(() => ({
      isLoading: false,
    }));
    const spy = jest.spyOn(navigation, 'navigate');
    const {getByLabelText} = render(<QRCodeMenu navigation={navigation} />);
    const navigateButton = getByLabelText('navigateToQRCodeScan');
    fireEvent.press(navigateButton);
    expect(spy).toBeCalledWith('QRCodeScan');
  });
  it('should call navigate to UserQrCodes press event', () => {
    mockUseSyncData.mockImplementation(() => ({
      isLoading: false,
    }));
    const spy = jest.spyOn(navigation, 'navigate');
    const {getByLabelText} = render(<QRCodeMenu navigation={navigation} />);
    const navigateButton = getByLabelText('navigateToUserQRCodes');
    fireEvent.press(navigateButton);
    expect(spy).toBeCalledWith('UserQrCodes');
  });
});
