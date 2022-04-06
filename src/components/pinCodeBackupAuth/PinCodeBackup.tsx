import React, {FC, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import styles from '../../styles/AuthStyles';

import * as Keychain from 'react-native-keychain';
import PINCode, {hasUserSetPinCode} from '@haskkor/react-native-pincode';
import Snackbar from 'react-native-snackbar';
import {useQuery} from 'react-query';

const pinCodeKeychainName = 'pincode';
const defaultPasswordLength = 6;

interface Props {
  onSuccesfullAuthentication: () => void;
}

const PinCodeBackup: FC<Props> = props => {
  const [isPinCodeSettedByUser, setIsPinCodeSettedByUser] = useState<
    boolean | null
  >(false);
  const [hasPinCodeValidationFailed, setHasPinCodeValidationFailed] = useState<
    boolean | null
  >(false);
  const [hasPinCodeSignUpFailed, setHasPinCodeSignUpFailed] = useState<
    boolean | null
  >(false);
  const [errorMessage, setErrorMessage] = useState<string | null>();

  const {isLoading, isError} = useQuery('hasUserSetPinData', () =>
    hasUserSetPinCode(pinCodeKeychainName).then(result =>
      setIsPinCodeSettedByUser(result),
    ),
  );

  if (isError) {
    setIsPinCodeSettedByUser(false);
    setErrorMessage('Pin code validation failed');
    setHasPinCodeValidationFailed(true);
  }

  const savePinInKeyChain = (pin: string | undefined) => {
    if (pin) {
      Keychain.setInternetCredentials(
        pinCodeKeychainName,
        pinCodeKeychainName,
        pin,
      ).then(() => setIsPinCodeSettedByUser(true));
    }
  };

  const handleFailedSignUp = () => {
    setHasPinCodeSignUpFailed(true);
    setErrorMessage('Pin code SignUp failed.');
  };

  return (
    <>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : isPinCodeSettedByUser ? (
        <>
          <PINCode
            callbackErrorTouchId={e => console.log(e)}
            alphabetCharsVisible={false}
            iconButtonDeleteDisabled={true}
            stylePinCodeDeleteButtonText={styles.pinText}
            stylePinCodeTextButtonCircle={styles.pinText}
            colorCircleButtons={'rgba(75,75,75,1)'}
            passwordLength={defaultPasswordLength}
            stylePinCodeTextTitle={styles.pinText}
            styleLockScreenTitle={styles.pinText}
            status={'enter'}
            finishProcess={() => props.onSuccesfullAuthentication()}
          />
        </>
      ) : (
        <>
          <PINCode
            alphabetCharsVisible={false}
            iconButtonDeleteDisabled={true}
            stylePinCodeDeleteButtonText={styles.pinText}
            stylePinCodeTextButtonCircle={styles.pinText}
            colorCircleButtons={'rgba(70,70,70,1)'}
            passwordLength={defaultPasswordLength}
            stylePinCodeTextTitle={styles.pinText}
            styleLockScreenTitle={styles.pinText}
            status={'choose'}
            stylePinCodeTextSubtitle={styles.pinText}
            onFail={() => handleFailedSignUp()}
            finishProcess={pin => savePinInKeyChain(pin)}
          />
          {hasPinCodeValidationFailed || hasPinCodeSignUpFailed
            ? Snackbar.show({
                text: errorMessage ?? 'Something went wrong',
                duration: Snackbar.LENGTH_LONG,
              })
            : null}
        </>
      )}
    </>
  );
};

export default PinCodeBackup;
