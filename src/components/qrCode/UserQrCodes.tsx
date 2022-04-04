import React, { useEffect, useState, FC } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import storageServices from '../../services/encryptedStorage';
import QRCode from 'react-native-qrcode-svg';
import styles from '../../styles/QRCodeStyles'

interface Props {
  goToOptions: () => void;
}

interface QRData {
  qrCodeData?: string | undefined;
  id: string;
}

const UserQrCodes: FC<Props> = props => {
  const [userQRCodes, setUserQRCodes] = useState<QRData[]>();
  const [collectionViewState, setCollectionViewState] = useState<boolean | undefined>(true);
  const [QRCodeValue, setQRCodeValue] = useState<string | undefined>();

  useEffect(() => {
    getAndSaveQRCodes();
  }, []);

  async function getAndSaveQRCodes() {

    let userQRCodes: QRData[] | undefined = await storageServices.getQRCodes();
    if (userQRCodes) {
      setUserQRCodes(userQRCodes);
    }
  }

  const deleteQRCode = (qrcode: string) => {
    storageServices
      .deleteQRCode(qrcode)
      .then(() => {
        setCollectionViewState(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const showPressedQRCodeData = (qrData: string | undefined) => {
    setQRCodeValue(qrData);
    setCollectionViewState(false);
  };

  return (
    <>
      <Text style={styles.bigText}>QR Codes Collection</Text>

      <SafeAreaView style={styles.scrollViewContainer}>
        {collectionViewState ? (
          <>
            <TouchableOpacity
              style={{ ...styles.goBackButton, bottom: '20%' }}
              onPress={() => props.goToOptions()}>
              <View>
                <Text style={{ color: 'black', fontSize: 20 }}>Go Back</Text>
              </View>
            </TouchableOpacity>
            {userQRCodes && userQRCodes.length > 0 ? (
              userQRCodes.map(item => {
                return (
                  <ScrollView key={item.id}>
                    <View
                      style={styles.qrCodeRow}>
                      <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => deleteQRCode(item?.id)}>
                        <Text style={{ alignSelf: 'center', top: 45 }}>
                          Delete
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => showPressedQRCodeData(item?.qrCodeData)}>
                        <QRCode value={item?.qrCodeData} />
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                );
              })
            ) : (
              <Text style={{ fontSize: 30, top: 100 }}>Collection is empty</Text>
            )}
          </>
        ) : (
          <View>
            <QRCode value={QRCodeValue} size={300} />
            <View
              style={styles.qrCodeValueContainer}>
              <Text style={styles.smallText}>{QRCodeValue}</Text>
            </View>
            <TouchableOpacity
              style={{ ...styles.goBackButton, bottom: '-20%' }}
              onPress={() => setCollectionViewState(true)}>
              <View>
                <Text style={styles.smallText}>Go Back</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </>
  );
};
export default UserQrCodes;
