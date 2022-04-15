import React from 'react';
import PinCodeBackup from '../../PinCodeBackup';
import {useHasUserSetPinData} from '../../useHasUserSetPinData';
import renderer from 'react-test-renderer';

jest.mock('@haskkor/react-native-pincode', () => jest.fn());
jest.mock('react-query', () => ({
  useQueryClient: jest.fn(),
  useMutation: jest.fn(),
}));
jest.mock('react-native-snackbar', () => ({
  show: jest.fn(),
}));

jest.mock('../../useHasUserSetPinData', () => ({
  useHasUserSetPinData: jest.fn(),
}));
jest.mock('../../useSavePinInKeyChain', () => ({
  useSavePinInKeyChain: jest.fn(),
}));
interface UserSetPinData {
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  data?: any;
}
const mockUseHasUserSetPinData =
  useHasUserSetPinData as jest.Mock<UserSetPinData>;
const navigation = {navigate: jest.fn()};
describe('PinCodeBackup', () => {
  it('renders correctly', async () => {
    mockUseHasUserSetPinData.mockImplementation(() => ({isLoading: true}));
    const tree = renderer
      .create(<PinCodeBackup navigation={navigation} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
