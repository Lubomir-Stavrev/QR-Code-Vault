import React, {useState, FC} from 'react';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';

import PinCodeBackupAuth from '../../components/pinCodeBackupAuth/PinCodeBackup';
import BiometricAuth from '../../components/biometricAuth/BiometricAuth';
import authStyles from '../../styles/AuthStyles';

import TouchID from 'react-native-touch-id';
import {useMutation} from 'react-query';

interface Props {
  navigation: {navigate: (text: string) => void};
}

const Authentication: FC<Props> = props => {
  const [isGoingToBiometricSignIn, setIsGoingToBiometricSignIn] =
    useState(false);

  const checkIsSupported = () => {
    return TouchID.isSupported().then(() => setIsGoingToBiometricSignIn(true));
  };
  const isBiometricSignInSupported = useMutation(checkIsSupported);

  const onSuccesfullAuthentication = () => {
    props.navigation.navigate('QRCodeRoute');
  };

  const handlePinCodeSignIn = () => {
    setIsGoingToBiometricSignIn(false);
  };

  return (
    <View style={authStyles.authContainer}>
      <View>
        {!isGoingToBiometricSignIn ? (
          <View style={authStyles.authTitleContainer}>
            <Text style={authStyles.authTitleText}>QR Code Vault</Text>
            <View style={authStyles.signInButtonContainer}>
              <TouchableOpacity
                onPress={() => isBiometricSignInSupported.mutate()}>
                <View style={authStyles.button}>
                  <Text style={authStyles.buttonText}>Sign in</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ) : isBiometricSignInSupported.isLoading ? (
          <ActivityIndicator size="large" />
        ) : isBiometricSignInSupported.isSuccess ? (
          <BiometricAuth
            handlePinCodeSignIn={handlePinCodeSignIn}
            onSuccesfullAuthentication={onSuccesfullAuthentication}
          />
        ) : (
          <PinCodeBackupAuth
            onSuccesfullAuthentication={onSuccesfullAuthentication}
          />
        )}
      </View>
    </View>
  );
};

export default Authentication;
