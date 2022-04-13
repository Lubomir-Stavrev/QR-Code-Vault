import React from 'react';
import {useGetQRCodesData} from '../components/qrCode/queryServices/useGetQRCodesData';
import {useDeleteQRCode} from '../components/qrCode/queryServices/useDeleteQRCode';
import {useGetOne} from '../components/qrCode/queryServices/useGetOne';
import {useSaveQRCode} from '../components/qrCode/queryServices/useSaveQRCode';
import UserQrCodes from '../components/qrCode/UserQrCodes';
import QRCodeMenu from '../components/qrCode/QRCodeMenu';
import QRCodeScan from '../components/qrCode/QRCodeScan';
import {render} from '@testing-library/react-native';

jest.mock('react-native-snackbar', () => ({
  Snackbar: {show: jest.fn()},
}));

jest.mock('../components/qrCode/queryServices/useGetQRCodesData', () => ({
  useGetQRCodesData: jest.fn(),
}));
jest.mock('../components/qrCode/queryServices/useDeleteQRCode', () => ({
  useDeleteQRCode: jest.fn(),
}));
jest.mock('../components/qrCode/queryServices/useGetOne', () => ({
  useGetOne: jest.fn(),
}));
jest.mock('../components/qrCode/queryServices/useSaveQRCode', () => ({
  useSaveQRCode: jest.fn(),
}));

/* beforeEach(() => {
  useGetQRCodesData.mockImplementation(() => ({}));
  useGetOne.mockImplementation(() => ({}));
  useDeleteQRCode.mockImplementation(() => ({}));
}); */

describe('does QR code scan handles useSaveQRCode results correctly', () => {
  it('should display activity indicator when the isLoading is true', () => {
    useSaveQRCode.mockImplementation(() => ({
      isLoading: true,
    }));

    const rendered = render(<QRCodeScan />);
    const activityIndicatorComponent =
      rendered.getByTestId('ActivityIndicator');

    expect(activityIndicatorComponent).toBeTruthy();
  });
});
