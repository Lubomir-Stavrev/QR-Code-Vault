import React, {FC} from 'react';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {useSyncData} from './queryServices/useSyncData';
//import encryptedStorage from '../../services/encryptedStorage';
import styles from '../../styles/QRCodeStyles';

interface Props {
  navigation: {navigate: (text: string) => void};
}
const QRCodeRoute: FC<Props> = props => {
  const {syncData, isLoading} = useSyncData();

  return (
    <View style={styles.qrContainer} accessibilityLabel="QRCodeMenuContainer">
      <View>
        <View style={styles.qrMenuContainer}>
          <Text style={styles.qrMenuTitle}>QR Code Vault</Text>
          <View>
            {isLoading ? (
              <ActivityIndicator testID={'ActivityIndicator'} size="large" />
            ) : null}
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
            <TouchableOpacity
              accessibilityLabel="syncData"
              onPress={() => syncData()}>
              <View style={styles.menuButtonContainer}>
                <Text style={styles.menuButtonText}>SYNC QR codes</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default QRCodeRoute;
