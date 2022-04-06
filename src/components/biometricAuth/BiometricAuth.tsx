import React, {useEffect, useState, FC} from 'react';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';

import TouchID from 'react-native-touch-id';
import styles from '../../styles/AuthStyles';
interface Props {
  handlePinCodeSignIn: () => void;
  onSuccesfullAuthentication: () => void;
}

const BiometricAuth: FC<Props> = props => {
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  useEffect(() => {
    TouchID.authenticate('Authenticate', optionalConfigObject)
      .then(() => {
        setIsLoading(false);
        props.onSuccesfullAuthentication();
      })
      .catch((err: Error) => {
        setIsLoading(false);
        handleFailedAuthentication(err.message);
      });
  });

  const handleFailedAuthentication = (error: string) => {
    setHasError(true);
    if (error !== 'User canceled authentication') {
      setErrorMessage('Something went worng');
    }
  };

  return (
    <View style={[styles.authContainer, styles.horizontal]}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : hasError ? (
        <View>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <TouchableOpacity onPress={() => props.handlePinCodeSignIn()}>
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
