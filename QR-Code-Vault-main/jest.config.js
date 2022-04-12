module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|react-native-touch-id|react-native-qrcode-scanner|react-native-snackbar|react-native-qrcode-svg)/)',
  ],
};
