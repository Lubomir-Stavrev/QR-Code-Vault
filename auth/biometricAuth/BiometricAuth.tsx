import React, { useEffect, useState, FC } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';

import TouchID from 'react-native-touch-id';

interface Props {
    handlePinCodeSignIn: () => void;
    onSuccesfullAuthentication: () => void;
}

const BiometricAuth: FC<Props> = (props) => {

    const [errorMessage, setErrorMessage] = useState<string | null>();

    const optionalConfigObject = {
        title: 'Authentication Required',
        imageColor: '#FFCC1D',
        imageErrorColor: '#ff0000',
        sensorDescription: 'Touch sensor',
        cancelText: 'Cancel',
        fallbackLabel: 'Show Passcode',
        unifiedErrors: true,
        passcodeFallback: true,
        sensorErrorDescription: 'Too many attempts'
    };

    useEffect(() => {

        authenticateWithTouchID()

    }, [])

    const handleFailedAuthentication = (error) => {
        //handle error
        setErrorMessage("Something went worng");
    }

    const authenticateWithTouchID = () => {

        TouchID.authenticate('Authenticate', optionalConfigObject)
            .then(success => {
                props.onSuccesfullAuthentication();
            })
            .catch(error => {
                handleFailedAuthentication(error);
            });
    }



    return (
        <View style={[styles.container, styles.horizontal]}>
            {errorMessage ?
                <View style={{
                    height: '100%',
                    alignItems: 'center',
                }}>
                    <Text style={{ fontFamily: 'Roboto', letterSpacing: 1, fontWeight: "900", marginTop: '10%', marginBottom: '10%', fontSize: 30, color: '#ffff' }}>{errorMessage}</Text>
                    <TouchableOpacity onPress={() => props.handlePinCodeSignIn()}>
                        <View style={styles.button}>
                            <Text style={{ letterSpacing: 1, color: "#ffff", fontSize: 25, fontWeight: "900" }}>Sign In with pin code</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                :
                <ActivityIndicator size="large" />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
    button: {
        borderRadius: 5,
        backgroundColor: '#FFCC1D',
        color: '#ffff',
        justifyContant: 'center',
        padding: 10,
        paddingTop: 15,
        paddingBottom: 15,
    }
});

export default BiometricAuth;
