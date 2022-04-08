import React, {FC} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Dimensions,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {QueryClient, QueryClientProvider} from 'react-query';

import AuthScreen from '../screens/auth/AuthenticationRoute';
import ErrorBoundary from '../components/errorHandler/ErrorBoundary';

import QRCodeMenu from '../components/qrCode/QRCodeMenu';
import QRCodeScan from '../components/qrCode/QRCodeScan';
import UserQrCodes from '../components/qrCode/UserQrCodes';

import PinCodeBackupAuth from '../components/pinCodeBackupAuth/PinCodeBackup';
import BiometricAuth from '../components/biometricAuth/BiometricAuth';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

const App: FC = () => {
  const windowHeight = Dimensions.get('window').height;

  return (
    <NavigationContainer>
      <SafeAreaView>
        <QueryClientProvider client={queryClient}>
          <StatusBar />
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <ErrorBoundary>
              <View style={{height: windowHeight}}>
                <Stack.Navigator>
                  <Stack.Screen
                    name="Auth"
                    component={AuthScreen}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name="QRCodeMenu"
                    component={QRCodeMenu}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name="QRCodeScan"
                    component={QRCodeScan}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name="UserQrCodes"
                    component={UserQrCodes}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name="PinCodeBackupAuth"
                    component={PinCodeBackupAuth}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name="BiometricAuth"
                    component={BiometricAuth}
                    options={{headerShown: false}}
                  />
                </Stack.Navigator>
              </View>
            </ErrorBoundary>
          </ScrollView>
        </QueryClientProvider>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;
