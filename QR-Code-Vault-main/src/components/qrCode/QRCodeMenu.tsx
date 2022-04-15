import React, {FC} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

import styles from '../../styles/QRCodeStyles';

interface Props {
  navigation: {navigate: (text: string) => void};
}
const QRCodeRoute: FC<Props> = props => {
  return (
    <View style={styles.qrContainer}>
      <View>
        <View style={styles.qrMenuContainer}>
          <Text style={styles.qrMenuTitle}>QR Code Vault</Text>
          <View>
            <TouchableOpacity
              accessibilityLabel="navigateToQRCodeScan"
              onPress={() => props.navigation.navigate('QRCodeScan')}>
              <View style={styles.menuButtonContainer}>
                <Text style={styles.menuButtonText}>Scan QR CODE</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              accessibilityLabel="navigateToUserQRCodes"
              onPress={() => props.navigation.navigate('UserQrCodes')}>
              <View style={styles.menuButtonContainer}>
                <Text style={styles.menuButtonText}>
                  View QR code collection
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default QRCodeRoute;
