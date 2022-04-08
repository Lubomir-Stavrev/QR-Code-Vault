import React, {FC} from 'react';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';

import {useQuery} from 'react-query';
import TouchID from 'react-native-touch-id';
import styles from '../../styles/AuthStyles';
interface Props {
  navigation: {navigate: (text: string) => void};
}

const BiometricAuth: FC<Props> = props => {
  const optionalConfigObject = {
    title: 'Authentication Required',
    imageColor: '#FFCC1D',
    imageErrorColor: '#ff0000',
    sensorDescription: 'Touch sensor',
    cancelText: 'Cancel',
    fallbackLabel: 'Show Passcode',
    unifiedErrors: true,
    passcodeFallback: true,
    sensorErrorDescription: 'Too many attempts',
  };
  const {isLoading, isError} = useQuery<Boolean, Error>(
    'authData',
    () => TouchID.authenticate('Authenticate', optionalConfigObject),
    {
      onSuccess: () => {
        props.navigation.navigate('QRCodeMenu');
      },
    },
  );

  return (
    <View style={[styles.authContainer, styles.horizontal]}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : isError ? (
        <View>
          <Text style={styles.errorMessage}>User canceled authentication</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('PinCodeBackupAuth')}>
            <View style={styles.button}>
              <Text style={styles.signInButton}>Sign In with pin code</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default BiometricAuth;
