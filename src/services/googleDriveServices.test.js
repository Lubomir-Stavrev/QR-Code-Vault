import googleDriveServices from './googleDriveServices';
import encryptedStorageServices from './encryptedStorage';

jest.mock('react-native-encrypted-storage', () => {
  const RNEncryptedStorage = {
    setItem: jest.fn(() => Promise.resolve()),
    getItem: jest.fn(() => Promise.resolve()),
    removeItem: jest.fn(() => Promise.resolve()),
    clear: jest.fn(() => Promise.resolve()),
  };

  return RNEncryptedStorage;
});

describe('testing google drive services syncData()', () => {
  it('shouldnt add anything because the data is already synced', async () => {
    jest.spyOn(googleDriveServices, 'getFolderId').mockReturnValue('1');
    jest
      .spyOn(googleDriveServices, 'getFilesWithContant')
      .mockReturnValue([{content: 'a'}, {content: 'b'}, {content: 'c'}]);
    jest.spyOn(encryptedStorageServices, 'getQRCodes').mockReturnValue([
      {qrCodeData: 'a', id: '1'},
      {qrCodeData: 'b', id: '2'},
      {qrCodeData: 'c', id: '3'},
    ]);
    jest.spyOn(googleDriveServices, 'addQRCode').mockImplementation(() => {});

    const driveAddQRCodeSpy = jest.spyOn(googleDriveServices, 'addQRCode');
    const ESAddQRCodeSpy = jest.spyOn(encryptedStorageServices, 'addQRCode');
    await googleDriveServices.syncDataWithDrive();

    expect(driveAddQRCodeSpy).not.toBeCalled();
    expect(ESAddQRCodeSpy).not.toBeCalled();
  });
  it('should add the drive data that is missing in the encrypted storage', async () => {
    jest.spyOn(googleDriveServices, 'getFolderId').mockReturnValue('1');
    jest
      .spyOn(googleDriveServices, 'getFilesWithContant')
      .mockReturnValue([{content: 'a'}, {content: 'b'}, {content: 'c'}]);
    jest.spyOn(encryptedStorageServices, 'getQRCodes').mockReturnValue([
      {qrCodeData: 'a', id: '1'},
      {qrCodeData: 'b', id: '2'},
    ]);
    const spy = jest.spyOn(encryptedStorageServices, 'addQRCode');
    await googleDriveServices.syncDataWithDrive();

    expect(spy).toBeCalledWith('c');
  });
  it('should add the the encrypted storage data that is missing in the drive', async () => {
    jest.spyOn(googleDriveServices, 'getFolderId').mockReturnValue('1');
    jest
      .spyOn(googleDriveServices, 'getFilesWithContant')
      .mockReturnValue([{content: 'a'}, {content: 'b'}]);
    jest.spyOn(encryptedStorageServices, 'getQRCodes').mockReturnValue([
      {qrCodeData: 'a', id: '1'},
      {qrCodeData: 'b', id: '2'},
      {qrCodeData: 'c', id: '3'},
    ]);
    jest.spyOn(googleDriveServices, 'addQRCode').mockImplementation(() => {});
    const spy = jest.spyOn(googleDriveServices, 'addQRCode');
    await googleDriveServices.syncDataWithDrive();

    expect(spy).toBeCalledWith('c');
  });
});
