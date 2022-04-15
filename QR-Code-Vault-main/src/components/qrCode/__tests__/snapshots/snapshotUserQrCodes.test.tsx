import React from 'react';
import UserQrCodes from '../../UserQrCodes';
import {useGetOne} from '../../queryServices/useGetOne';
import {useGetQRCodesData} from '../../queryServices/useGetQRCodesData';
import renderer from 'react-test-renderer';

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

describe('UserQRCodes', () => {
  const navigation = {navigate: jest.fn()};
  beforeEach(() =>
    mockUseHasGetQRCodesData.mockImplementation(() => ({
      isLoading: false,
    })),
  );
  it('renders correctly the error view', () => {
    mockUseHasGetOne.mockImplementation(() => ({
      isSuccess: false,
    }));
    const tree = renderer
      .create(<UserQrCodes navigation={navigation} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly the success view', () => {
    mockUseHasGetOne.mockImplementation(() => ({
      isSuccess: true,
    }));
    const tree = renderer
      .create(<UserQrCodes navigation={navigation} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
