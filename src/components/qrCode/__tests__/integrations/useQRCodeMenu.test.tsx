import React from 'react';
import QRCodeMenu from '../../QRCodeMenu';
import {render, fireEvent} from '@testing-library/react-native';

describe('does the menu navigates correctly', () => {
  const navigation = {navigate: jest.fn()};
  it('should call navigate to QRCodeScan on press event', () => {
    const spy = jest.spyOn(navigation, 'navigate');
    const {getByLabelText} = render(<QRCodeMenu navigation={navigation} />);
    const navigateButton = getByLabelText('navigateToQRCodeScan');
    fireEvent.press(navigateButton);
    expect(spy).toBeCalledWith('QRCodeScan');
  });
  it('should call navigate to UserQrCodes press event', () => {
    const spy = jest.spyOn(navigation, 'navigate');
    const {getByLabelText} = render(<QRCodeMenu navigation={navigation} />);
    const navigateButton = getByLabelText('navigateToUserQRCodes');
    fireEvent.press(navigateButton);
    expect(spy).toBeCalledWith('UserQrCodes');
  });
});
