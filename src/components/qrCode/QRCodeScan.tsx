import React, {FC} from 'react';
import {View, Dimensions, ActivityIndicator} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import storageServices from '../../services/encryptedStorage';
import Snackbar from 'react-native-snackbar';
import styles from '../../styles/QRCodeStyles';
import {useMutation} from 'react-query';

interface Props {
  goToOptions: () => void;
}
const windowHeight = Dimensions.get('window').height;

const QRCodeScan: FC<Props> = ({goToOptions}) => {
  const saveQRCodeRequest = (data: string) => {
    return storageServices.addQRCode(data);
  };

  const saveQRCode = useMutation(saveQRCodeRequest, {
    onSuccess: () => {
      goToOptions();
    },
  });

  return (
    <View style={styles.container}>
      {saveQRCode.isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          <QRCodeScanner
            cameraStyle={{height: windowHeight}}
            showMarker
            onRead={data => saveQRCode.mutate(data.data)}
          />
          {saveQRCode.isError
            ? Snackbar.show({
                text: "QR code wasn't saved correctly",
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
