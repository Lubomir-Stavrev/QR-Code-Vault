module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic(@react-native|react-native|react-native-touch-id|react-native-qrcode-scanner|react-native-snackbar|react-native-qrcode-svg|react-native-qrcode-scanner)/)',
  ],
  setupFiles: ['./jest.setup.js'],
};
