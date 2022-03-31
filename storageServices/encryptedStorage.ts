const qrStorageName = "qrCodeStorage";

import EncryptedStorage from 'react-native-encrypted-storage';
import uuid from 'react-native-uuid';

export default {

    async addQRCode(qrCodeData) {
        let prevData = await JSON.parse(await EncryptedStorage.getItem(qrStorageName));
        let data;

        if (await prevData) {
            data = prevData.data;
        } else {
            data = [];
        }

        data.push({
            qrCodeData: qrCodeData,
            id: uuid.v4(),
        });

        if (await data) {
            return await EncryptedStorage.setItem(
                qrStorageName,
                JSON.stringify({
                    data
                })
            );
        }
    },
    async getQRCodes() {
        let data;
        try {
            data = JSON.parse(await EncryptedStorage.getItem(qrStorageName));

            if (data !== undefined) {

                return data;
            }
        } catch (error) {
            console.log(error);
        }

    },
    async deleteQRCode(qrCodeId) {
        let prevData = await JSON.parse(await EncryptedStorage.getItem(qrStorageName));
        let data = prevData.data.filter(el => el.id != qrCodeId);

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