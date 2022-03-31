import React, { FC } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Dimensions
} from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthScreen from './auth/AuthenticationRoute'
import QRCodeScreen from './qrCode/QRCodeRoute'

const Stack = createNativeStackNavigator();

const App: FC = () => {

  const windowHeight = Dimensions.get('window').height;

  return (

    <NavigationContainer>
      <SafeAreaView>
        <StatusBar />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic">
          <View
            style={{
              height: windowHeight,
              flex: 1
            }}>
            <Stack.Navigator>
              <Stack.Screen
                name="Auth"
                component={AuthScreen}
                options={{ title: null, headerShown: false }}
              />
              <Stack.Screen
                name="QRCodeRoute"
                component={QRCodeScreen}
                options={{ title: null, headerShown: false }}
              />
            </Stack.Navigator>
          </View>
        </ScrollView>
      </SafeAreaView>
    </NavigationContainer>

  );
};


export default App;
