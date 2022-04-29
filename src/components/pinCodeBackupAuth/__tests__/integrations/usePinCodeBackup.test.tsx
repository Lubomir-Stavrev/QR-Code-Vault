import React from 'react';
import PinCodeBackup from '../../PinCodeBackup';
import {useHasUserSetPinData} from '../../useHasUserSetPinData';
import {render} from '@testing-library/react-native';

jest.mock('@haskkor/react-native-pincode', () => jest.fn());

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
describe('does PinCodeBackup handles hasUserSetPinData results correctly', () => {
  it('should display Activity indecator when isLoading is true', async () => {
    mockUseHasUserSetPinData.mockImplementation(() => ({isLoading: true}));
    const rendered = render(<PinCodeBackup navigation={navigation} />);
    const activityIndicatorComponent =
      rendered.getByTestId('ActivityIndicator');

    expect(activityIndicatorComponent).toBeTruthy();
  });
});
