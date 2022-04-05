import {Dimensions, StyleSheet} from 'react-native';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  pinText: {
    fontSize: 30,
    fontWeight: '600',
  },
  signInButtonContainer: {
    flex: 1,
    marginTop: '20%',
    alignItems: 'center',
  },
  authTitleContainer: {
    flex: 1,
    height: windowHeight,
    width: windowWidth,
    alignItems: 'center',
  },
  authTitleText: {
    fontSize: 35,
    letterSpacing: 1,
    color: 'white',
    fontFamily: 'Roboto',
  },
  pinContainerStyle: {
    fontSize: 30,
    fontWeight: '600',
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
    backgroundColor: '#202020',
    top: '5%',
  },
  button: {
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
  buttonText: {
    fontWeight: '700',
    fontFamily: 'Roboto',
    color: '#ffff',
    letterSpacing: 1,
    fontSize: 22,
  },
  errorMessage: {
    fontFamily: 'Roboto',
    letterSpacing: 1,
    fontWeight: '900',
    marginTop: '10%',
    marginBottom: '10%',
    fontSize: 30,
    color: '#ffff',
  },
  signInButton: {
    letterSpacing: 1,
    color: '#ffff',
    fontSize: 25,
    fontWeight: '900',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
