import React, { FC, useEffect, useState } from 'react';

import * as Keychain from 'react-native-keychain';
import PINCode, { hasUserSetPinCode } from '@haskkor/react-native-pincode';
import styles from '../../styles/AuthStyles'

const pinCodeKeychainName = 'pincode';
const defaultPasswordLength = 6;

interface Props {
  onSuccesfullAuthentication: () => void;
}

const PinCodeBackup: FC<Props> = props => {
  const [isPinCodeSettedByUser, setIsPinCodeSettedByUser] = useState<boolean | null>(false);

  useEffect(() => {
    async function isPinCodeSetted() {
      try {
        const result = await hasUserSetPinCode(pinCodeKeychainName);
        if (result) {
          setIsPinCodeSettedByUser(result);
        }
      } catch (err) {
        throw new Error("Pin validation failed.")
      }
    }
    isPinCodeSetted();
  }, []);

  const savePinInKeyChain = (pin: string | undefined) => {

    try {
      if (pin) {
        Keychain.setInternetCredentials(
          pinCodeKeychainName,
          pinCodeKeychainName,
          pin,
        );
      }
    } catch (error) {
      throw new Error("Pin login failed.")
    }
  };


  return (
    <>
      {isPinCodeSettedByUser ? (
        <>
          <PINCode
            callbackErrorTouchId={e => console.log(e)}
            alphabetCharsVisible={false}
            iconButtonDeleteDisabled={true}
            stylePinCodeDeleteButtonText={{ ...styles.pinText, marginTop: '30%', }}
            stylePinCodeTextButtonCircle={styles.pinText}
            stylePinCodeCircle={{ width: 20, height: 5 }}
            colorCircleButtons={'rgba(75,75,75,1)'}
            passwordLength={defaultPasswordLength}
            stylePinCodeTextTitle={styles.pinText}
            styleLockScreenTitle={styles.pinText}
            status={'enter'}
            finishProcess={() => props.onSuccesfullAuthentication()}
          />
        </>
      ) : (
        <PINCode
          alphabetCharsVisible={false}
          iconButtonDeleteDisabled={true}
          stylePinCodeDeleteButtonText={{ ...styles.pinText, marginTop: '30%', }}
          stylePinCodeTextButtonCircle={styles.pinText}
          stylePinCodeCircle={{ width: 20, height: 5 }}
          colorCircleButtons={'rgba(70,70,70,1)'}
          passwordLength={defaultPasswordLength}
          stylePinCodeTextTitle={styles.pinText}
          styleLockScreenTitle={styles.pinText}
          status={'choose'}
          stylePinCodeTextSubtitle={styles.pinText}
          finishProcess={pin => savePinInKeyChain(pin)}
        />
      )}
    </>
  );
};

export default PinCodeBackup;
