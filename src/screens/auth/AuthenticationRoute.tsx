import React, {FC} from 'react';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import authStyles from '../../styles/AuthStyles';

import {useIsBiometricSignInSupported} from './useIsBiometricSignInSupported';
import {useSignInWithGoogle} from './useSignInWithGoogle';
import {useConfigureGoogleSignIn} from './useConfigureGoogleSignIn';
import {useSignOutFromGoogle} from './useSignOutFromGoogle';

import {GoogleSigninButton} from '@react-native-google-signin/google-signin';

interface Props {
  navigation: {navigate: (text: string) => void};
}

const Authentication: FC<Props> = ({navigation}) => {
  const configureGoogleSignIn = useConfigureGoogleSignIn();
  const isBiometricSignInSupported = useIsBiometricSignInSupported(navigation);
  const signInWithGoogle = useSignInWithGoogle(navigation);
  const signOutFromGoogle = useSignOutFromGoogle(navigation);

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
              {configureGoogleSignIn.isSuccess ? (
                <TouchableOpacity>
                  <GoogleSigninButton
                    size={GoogleSigninButton.Size.Standard}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={() =>
                      signInWithGoogle
                        .signIn()
                        .then(() => navigation.navigate('QRCodeMenu'))
                    }
                  />
                </TouchableOpacity>
              ) : (
                <ActivityIndicator
                  accessibilityLabel="loadingIndicator"
                  size="large"
                />
              )}
              <TouchableOpacity onPress={() => signOutFromGoogle.signOut()}>
                <View>
                  <Text>Sign Out</Text>
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
