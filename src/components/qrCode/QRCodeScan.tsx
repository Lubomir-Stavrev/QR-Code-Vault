import React, { FC } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
} from 'react-native';


import QRCodeScanner from 'react-native-qrcode-scanner';
import storageServices from '../../services/encryptedStorage'

interface Props {
    goToOptions: () => void;
}

const QRCodeScan: FC<Props> = ({ goToOptions }) => {

    const windowHeight = Dimensions.get('window').height;


    const saveQRCode = async (qrCodeData: string | undefined) => {

        if (qrCodeData) storageServices.addQRCode(qrCodeData).then(() => goToOptions())
            .catch(err => {
                console.log(err);
            })

    }
    return (
        <View style={styles.container}>
            <View style={{ top: "5%" }}>
                <QRCodeScanner
                    cameraStyle={{ height: windowHeight }}
                    showMarker
                    onRead={(data) => saveQRCode(data.data)}

                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16
    },
    container: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#202020'
    }
});

export default QRCodeScan;
