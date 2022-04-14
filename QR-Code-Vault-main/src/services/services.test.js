import services from './encryptedStorage';
import EncryptedStorage from 'react-native-encrypted-storage';

jest.mock('react-native-encrypted-storage', () => {
  const RNEncryptedStorage = {
    setItem: jest.fn(() => Promise.resolve()),
    getItem: jest.fn(() =>
      Promise.resolve(
        '[{"qrCodeData":"a","id":"1"},{"qrCodeData":"b","id":"2"},{"qrCodeData":"c","id":"3"}]',
      ),
    ),
    removeItem: jest.fn(() => Promise.resolve()),
    clear: jest.fn(() => Promise.resolve()),
  };

  return RNEncryptedStorage;
});

describe('testing services', () => {
  const qrStorageName = 'qrCodeStorage';

  it('should delete the passed data', async () => {
    const expectedDataAfterDelete = [
      {
        qrCodeData: 'b',
        id: '2',
      },
      {
        qrCodeData: 'c',
        id: '3',
      },
    ];
    const spy = jest.spyOn(EncryptedStorage, 'setItem');
    await services.deleteQRCode('1');
    expect(spy).toBeCalledWith(
      qrStorageName,
      JSON.stringify(expectedDataAfterDelete),
    );
  });

  it('should return the right code by passed id', () => {
    const expectedDataToBeReturned = {
      qrCodeData: 'b',
      id: '2',
    };

    services.getOneQRCode('2').then(res => {
      expect(res).toEqual(expectedDataToBeReturned);
    });
  });
  it('should add the passed qrCodeData string correctly', async () => {
    const expectedDataToBeAdded = 'test';
    const spy = jest.spyOn(EncryptedStorage, 'setItem');
    await services.addQRCode(expectedDataToBeAdded);

    expect(spy).lastCalledWith(
      qrStorageName,
      expect.stringContaining(expectedDataToBeAdded),
    );
  });
});
