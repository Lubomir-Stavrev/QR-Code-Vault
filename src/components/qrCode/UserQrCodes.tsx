import React, {FC, useState} from 'react';
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
import {useMutation, useQuery, useQueryClient} from 'react-query';

interface Props {
  goToOptions: () => void;
}
const UserQrCodes: FC<Props> = ({goToOptions}) => {
  const queryClient = useQueryClient();
  const [showAllQRCodes, setShowAllQRCodes] = useState(true);

  const getQRCodes = () => {
    return storageServices.getQRCodes();
  };
  const getQRCodesData = useQuery('getQRCodesData', () => getQRCodes());

  const deleteQrCodeFromStorage = (qrCode: string) => {
    return storageServices.deleteQRCode(qrCode);
  };
  const deleteQRCode = useMutation(deleteQrCodeFromStorage, {
    onSuccess: () => {
      queryClient.invalidateQueries('getQRCodesData');
    },
  });
  const getOne = (qrDataId: string) => {
    return storageServices.getOneQRCode(qrDataId);
  };
  const showPressedQRCode = useMutation(getOne, {
    onSuccess: () => {
      setShowAllQRCodes(false);
    },
  });

  return (
    <>
      {getQRCodesData.isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <Text style={styles.bigText}>QR Codes Collection</Text>
          {getQRCodesData.isError
            ? Snackbar.show({
                text: "Couldn't get QR codes collection.",
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
            {showAllQRCodes ? (
              <>
                <TouchableOpacity
                  style={styles.goBackButton}
                  onPress={() => goToOptions()}>
                  <View>
                    <Text>Go Back</Text>
                  </View>
                </TouchableOpacity>
                {getQRCodesData.data && getQRCodesData.data.length > 0 ? (
                  getQRCodesData.data.map(item => {
                    return (
                      <ScrollView key={item.id}>
                        <View style={styles.qrCodeRow}>
                          <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => deleteQRCode.mutate(item?.id)}>
                            <Text>Delete</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => showPressedQRCode.mutate(item?.id)}>
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
                <QRCode value={showPressedQRCode.data?.qrCodeData} size={300} />
                <View style={styles.qrCodeValueContainer}>
                  <Text style={styles.smallText}>
                    {showPressedQRCode.data?.qrCodeData}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.goBackButton}
                  onPress={() => setShowAllQRCodes(true)}>
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
