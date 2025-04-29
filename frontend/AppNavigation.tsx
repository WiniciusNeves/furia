import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import App from './App';
import Onboarding from './src/screens/onboarding';
import Onboarding2 from './src/screens/onboarding2';
import Onboarding3 from './src/screens/onboarding3';
import Auth from './src/screens/auth';
import CreateUser from './src/screens/createUser';
const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="App" >
        <Stack.Screen name="App" component={App} options={{ headerShown: false }} />
        <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
        <Stack.Screen name="onboarding2" component={Onboarding2} options={{ headerShown: false }} />
        <Stack.Screen name="onboarding3" component={Onboarding3} options={{ headerShown: false }} />
        <Stack.Screen name="auth" component={Auth} options={{ headerShown: false }} />

        <Stack.Screen name="CreateUser" component={CreateUser} options={{ headerShown: false}} />




      </Stack.Navigator>
    </NavigationContainer>
  );
}