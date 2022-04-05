import { Dimensions, StyleSheet } from 'react-native';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default authStyles = StyleSheet.create({
    errorPageContainer: {
        backgroundColor: '#202020',
        flex: 1,
        height: windowHeight,
        width: windowWidth,
        alignItems: 'center',
    },
    errorTextContainer: {
        top: "10%"
    },
    errorText: {
        color: '#FF1818',
        fontSize: 30,
        fontFamily: 'Roboto',
        fontWeight: '900'
    },
    resetButton: {
        fontSize: 25,
        color: "white"
    }

});