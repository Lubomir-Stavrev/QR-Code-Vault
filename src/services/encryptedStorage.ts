const qrStorageName = "qrCodeStorage";

import EncryptedStorage from 'react-native-encrypted-storage';
import uuid from 'react-native-uuid';

export default {

    async addQRCode(qrCodeData: string | undefined) {
        let prevQRCodeData = await EncryptedStorage.getItem(qrStorageName);

        if (!prevQRCodeData) return;

        let parsedQRCodeData = await JSON.parse(prevQRCodeData);
        let updatedDataForReturning;

        if (await parsedQRCodeData) {
            updatedDataForReturning = parsedQRCodeData.data;
        } else {
            updatedDataForReturning = [];
        }

        updatedDataForReturning.push({
            qrCodeData: qrCodeData,
            id: uuid.v4(),
        });

        if (updatedDataForReturning)
            return await EncryptedStorage.setItem(
                qrStorageName,
                JSON.stringify({
                    updatedDataForReturning
                })
            );

    },
    async getQRCodes() {
        let prevQRCodeData = await EncryptedStorage.getItem(qrStorageName);
        if (!prevQRCodeData) return;
        let parsedQRCodeData = await JSON.parse(prevQRCodeData);
        let data;

        try {
            data = JSON.parse(parsedQRCodeData);

            if (data !== undefined) {

                return data;
            }
        } catch (error) {
            console.log(error);
        }

    },
    async deleteQRCode(qrCodeId: string) {

        let prevQRCodeData = await EncryptedStorage.getItem(qrStorageName);
        if (!prevQRCodeData) return;
        let parsedQRCodeData = await JSON.parse(prevQRCodeData);

        let data = parsedQRCodeData.data.filter((el: any) => el.id != qrCodeId);

        if (await data) {
            return await EncryptedStorage.setItem(
                qrStorageName,
                JSON.stringify({
                    data
                })
            );
        }
    }
}