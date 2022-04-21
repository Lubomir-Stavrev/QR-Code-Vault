import React, {FC} from 'react';
import {ActivityIndicator, View} from 'react-native';
import styles from '../../styles/AuthStyles';

import PINCode from '@haskkor/react-native-pincode';
import Snackbar from 'react-native-snackbar';

import {useHasUserSetPinData} from './useHasUserSetPinData';
import {useSavePinInKeyChain} from './useSavePinInKeyChain';

const defaultPasswordLength = 6;

interface Props {
  navigation: {navigate: (text: string) => void};
}

const PinCodeBackup: FC<Props> = props => {
  const hasUserSetPinData = useHasUserSetPinData();
  const savePinInKeyChain = useSavePinInKeyChain(props.navigation);

  return (
    <View accessibilityLabel="pinCodeBackup" style={{flex: 1}}>
      {hasUserSetPinData.isLoading ? (
        <ActivityIndicator testID="ActivityIndicator" size="large" />
      ) : hasUserSetPinData.data ? (
        <PINCode
          alphabetCharsVisible={false}
          iconButtonDeleteDisabled={true}
          stylePinCodeDeleteButtonText={styles.pinText}
          stylePinCodeTextButtonCircle={styles.pinText}
          colorCircleButtons={'rgba(75,75,75,1)'}
          passwordLength={defaultPasswordLength}
          stylePinCodeTextTitle={styles.pinText}
          styleLockScreenTitle={styles.pinText}
          status={'enter'}
          finishProcess={() => props.navigation.navigate('QRCodeMenu')}
        />
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
    </View>
  );
};

export default PinCodeBackup;
