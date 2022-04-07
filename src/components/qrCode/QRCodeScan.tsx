import React, {FC, useState} from 'react';
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
  const [hasQRCodeSavingFailed, setHasQRCodeSavingFailed] =
    useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const saveQRCodeRequest = (data: string) => {
    return storageServices.addQRCode(data);
  };

  const saveQRCode = useMutation(saveQRCodeRequest, {
    onSuccess: () => {
      goToOptions();
    },
    onError: () => {
      setHasQRCodeSavingFailed(true);
      setErrorMessage("QR code wasn't saved correctly");
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
          {hasQRCodeSavingFailed
            ? Snackbar.show({
                text: errorMessage ? errorMessage : 'Something went wrong.',
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
