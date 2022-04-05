const qrStorageName = 'qrCodeStorage';

import EncryptedStorage from 'react-native-encrypted-storage';
import uuid from 'react-native-uuid';

interface QRData {
  qrCodeData: string | undefined;
  id: string;
}

export default {
  async addQRCode(qrCodeData: string | undefined) {
    const prevQRCodeData: string | null = await EncryptedStorage.getItem(
      qrStorageName,
    );
    const newQRCodeData: QRData[] = prevQRCodeData
      ? [
          ...JSON.parse(prevQRCodeData),
          {
            qrCodeData: qrCodeData,
            id: uuid.v4().toString(),
          },
        ]
      : [
          {
            qrCodeData: qrCodeData,
            id: uuid.v4().toString(),
          },
        ];

    return await EncryptedStorage.setItem(
      qrStorageName,
      JSON.stringify(newQRCodeData),
    );
  },
  async getQRCodes() {
    const prevQRCodeData = await EncryptedStorage.getItem(qrStorageName);

    if (!prevQRCodeData) {
      return;
    }
    const parsedQRCodeData: QRData[] = JSON.parse(prevQRCodeData);

    return parsedQRCodeData;
  },

  async deleteQRCode(qrCodeId: string) {
    const prevQRCodeData = await EncryptedStorage.getItem(qrStorageName);
    if (!prevQRCodeData) {
      return;
    }
    const parsedQRCodeData: QRData[] = JSON.parse(prevQRCodeData);

    const data = parsedQRCodeData.filter(el => el.id !== qrCodeId);

    return await EncryptedStorage.setItem(qrStorageName, JSON.stringify(data));
  },
};
