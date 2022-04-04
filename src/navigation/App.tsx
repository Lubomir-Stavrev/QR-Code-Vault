import React, { FC } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Dimensions,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthScreen from '../screens/auth/AuthenticationRoute';
import QRCodeScreen from '../components/qrCode/QRCodeMenu';

const Stack = createNativeStackNavigator();

const App: FC = () => {
  const windowHeight = Dimensions.get('window').height;

  return (
    <NavigationContainer>
      <SafeAreaView>
        <StatusBar />
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View
            style={{ height: windowHeight, flex: 1, }}>
            <Stack.Navigator>
              <Stack.Screen
                name="Auth"
                component={AuthScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="QRCodeRoute"
                component={QRCodeScreen}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </View>
        </ScrollView>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;
