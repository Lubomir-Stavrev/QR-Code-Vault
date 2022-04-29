import React, {FC} from 'react';
import {View, Dimensions, ActivityIndicator} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import Snackbar from 'react-native-snackbar';
import styles from '../../styles/QRCodeStyles';
import {useSaveQRCode} from './queryServices/useSaveQRCode';

interface Props {
  navigation: {navigate: (text: string) => void};
}
const windowHeight = Dimensions.get('window').height;

const QRCodeScan: FC<Props> = ({navigation}) => {
  const saveQRCode = useSaveQRCode(navigation);

  return (
    <View style={styles.container}>
      {saveQRCode.isLoading ? (
        <ActivityIndicator testID="ActivityIndicator" size="large" />
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
                    navigation.navigate('QRCodeMenu');
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
