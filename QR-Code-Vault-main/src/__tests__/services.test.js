import services from '../services/encryptedStorage';
import EncryptedStorage from 'react-native-encrypted-storage';

jest.mock('react-native-encrypted-storage', () => {
  return {
    setItem: jest.fn(() => Promise.resolve()),
    getItem: jest.fn(() => Promise.resolve()),
    removeItem: jest.fn(() => Promise.resolve()),
    clear: jest.fn(() => Promise.resolve()),
  };
});

describe('testing services', () => {
  const qrStorageName = 'qrCodeStorage';
  beforeEach(() => {
    EncryptedStorage.clear();
  });
  it('should delete the passed data', () => {
    const hardCodedData = [
      {
        qrCodeData: 'a',
        id: '1',
      },
    ];

    EncryptedStorage.setItem(qrStorageName, JSON.stringify(hardCodedData));

    services.deleteQRCode('1').then(res => {
      expect(res).toEqual({});
    });
  });

  it('should return the right code by passed id', () => {
    const hardCodedData = [
      {
        qrCodeData: 'a',
        id: '1',
      },
      {
        qrCodeData: 'b',
        id: '2',
      },
      {
        qrCodeData: 'c',
        id: '3',
      },
    ];

    EncryptedStorage.setItem(qrStorageName, JSON.stringify(hardCodedData));

    services.getOneQRCode('2').then(res => {
      expect(res?.qrCodeData).toEqual(hardCodedData[1].qrCodeData);
    });
  });
  it('should add the passed qrCodeData string correctly', () => {
    const hardCodedData = 'random qr code';

    const spy = jest.spyOn(EncryptedStorage, 'setItem');
    services.addQRCode(hardCodedData);

    expect(spy).toBeCalled();

    services.getQRCodes().then(res => {
      if (res) {
        expect(res[0].qrCodeData).toEqual(hardCodedData);
      }
    });
  });
});
