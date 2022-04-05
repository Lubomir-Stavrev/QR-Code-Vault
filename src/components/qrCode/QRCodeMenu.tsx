import React, { useState, FC, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import QRCodeScan from './QRCodeScan';
import UserQrCodes from './UserQrCodes';
import styles from '../../styles/QRCodeStyles'

const QRCodeRoute: FC = () => {
  const [optionsViewState, setOptionViewState] = useState<boolean | null>(true);
  const [isAddQRCode, setIsAddQRCode] = useState<boolean | null>(false);

  useEffect(() => {
    throw new Error("asd");
  })
  const handleQRCodeOptionPressed = (isAddQRCodeState: boolean) => {

    setIsAddQRCode(isAddQRCodeState);
    setOptionViewState(false);
  };

  const goToOptions = () => {

    setOptionViewState(true);
  };

  return (
    <View style={styles.qrContainer}>
      <View >
        {optionsViewState ? (
          <View
            style={styles.qrMenuContainer}>
            <Text
              style={styles.qrMenuTitle}>
              QR Code Vault
            </Text>
            <View >
              <TouchableOpacity onPress={() => handleQRCodeOptionPressed(true)}>
                <View style={styles.menuButtonContainer}>
                  <Text style={styles.menuButtonText}>Scan QR CODE</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleQRCodeOptionPressed(false)}>
                <View style={styles.menuButtonContainer}>
                  <Text style={styles.menuButtonText}>View QR code collection</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ) : isAddQRCode ? (
          <QRCodeScan goToOptions={goToOptions} />
        ) : (
          <UserQrCodes goToOptions={goToOptions} />
        )}
      </View>
    </View>
  );
};



export default QRCodeRoute;
