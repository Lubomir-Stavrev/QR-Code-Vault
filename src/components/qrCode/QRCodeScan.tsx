import React, { FC } from 'react';
import { View, Dimensions } from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import storageServices from '../../services/encryptedStorage';
import styles from '../../styles/QRCodeStyles'
interface Props {
  goToOptions: () => void;
}

const QRCodeScan: FC<Props> = ({ goToOptions }) => {
  const windowHeight = Dimensions.get('window').height;

  const saveQRCode = async (qrCodeData: string | undefined) => {

    if (qrCodeData) {
      storageServices
        .addQRCode(qrCodeData)
        .then(() => goToOptions())
        .catch(() => {
          throw new Error("QR code didn't saved correctly")
        });
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <QRCodeScanner
          cameraStyle={{ height: windowHeight }}
          showMarker
          onRead={data => saveQRCode(data.data)}
        />
      </View>
    </View>
  );
};


export default QRCodeScan;
