const qrStorageName = 'qrCodeStorage';

import EncryptedStorage from 'react-native-encrypted-storage';
import uuid from 'react-native-uuid';

interface QRData {
  qrCodeData: string | undefined;
  id: string;
}

export default {
  async addQRCode(qrCodeData: string | undefined) {
    let prevQRCodeData: string | null = await EncryptedStorage.getItem(qrStorageName);
    let newQRCodeData: QRData[]

    if (prevQRCodeData) {
      newQRCodeData = [
        ...JSON.parse(prevQRCodeData),
        {
          qrCodeData: qrCodeData,
          id: uuid.v4().toString(),
        }
      ];
    } else {
      newQRCodeData = [{
        qrCodeData: qrCodeData,
        id: uuid.v4().toString(),
      }];
    }

    return await EncryptedStorage.setItem(
      qrStorageName,
      JSON.stringify(newQRCodeData),
    );
  },
  async getQRCodes() {
    let prevQRCodeData = await EncryptedStorage.getItem(qrStorageName);

    if (!prevQRCodeData) {
      return;
    }
    let parsedQRCodeData: QRData[] = JSON.parse(prevQRCodeData);
    return parsedQRCodeData;

  },

  async deleteQRCode(qrCodeId: string) {
    let prevQRCodeData = await EncryptedStorage.getItem(qrStorageName);
    if (!prevQRCodeData) {
      return;
    }
    let parsedQRCodeData: QRData[] = JSON.parse(prevQRCodeData);

    let data = parsedQRCodeData.filter((el) => el.id !== qrCodeId);

    return await EncryptedStorage.setItem(
      qrStorageName,
      JSON.stringify(data),
    );

  },
};
