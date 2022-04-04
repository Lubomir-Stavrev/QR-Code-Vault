import React, { FC, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import * as Keychain from 'react-native-keychain';
import PINCode, { hasUserSetPinCode } from '@haskkor/react-native-pincode';

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
        let result = await hasUserSetPinCode(pinCodeKeychainName);
        if (result) {
          setIsPinCodeSettedByUser(result);
        }
      } catch (err) {
        //handle ERROR
        console.log(err);
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
      //handle error
      console.log("Keychain couldn't be accessed!", error);
    }
  };

  const createPinCodeComponent = () => {
    return (
      <PINCode
        alphabetCharsVisible={false}
        iconButtonDeleteDisabled={true}
        stylePinCodeDeleteButtonText={{
          marginTop: '30%',
          fontSize: 20,
          fontWeight: '900',
        }}
        stylePinCodeTextButtonCircle={{ fontSize: 40, fontWeight: '300' }}
        stylePinCodeCircle={{ width: 20, height: 5 }}
        colorCircleButtons={'rgba(70,70,70,1)'}
        passwordLength={defaultPasswordLength}
        stylePinCodeTextTitle={styles.pinContainerStyle}
        styleLockScreenTitle={styles.pinContainerStyle}
        status={'choose'}
        stylePinCodeTextSubtitle={{ fontSize: 20, fontWeight: '400' }}
        finishProcess={pin => savePinInKeyChain(pin)}
      />
    );
  };

  return (
    <>
      {isPinCodeSettedByUser ? (
        <>
          <PINCode
            callbackErrorTouchId={e => console.log(e)}
            alphabetCharsVisible={false}
            iconButtonDeleteDisabled={true}
            stylePinCodeDeleteButtonText={{
              marginTop: '30%',
              fontSize: 20,
              fontWeight: '900',
            }}
            stylePinCodeTextButtonCircle={{ fontSize: 40, fontWeight: '300' }}
            stylePinCodeCircle={{ width: 20, height: 5 }}
            colorCircleButtons={'rgba(75,75,75,1)'}
            passwordLength={defaultPasswordLength}
            stylePinCodeTextTitle={styles.pinContainerStyle}
            styleLockScreenTitle={styles.pinContainerStyle}
            status={'enter'}
            finishProcess={() => props.onSuccesfullAuthentication()}
          />
        </>
      ) : (
        createPinCodeComponent
      )}
    </>
  );
};

const styles = StyleSheet.create({
  pinContainerStyle: {
    fontSize: 30,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  authContainer: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    backgroundColor: '#202020',
  },
});

export default PinCodeBackup;
