import React, { useEffect, useState, FC } from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    FlatList,
    StatusBar,
    TouchableOpacity
} from 'react-native';


import storageServices from '../storageServices/encryptedStorage'
import QRCode from 'react-native-qrcode-svg';

interface Props {
    goToOptions: () => void;
}

const UserQrCodes: FC<Props> = (props) => {
    const [userQRCodes, setUserQRCodes] = useState();
    const [collectionViewState, setCollectionViewState] = useState<boolean | null>(true);
    const [QRCodeValue, setQRCodeValue] = useState<string | null>();
    useEffect(() => {
        getAndSaveQRCodes()

    }, [])

    async function getAndSaveQRCodes() {

        let data = await storageServices.getQRCodes();

        if (await data) {
            console.log(data.data.length)
            setUserQRCodes(prev => data.data);
        }
    }

    const deleteQRCode = (qrcode) => {

        storageServices.deleteQRCode(qrcode).then(res => {
            setCollectionViewState(prev => true);
            getAndSaveQRCodes()


        }).catch(err => {
            console.log(err);
        })
    }
    const showQRData = (qrData) => {
        setQRCodeValue(prev => qrData);
        setCollectionViewState(prev => false);
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
                            userQRCodes?.length > 0 ?
                                <FlatList
                                    data={userQRCodes ? userQRCodes : null}
                                    keyExtractor={(item) => item?.id}
                                    renderItem={({ item }) => (
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
                                            <TouchableOpacity onPress={() => showQRData(item?.qrCodeData)}>
                                                <QRCode
                                                    value={item?.qrCodeData}
                                                />

                                            </TouchableOpacity>
                                        </View>
                                    )} />

                                :
                                <Text style={{ fontSize: 30, top: 100, }}>Collection is empty</Text>}
                    </>
                    :
                    <View style={{ justifyContant: 'center' }}>

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
