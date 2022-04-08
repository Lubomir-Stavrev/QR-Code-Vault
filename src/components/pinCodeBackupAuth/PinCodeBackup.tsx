import React, {FC} from 'react';
import {ActivityIndicator} from 'react-native';
import styles from '../../styles/AuthStyles';

import * as Keychain from 'react-native-keychain';
import PINCode, {hasUserSetPinCode} from '@haskkor/react-native-pincode';
import Snackbar from 'react-native-snackbar';
import {useMutation, useQuery} from 'react-query';

const pinCodeKeychainName = 'pincode';
const defaultPasswordLength = 6;

interface Props {
  onSuccesfullAuthentication: () => void;
}

const PinCodeBackup: FC<Props> = props => {
  const hasUserSetPinData = useQuery('hasUserSetPinData', () =>
    hasUserSetPinCode(pinCodeKeychainName),
  );

  const saveToKeychain = (pin: string | undefined) => {
    if (pin) {
      return Keychain.setInternetCredentials(
        pinCodeKeychainName,
        pinCodeKeychainName,
        pin,
      );
    } else {
      throw new Error();
    }
  };
  const savePinInKeyChain = useMutation(saveToKeychain);

  return (
    <>
      {hasUserSetPinData.isLoading ? (
        <ActivityIndicator size="large" />
      ) : hasUserSetPinData.data ? (
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
            finishProcess={pin => savePinInKeyChain.mutate(pin)}
          />
          {hasUserSetPinData.isError || savePinInKeyChain.isError
            ? Snackbar.show({
                text: hasUserSetPinData.isError
                  ? 'Pin code validation failed'
                  : 'Pin code SignUp failed',
                duration: Snackbar.LENGTH_LONG,
              })
            : null}
        </>
      )}
    </>
  );
};

export default PinCodeBackup;
