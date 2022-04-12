import {useGetQRCodesData} from '../components/qrCode/queryServices/useGetQRCodesData';
import {useDeleteQRCode} from '../components/qrCode/queryServices/useDeleteQRCode';
import {useGetOne} from '../components/qrCode/queryServices/useGetOne';
import UserQrCodes from '../components/qrCode/UserQrCodes';
import QRCodeMenu from '../components/qrCode/QRCodeMenu';
import {render} from '@testing-library/react-native';

jest.mock('../components/qrCode/useGetQRCodesData', () => ({
  useGetQRCodesData: jest.fn(),
}));
jest.mock('../components/qrCode/useDeleteQRCode', () => ({
  useDeleteQRCode: jest.fn(),
}));
jest.mock('../components/qrCode/useGetOne', () => ({
  useGetOne: jest.fn(),
}));

beforeEach(() => {
  useGetQRCodesData.mockImplementation(() => ({}));
  useGetOne.mockImplementation(() => ({}));
  useDeleteQRCode.mockImplementation(() => ({}));
});
