import React from 'react';
import QRCodeMenu from '../../QRCodeMenu';
import {render, fireEvent} from '@testing-library/react-native';
import renderer from 'react-test-renderer';

describe('QRCodeMenu', () => {
  const navigation = {navigate: jest.fn()};
  it('renders correctly', () => {
    const tree = renderer
      .create(<QRCodeMenu navigation={navigation} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
