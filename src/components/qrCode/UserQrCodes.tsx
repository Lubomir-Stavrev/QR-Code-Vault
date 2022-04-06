import React, {useState, FC} from 'react';
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
import {useMutation, useQuery, QueryClient} from 'react-query';

interface Props {
  goToOptions: () => void;
}

interface QRData {
  qrCodeData?: string | undefined;
  id: string;
}
const queryClient = new QueryClient();

const UserQrCodes: FC<Props> = ({goToOptions}) => {
  const [userQRCodes, setUserQRCodes] = useState<QRData[]>();
  const [collectionViewState, setCollectionViewState] = useState<
    boolean | undefined
  >(true);

  const [QRCodeValue, setQRCodeValue] = useState<string | undefined>();
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const [hasError, setHasError] = useState<boolean>(false);

  const {isLoading, isError} = useQuery('getQRCodesData', () =>
    getQRCodes().then((userQRCodesCollection: QRData[] | undefined) =>
      setUserQRCodes(userQRCodesCollection),
    ),
  );
  if (isError) {
    setHasError(true);
    setErrorMessage("Couldn't get QR codes collection.");
  }
  const getQRCodes = () => {
    return storageServices.getQRCodes();
  };

  const deleteQrCodeFromStorage = (qrCode: string) => {
    return storageServices.deleteQRCode(qrCode);
  };
  const deleteQRCode = useMutation(deleteQrCodeFromStorage, {
    onSuccess: () => {
      queryClient.invalidateQueries('getQRCodesData');
      setCollectionViewState(true);
    },
    onError: () => {
      setHasError(true);
      setErrorMessage("Couldn't delete QR code from collection.");
    },
  });

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
          {hasError
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
                            onPress={() => deleteQRCode.mutate(item?.id)}>
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
