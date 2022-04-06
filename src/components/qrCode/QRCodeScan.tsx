import React, {FC, useState} from 'react';
import {View, Dimensions, ActivityIndicator} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import storageServices from '../../services/encryptedStorage';
import Snackbar from 'react-native-snackbar';
import styles from '../../styles/QRCodeStyles';

interface Props {
  goToOptions: () => void;
}
const windowHeight = Dimensions.get('window').height;

const QRCodeScan: FC<Props> = ({goToOptions}) => {
  const [hasQRCodeSavingFailed, setHasQRCodeSavingFailed] = useState<
    boolean | null
  >(false);
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const saveQRCode = async (qrCodeData: string | undefined) => {
    setIsLoading(true);
    if (qrCodeData) {
      storageServices
        .addQRCode(qrCodeData)
        .then(() => goToOptions())
        .catch(() => {
          setHasQRCodeSavingFailed(true);
          setErrorMessage("QR code didn't saved correctly");
        });
      setIsLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          <QRCodeScanner
            cameraStyle={{height: windowHeight}}
            showMarker
            onRead={data => saveQRCode(data.data)}
          />
          {hasQRCodeSavingFailed
            ? Snackbar.show({
                text: errorMessage ?? 'Something went wrong',
                duration: Snackbar.LENGTH_INDEFINITE,
                action: {
                  text: 'go to menu',
                  textColor: 'green',
                  onPress: () => {
                    goToOptions();
                  },
                },
              })
            : null}
        </View>
      )}
    </View>
  );
};

export default QRCodeScan;
