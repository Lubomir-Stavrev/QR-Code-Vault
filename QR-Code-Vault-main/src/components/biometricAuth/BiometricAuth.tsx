import React, {FC} from 'react';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';

import {useAuthenticateId} from './useAuthenticateId';
import styles from '../../styles/AuthStyles';
interface Props {
  navigation: {navigate: (text: string) => void};
}

const BiometricAuth: FC<Props> = props => {
  const {isLoading, isError} = useAuthenticateId(props);

  return (
    <View style={[styles.authContainer, styles.horizontal]}>
      {isLoading ? (
        <ActivityIndicator testID={'ActivityIndicator'} size="large" />
      ) : isError ? (
        <View>
          <Text testID={'textUserCanceledAuth'} style={styles.errorMessage}>
            User canceled authentication
          </Text>
          <TouchableOpacity
            accessibilityLabel="pinCodeBackUpTouchableOpacity"
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
