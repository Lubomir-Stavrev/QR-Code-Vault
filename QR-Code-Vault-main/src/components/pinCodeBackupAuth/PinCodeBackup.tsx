import React, {FC} from 'react';
import {ActivityIndicator, View} from 'react-native';
import styles from '../../styles/AuthStyles';

import PINCode from '../../e2e/__mocks__/PINCodeProvider';
import Snackbar from 'react-native-snackbar';

import {useHasUserSetPinData} from './useHasUserSetPinData';
import {useSavePinInKeyChain} from './useSavePinInKeyChain';

const defaultPasswordLength = 6;

interface Props {
  navigation: {navigate: (text: string) => void};
}

const PinCodeBackup: FC<Props> = props => {
  const hasUserSetPinData = useHasUserSetPinData();
  const savePinInKeyChain = useSavePinInKeyChain();

  return (
    <View accessibilityLabel="pinCodeBackup" style={{flex: 1}}>
      {hasUserSetPinData.isLoading ? (
        <ActivityIndicator testID="ActivityIndicator" size="large" />
      ) : hasUserSetPinData.isSuccess ? (
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
