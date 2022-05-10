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
  const qrCodeValueThatShouldBeAdded = 'c';
  beforeEach(() => {
    jest.spyOn(googleDriveServices, 'getFolderId').mockImplementation(() => {});
  });

  it('shouldnt add anything because the data is already synced', async () => {
    const returnValueForEStQRCodesData = [
      {qrCodeData: 'a', id: '1'},
      {qrCodeData: 'b', id: '2'},
      {qrCodeData: 'c', id: '3'},
    ];
    const returnValueForDriveQRCodesData = [
      {content: 'a'},
      {content: 'b'},
      {content: 'c'},
    ];

    jest
      .spyOn(googleDriveServices, 'getFilesWithContant')
      .mockReturnValue(returnValueForDriveQRCodesData);
    jest
      .spyOn(encryptedStorageServices, 'getQRCodes')
      .mockReturnValue(returnValueForEStQRCodesData);
    jest.spyOn(googleDriveServices, 'addQRCode').mockImplementation(() => {});

    const driveAddQRCodeSpy = jest.spyOn(googleDriveServices, 'addQRCode');
    const ESAddQRCodeSpy = jest.spyOn(encryptedStorageServices, 'addQRCode');

    await googleDriveServices.syncDataWithDrive();

    expect(driveAddQRCodeSpy).not.toBeCalled();
    expect(ESAddQRCodeSpy).not.toBeCalled();
  });
  it('should add the drive data that is missing in the encrypted storage', async () => {
    const returnValueForEStQRCodesData = [
      {qrCodeData: 'a', id: '1'},
      {qrCodeData: 'b', id: '2'},
    ];
    const returnValueForDriveQRCodesData = [
      {content: 'a'},
      {content: 'b'},
      {content: 'c'},
    ];

    jest
      .spyOn(googleDriveServices, 'getFilesWithContant')
      .mockReturnValue(returnValueForDriveQRCodesData);
    jest
      .spyOn(encryptedStorageServices, 'getQRCodes')
      .mockReturnValue(returnValueForEStQRCodesData);

    const spy = jest.spyOn(encryptedStorageServices, 'addQRCode');

    await googleDriveServices.syncDataWithDrive();

    expect(spy).toBeCalledWith(qrCodeValueThatShouldBeAdded);
  });
  it('should add the the encrypted storage data that is missing in the drive', async () => {
    const returnValueForEStQRCodesData = [
      {qrCodeData: 'a', id: '1'},
      {qrCodeData: 'b', id: '2'},
      {qrCodeData: 'c', id: '3'},
    ];
    const returnValueForDriveQRCodesData = [{content: 'a'}, {content: 'b'}];

    jest
      .spyOn(googleDriveServices, 'getFilesWithContant')
      .mockReturnValue(returnValueForDriveQRCodesData);
    jest
      .spyOn(encryptedStorageServices, 'getQRCodes')
      .mockReturnValue(returnValueForEStQRCodesData);
    jest.spyOn(googleDriveServices, 'addQRCode').mockImplementation(() => {});

    const spy = jest.spyOn(googleDriveServices, 'addQRCode');
    await googleDriveServices.syncDataWithDrive();

    expect(spy).toBeCalledWith(qrCodeValueThatShouldBeAdded);
  });
});
