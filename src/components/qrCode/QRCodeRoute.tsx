import React, { useState, FC } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions
} from 'react-native';


import QRCodeScan from './QRCodeScan';
import UserQrCodes from './UserQrCodes';


const QRCodeRoute: FC = () => {

    const [optionsViewState, setOptionViewState] = useState<boolean | null>(true);
    const [isAddQRCode, setIsAddQRCode] = useState<boolean | null>(false);
    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;


    const handleQRCodeOptionPressed = (isAddQRCodeState: boolean) => {

        setIsAddQRCode(prev => isAddQRCodeState);
        setOptionViewState(prev => false)
    }

    const goToOptions = () => {

        setOptionViewState(prev => true);
    }

    return (
        <View style={styles.authContainer}>
            <View style={{ top: "5%" }}>
                {optionsViewState ?
                    <View style={{ flex: 1, height: windowHeight, width: windowWidth, alignItems: 'center' }}>
                        <Text style={{ fontSize: 35, letterSpacing: 1, color: 'white', fontFamily: 'Roboto', }}>QR Code Vault</Text>
                        <View style={{ flex: 1, marginTop: "20%", alignItems: 'center' }}>

                            <TouchableOpacity onPress={() => handleQRCodeOptionPressed(true)}>
                                <View style={styles.buttonContainer}>
                                    <Text style={styles.buttonText}>Scan QR CODE</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleQRCodeOptionPressed(false)}>
                                <View style={styles.buttonContainer}>
                                    <Text style={styles.buttonText}>View QR code collection</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    :

                    isAddQRCode ?
                        <QRCodeScan goToOptions={goToOptions}></QRCodeScan>
                        :
                        <UserQrCodes goToOptions={goToOptions} ></UserQrCodes>
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

export default QRCodeRoute;
