import mock from 'react-native-permissions/mock';
jest.mock('react-native-permissions', () => {
  return mock;
});
jest.mock('react-native-qrcode-scanner', () => jest.fn());
