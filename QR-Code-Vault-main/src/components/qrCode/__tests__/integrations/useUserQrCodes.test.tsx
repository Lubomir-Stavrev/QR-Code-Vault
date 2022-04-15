import React from 'react';
import UserQrCodes from '../../UserQrCodes';
import {render, fireEvent} from '@testing-library/react-native';
import {useGetOne} from '../../queryServices/useGetOne';
import {useGetQRCodesData} from '../../queryServices/useGetQRCodesData';

jest.mock('react-native-snackbar', () => ({
  show: jest.fn(),
}));
jest.mock('react-query', () => ({
  useQueryClient: jest.fn(),
  useQuery: jest.fn(),
  useMutation: jest.fn(),
}));
jest.mock('../../queryServices/useGetOne', () => ({
  useGetOne: jest.fn(),
}));
jest.mock('../../queryServices/useGetQRCodesData', () => ({
  useGetQRCodesData: jest.fn(),
}));
jest.mock('../../queryServices/useDeleteQRCode', () => ({
  useDeleteQRCode: jest.fn(),
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
interface GetOne {
  mutate?: any;
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  data?: any;
}
const mockUseHasGetOne = useGetOne as jest.Mock<GetOne>;
const mockUseHasGetQRCodesData = useGetQRCodesData as jest.Mock<GetOne>;

describe('does the menu navigates correctly', () => {
  const navigation = {navigate: jest.fn()};
  beforeEach(() =>
    mockUseHasGetQRCodesData.mockImplementation(() => ({
      isLoading: false,
    })),
  );
  it('should call navigate to QRCodeMenu on press event go back', () => {
    mockUseHasGetOne.mockImplementation(() => ({
      isSuccess: false,
    }));
    const spy = jest.spyOn(navigation, 'navigate');
    const {getByLabelText} = render(<UserQrCodes navigation={navigation} />);
    const navigateButton = getByLabelText('navigateToQRCodeMenu');
    fireEvent.press(navigateButton);
    expect(spy).toBeCalledWith('QRCodeMenu');
  });
  it('should call navigate to QRCodeMenu on press event go back', () => {
    mockUseHasGetOne.mockImplementation(() => ({
      isSuccess: true,
    }));
    const spy = jest.spyOn(navigation, 'navigate');
    const {getByLabelText} = render(<UserQrCodes navigation={navigation} />);
    const navigateButton = getByLabelText('navigateToQRCodeMenu');
    fireEvent.press(navigateButton);
    expect(spy).toBeCalledWith('QRCodeMenu');
  });
});
