import React, { useEffect, useState, FC } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions
} from 'react-native';


import PinCodeBackupAuth from '../../components/pinCodeBackupAuth/PinCodeBackup';
import BiometricAuth from '../../components/biometricAuth/BiometricAuth';

import TouchID from 'react-native-touch-id';

interface Props {
    navigation: { navigate: (text: string) => void }
}
const Authentication: FC<Props> = (props) => {

    const [isBiometricSignIn, setIsBiometricSignIn] = useState<boolean | null>(false);
    const [isSignedIn, setIsSignedIn] = useState<boolean | null>(false);

    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;


    const isBiometricSignInSupported = () => {

        TouchID.isSupported()
            .then(biometryType => {
                setIsBiometricSignIn(true);

                if (biometryType === 'FaceID') {
                    console.log('FaceID is supported.');
                } else {
                    console.log('TouchID is supported.');
                }
            })
            .catch(error => {
                setIsBiometricSignIn(false);
            });
        setIsSignedIn(true);
    }

    const onSuccesfullAuthentication = () => {
        props.navigation.navigate('QRCodeRoute')
    }

    const handlePinCodeSignIn = () => {
        setIsBiometricSignIn(false);
    }


    return (
        <View style={styles.authContainer}>
            <View style={{ top: "5%" }}>
                {!isSignedIn ?
                    <View style={{ flex: 1, height: windowHeight, width: windowWidth, alignItems: 'center' }}>
                        <Text style={{ fontSize: 35, letterSpacing: 1, color: 'white', fontFamily: 'Roboto', }}>QR Code Vault</Text>
                        <View style={{ flex: 1, marginTop: "20%", alignItems: 'center' }}>

                            <TouchableOpacity onPress={() => isBiometricSignInSupported()}>
                                <View style={styles.buttonContainer}>
                                    <Text style={styles.buttonText}>Sign in</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View> :

                    isBiometricSignIn ?
                        <BiometricAuth handlePinCodeSignIn={handlePinCodeSignIn} onSuccesfullAuthentication={onSuccesfullAuthentication}></BiometricAuth>
                        :
                        <PinCodeBackupAuth onSuccesfullAuthentication={onSuccesfullAuthentication} ></PinCodeBackupAuth>

                }
            </View>
        </View >
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
    },
    buttonContainer: {
        backgroundColor: "#01a3ea",
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        borderRadius: 5,
        margin: 10,
        width: "100%",
        padding: 10,
        paddingTop: 15,
        paddingBottom: 15,
    },
    buttonText: {
        fontWeight: '700',
        fontFamily: 'Roboto',
        color: "#ffff",
        letterSpacing: 1,
        fontSize: 22,
    }
});

export default Authentication;
