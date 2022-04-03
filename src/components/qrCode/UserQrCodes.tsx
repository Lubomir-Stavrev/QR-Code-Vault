import React, { useEffect, useState, FC } from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    StatusBar,
    ScrollView,
    TouchableOpacity
} from 'react-native';


import storageServices from '../../services/encryptedStorage'
import QRCode from 'react-native-qrcode-svg';

interface Props {
    goToOptions: () => void;
}

const UserQrCodes: FC<Props> = (props) => {
    const [userQRCodes, setUserQRCodes] = useState<Array<{ id: string, qrCodeData: string }>>();
    const [collectionViewState, setCollectionViewState] = useState<boolean | undefined>(true);
    const [QRCodeValue, setQRCodeValue] = useState<string | undefined>();
    useEffect(() => {
        getAndSaveQRCodes()

    }, [])

    async function getAndSaveQRCodes() {

        let userQRCodes = await storageServices.getQRCodes();
        if (userQRCodes) setUserQRCodes(userQRCodes.data);

    }

    const deleteQRCode = (qrcode: string) => {

        storageServices.deleteQRCode(qrcode).then(() => {
            setCollectionViewState(true);

        }).catch(err => {
            console.log(err);
        })
    }
    const showPressedQRCodeData = (qrData: string) => {
        setQRCodeValue(qrData);
        setCollectionViewState(false);
    }

    return (
        <>
            <Text style={{ fontSize: 30 }}>QR Codes Collection</Text>

            <SafeAreaView style={styles.scrollViewContainer}>
                {collectionViewState ?
                    <>
                        <TouchableOpacity
                            style={{ zIndex: 100, left: 0, bottom: '20%', backgroundColor: '#ffff', padding: 10, position: 'absolute', borderRadius: 10 }}
                            onPress={() => props.goToOptions()}
                        >
                            <View>
                                <Text style={{ color: 'black', fontSize: 20 }}>Go Back</Text>
                            </View>
                        </TouchableOpacity>
                        {
                            userQRCodes && userQRCodes.length > 0 ?
                                userQRCodes.map(item => {
                                    return (
                                        <ScrollView key={item.id}>
                                            <View style={{
                                                padding: 10,
                                                backgroundColor: '#FFCC1D',
                                                marginBottom: 5,
                                                borderRadius: 5
                                            }}>
                                                <TouchableOpacity style={{
                                                    position: 'absolute',
                                                    backgroundColor: '#CD1818',
                                                    height: 120,
                                                    width: 60,
                                                    borderTopRightRadius: 5,
                                                    borderBottomRightRadius: 5,
                                                    right: 0
                                                }} onPress={() => deleteQRCode(item?.id)}>

                                                    <Text style={{ alignSelf: 'center', top: 45 }}>Delete</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => showPressedQRCodeData(item?.qrCodeData)}>
                                                    <QRCode
                                                        value={item?.qrCodeData}
                                                    />

                                                </TouchableOpacity>
                                            </View>
                                        </ScrollView>)
                                })
                                :
                                <Text style={{ fontSize: 30, top: 100, }}>Collection is empty</Text>}
                    </>
                    :
                    <View>

                        <QRCode
                            value={QRCodeValue}
                            size={300}
                        />
                        <View style={{ top: '5%', backgroundColor: '#ffff', padding: 20, borderRadius: 10 }}>
                            <Text style={{ color: 'black', fontSize: 20 }}>{QRCodeValue}</Text>
                        </View>
                        <TouchableOpacity
                            style={{ left: 0, bottom: '-20%', backgroundColor: '#ffff', padding: 10, position: 'absolute', borderRadius: 10 }}
                            onPress={() => setCollectionViewState(true)}
                        >
                            <View>
                                <Text style={{ color: 'black', fontSize: 20 }}>Go Back</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                }

            </SafeAreaView>
        </>
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
    },
    scrollViewContainer: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
    },
    text: {
        fontSize: 42,
    },
});

export default UserQrCodes;
