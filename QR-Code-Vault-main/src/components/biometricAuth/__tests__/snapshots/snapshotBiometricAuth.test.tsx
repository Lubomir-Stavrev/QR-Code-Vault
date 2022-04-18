import React from 'react';
import BiometricAuth from '../../BiometricAuth';
import {useAuthenticateId} from '../../useAuthenticateId';
import {render, fireEvent} from '@testing-library/react-native';
import renderer from 'react-test-renderer';

jest.mock('../../useAuthenticateId', () => ({
  useAuthenticateId: jest.fn(),
}));

jest.mock('react-query', () => ({
  useQueryClient: jest.fn(),
}));

interface AuthenticateId {
  isLoading?: boolean;
  isError?: boolean;
}
const mockUseAuthenticateId = useAuthenticateId as jest.Mock<AuthenticateId>;
const navigation = {navigate: jest.fn()};

describe('Bimetric Authentication', () => {
  it('renders activity indicatior correctly on loading', () => {
    mockUseAuthenticateId.mockImplementation(() => ({
      isLoading: true,
    }));
    const tree = renderer
      .create(<BiometricAuth navigation={navigation} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders the error container correctly', () => {
    mockUseAuthenticateId.mockImplementation(() => ({
      isError: true,
    }));
    const tree = renderer
      .create(<BiometricAuth navigation={navigation} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
