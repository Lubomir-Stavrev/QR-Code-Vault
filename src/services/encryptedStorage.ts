const qrStorageName = 'qrCodeStorage';
const accessTokenStorageName = 'tokenStorage';
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
  async getOneQRCode(qrCodeId: string) {
    const prevQRCodeData = await EncryptedStorage.getItem(qrStorageName);
    if (!prevQRCodeData) {
      return;
    }
    const parsedQRCodeData: QRData[] = JSON.parse(prevQRCodeData);

    const qrCode = parsedQRCodeData.find(el => el.id === qrCodeId);

    return qrCode;
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
  async saveUserGoogleAccessToken(accessToken: string) {
    if (!accessToken) {
      return;
    }
    return await EncryptedStorage.setItem(
      accessTokenStorageName,
      JSON.stringify({accessToken: accessToken}),
    );
  },
  async getUserGoogleAccessToken() {
    const accessToken = await EncryptedStorage.getItem(accessTokenStorageName);
    if (!accessToken) {
      return false; // there is no token which means that the user is not authenticated with Google
    }
    const parsedAccessToken: string = JSON.parse(accessToken).accessToken;

    return parsedAccessToken;
  },
  async isUserSignedInWithGoogle() {
    const userToken = await this.getUserGoogleAccessToken();
    if (userToken) {
      return true;
    }
    return false;
  },
};
