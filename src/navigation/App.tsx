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
import QRCodeScreen from '../components/qrCode/QRCodeMenu';
import ErrorBoundary from '../components/errorHandler/ErrorBoundary';
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
                    name="QRCodeRoute"
                    component={QRCodeScreen}
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
