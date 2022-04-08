import React, {FC} from 'react';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';

import authStyles from '../../styles/AuthStyles';

import TouchID from 'react-native-touch-id';
import {useMutation} from 'react-query';

interface Props {
  navigation: {navigate: (text: string) => void};
}

const Authentication: FC<Props> = ({navigation}) => {
  const checkIsSupported = () => {
    return TouchID.isSupported();
  };
  const isBiometricSignInSupported = useMutation(checkIsSupported, {
    onSuccess: () => {
      navigation.navigate('BiometricAuth');
    },
    onError: () => {
      navigation.navigate('PinCodeBackupAuth');
    },
  });

  return (
    <View style={authStyles.authContainer}>
      <View>
        {!isBiometricSignInSupported.isLoading ? (
          <View style={authStyles.authTitleContainer}>
            <Text style={authStyles.authTitleText}>QR Code Vault</Text>
            <View style={authStyles.signInButtonContainer}>
              <TouchableOpacity
                onPress={() => isBiometricSignInSupported.mutateAsync()}>
                <View style={authStyles.button}>
                  <Text style={authStyles.buttonText}>Sign in</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <ActivityIndicator size="large" />
        )}
      </View>
    </View>
  );
};

export default Authentication;
