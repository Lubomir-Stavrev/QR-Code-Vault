import { StyleSheet, StatusBar, Dimensions } from 'react-native';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default styles = StyleSheet.create({
    qrCodeValueContainer: {
        top: '5%',
        backgroundColor: '#ffff',
        padding: 20,
        borderRadius: 10,
    },
    qrCodeRow: {
        padding: 10,
        backgroundColor: '#FFCC1D',
        borderRadius: 5,
    },
    deleteButton: {
        position: 'absolute',
        backgroundColor: '#CD1818',
        height: 120,
        width: 60,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        right: 0,
    },
    goBackButton: {
        left: 0,
        backgroundColor: '#ffff',
        padding: 10,
        position: 'absolute',
        borderRadius: 10,
    },
    smallText: {
        color: 'black', fontSize: 20
    },
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777',
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
        padding: 16,
    },
    container: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#202020',
    },
    scrollViewContainer: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
    },
    bigText: {
        fontSize: 32,
    },
    qrMenuTitle: {
        fontSize: 35,
        letterSpacing: 1,
        color: 'white',
        fontFamily: 'Roboto',
    },
    qrMenuContainer: {
        flex: 1,
        height: windowHeight,
        width: windowWidth,
        alignItems: 'center',
    },
    qrContainer: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#202020',
    },
    menuButtonContainer: {
        backgroundColor: '#01a3ea',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: 5,
        margin: 10,
        width: '100%',
        padding: 10,
        paddingTop: 15,
        paddingBottom: 15,
    },
    menuButtonText: {
        fontWeight: '700',
        fontFamily: 'Roboto',
        color: '#ffff',
        letterSpacing: 1,
        fontSize: 22,
    },
});