import React from 'react';
import QRCodeMenu from '../../QRCodeMenu';
import renderer from 'react-test-renderer';
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
describe('QRCodeMenu', () => {
  const navigation = {navigate: jest.fn()};
  it('renders correctly', () => {
    mockUseSyncData.mockImplementation(() => ({
      isLoading: false,
    }));
    const tree = renderer
      .create(<QRCodeMenu navigation={navigation} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
