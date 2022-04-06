import React, {useState, FC} from 'react';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';

import PinCodeBackupAuth from '../../components/pinCodeBackupAuth/PinCodeBackup';
import BiometricAuth from '../../components/biometricAuth/BiometricAuth';
import authStyles from '../../styles/AuthStyles';

import TouchID from 'react-native-touch-id';

interface Props {
  navigation: {navigate: (text: string) => void};
}

const Authentication: FC<Props> = props => {
  const [isBiometricSignIn, setIsBiometricSignIn] = useState<boolean | null>(
    false,
  );
  const [isSignedIn, setIsSignedIn] = useState<boolean | null>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isBiometricSignInSupported = () => {
    setIsLoading(true);
    TouchID.isSupported()
      .then(biometryType => {
        setIsBiometricSignIn(true);

        if (biometryType === 'FaceID') {
          console.log('FaceID is supported.');
        } else {
          console.log('TouchID is supported.');
        }
      })
      .catch(() => {
        // User's phone doesn't support biometric authentication
        // Or user canceled the biometric authentication
        // So here we set that the user didn't signed-in successfully
        setIsBiometricSignIn(false);
      });
    setIsSignedIn(true);
    setIsLoading(false);
  };

  const onSuccesfullAuthentication = () => {
    props.navigation.navigate('QRCodeRoute');
  };

  const handlePinCodeSignIn = () => {
    setIsBiometricSignIn(false);
  };

  return (
    <View style={authStyles.authContainer}>
      <View>
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : !isSignedIn ? (
          <View style={authStyles.authTitleContainer}>
            <Text style={authStyles.authTitleText}>QR Code Vault</Text>
            <View style={authStyles.signInButtonContainer}>
              <TouchableOpacity onPress={() => isBiometricSignInSupported()}>
                <View style={authStyles.button}>
                  <Text style={authStyles.buttonText}>Sign in</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ) : isBiometricSignIn ? (
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
