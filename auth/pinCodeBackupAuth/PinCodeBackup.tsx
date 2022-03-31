import React, { FC } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

import * as Keychain from 'react-native-keychain';
import PINCode, { hasUserSetPinCode, deleteUserPinCode } from '@haskkor/react-native-pincode'


const pinCodeKeychainName = 'pincode'
const defaultPasswordLength = 6;
interface Props {
    onSuccesfullAuthentication: () => void;
}
const PinCodeBackup: FC<Props> = (props) => {


    function isPinCodeSetted() {
        return hasUserSetPinCode(pinCodeKeychainName)
            .then(res => res);
    }

    const changePin = async () => {
        let result = await deleteUserPinCode(pinCodeKeychainName);
        console.log(result);

    }

    const savePinInKeyChain = async (pin) => {

        try {
            let credentials = await Keychain.setInternetCredentials(pinCodeKeychainName, pinCodeKeychainName, pin);
            console.log(credentials);
        }
        catch (error) {
            //handle error
            console.log('Keychain couldn\'t be accessed!', error);
        }

    }

    return (
        <>
            {isPinCodeSetted() ?
                <>
                    <PINCode
                        callbackErrorTouchId={(e) => console.log(e)}
                        alphabetCharsVisible={false}
                        iconButtonDeleteDisabled={true}
                        stylePinCodeDeleteButtonText={{ marginTop: "30%", fontSize: 20, fontWeight: "900" }}
                        stylePinCodeTextButtonCircle={{ fontSize: 40, fontWeight: '300' }}
                        stylePinCodeCircle={{ width: 20, height: 5 }}
                        colorCircleButtons={'rgba(75,75,75,1)'}
                        passwordLength={defaultPasswordLength}
                        stylePinCodeTextTitle={styles.pinContainerStyle}
                        styleLockScreenTitle={styles.pinContainerStyle}
                        status={'enter'}
                        finishProcess={() => props.onSuccesfullAuthentication()}
                    />
                    <View style={{ position: 'absolute', bottom: "10%", alignSelf: 'center' }}>
                        <TouchableOpacity onPress={() => changePin()}>
                            <Text style={{
                                fontSize: 25,
                                color: '#202020',
                                fontWeight: "300",

                            }}>
                                change pin
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>
                : <PINCode
                    alphabetCharsVisible={false}
                    iconButtonDeleteDisabled={true}
                    stylePinCodeDeleteButtonText={{ marginTop: "30%", fontSize: 20, fontWeight: "900" }}
                    stylePinCodeTextButtonCircle={{ fontSize: 40, fontWeight: '300' }}
                    stylePinCodeCircle={{ width: 20, height: 5 }}
                    colorCircleButtons={'rgba(70,70,70,1)'}
                    passwordLength={defaultPasswordLength}
                    stylePinCodeTextTitle={styles.pinContainerStyle}
                    styleLockScreenTitle={styles.pinContainerStyle}
                    status={'choose'}
                    stylePinCodeTextSubtitle={{ fontSize: 20, fontWeight: "400" }}
                    finishProcess={(pin) => savePinInKeyChain(pin)}
                />}
        </>
    );
};

const styles = StyleSheet.create({
    pinContainerStyle: {
        fontSize: 30,
        fontWeight: "600"
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
        backgroundColor: '#202020'
    }
});

export default PinCodeBackup;
