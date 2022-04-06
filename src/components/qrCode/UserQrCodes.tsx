import React, {useEffect, useState, FC} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import storageServices from '../../services/encryptedStorage';
import QRCode from 'react-native-qrcode-svg';
import Snackbar from 'react-native-snackbar';
import styles from '../../styles/QRCodeStyles';

interface Props {
  goToOptions: () => void;
}

interface QRData {
  qrCodeData?: string | undefined;
  id: string;
}

const UserQrCodes: FC<Props> = ({goToOptions}) => {
  const [userQRCodes, setUserQRCodes] = useState<QRData[]>();
  const [collectionViewState, setCollectionViewState] = useState<
    boolean | undefined
  >(true);
  const [QRCodeValue, setQRCodeValue] = useState<string | undefined>();

  const [hasGetAndSaveQRCodesFailed, setHasGetAndSaveQRCodesFailed] = useState<
    boolean | null
  >(false);
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getAndSaveQRCodes()
      .then(() => setIsLoading(false))
      .catch(() => {
        setHasGetAndSaveQRCodesFailed(true);
        setErrorMessage("Couldn't get QR codes collection.");
        setIsLoading(false);
      });
  }, []);

  async function getAndSaveQRCodes() {
    let userQRCodesCollection: QRData[] | undefined =
      await storageServices.getQRCodes();

    if (userQRCodesCollection) {
      setUserQRCodes(userQRCodesCollection);
    }
  }

  const deleteQRCode = (qrcode: string) => {
    setIsLoading(true);
    storageServices
      .deleteQRCode(qrcode)
      .then(() => {
        setCollectionViewState(true);
      })
      .catch(err => {
        console.log(err);
      });
    setIsLoading(false);
  };

  const showPressedQRCodeData = (qrData: string | undefined) => {
    setQRCodeValue(qrData);
    setCollectionViewState(false);
  };

  return (
    <>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <Text style={styles.bigText}>QR Codes Collection</Text>
          {hasGetAndSaveQRCodesFailed
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
          <SafeAreaView style={styles.scrollViewContainer}>
            {collectionViewState ? (
              <>
                <TouchableOpacity
                  style={styles.goBackButton}
                  onPress={() => goToOptions()}>
                  <View>
                    <Text>Go Back</Text>
                  </View>
                </TouchableOpacity>
                {userQRCodes && userQRCodes.length > 0 ? (
                  userQRCodes.map(item => {
                    return (
                      <ScrollView key={item.id}>
                        <View style={styles.qrCodeRow}>
                          <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => deleteQRCode(item?.id)}>
                            <Text>Delete</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() =>
                              showPressedQRCodeData(item?.qrCodeData)
                            }>
                            <QRCode value={item?.qrCodeData} />
                          </TouchableOpacity>
                        </View>
                      </ScrollView>
                    );
                  })
                ) : (
                  <Text>Collection is empty</Text>
                )}
              </>
            ) : (
              <View>
                <QRCode value={QRCodeValue} size={300} />
                <View style={styles.qrCodeValueContainer}>
                  <Text style={styles.smallText}>{QRCodeValue}</Text>
                </View>
                <TouchableOpacity
                  style={styles.goBackButton}
                  onPress={() => setCollectionViewState(true)}>
                  <View>
                    <Text style={styles.smallText}>Go Back</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </SafeAreaView>
        </>
      )}
    </>
  );
};
export default UserQrCodes;
