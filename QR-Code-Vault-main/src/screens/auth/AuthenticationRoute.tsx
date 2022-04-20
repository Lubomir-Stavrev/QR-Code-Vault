import React, {FC} from 'react';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import authStyles from '../../styles/AuthStyles';

import {useIsBiometricSignInSupported} from './useIsBiometricSignInSupported';

interface Props {
  navigation: {navigate: (text: string) => void};
}

const Authentication: FC<Props> = ({navigation}) => {
  const isBiometricSignInSupported = useIsBiometricSignInSupported(navigation);

  return (
    <View accessibilityLabel="welcomeAuth" style={authStyles.authContainer}>
      <View>
        {!isBiometricSignInSupported.isLoading ? (
          <View style={authStyles.authTitleContainer}>
            <Text style={authStyles.authTitleText}>QR Code Vault</Text>
            <View style={authStyles.signInButtonContainer}>
              <TouchableOpacity
                accessibilityLabel="isBiometricSignInSupportedButton"
                onPress={() => isBiometricSignInSupported.mutateAsync()}>
                <View style={authStyles.button}>
                  <Text style={authStyles.buttonText}>Sign in</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <ActivityIndicator
            accessibilityLabel="loadingIndicator"
            size="large"
          />
        )}
      </View>
    </View>
  );
};

export default Authentication;
