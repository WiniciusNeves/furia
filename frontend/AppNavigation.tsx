import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import App from './App';
import Onboarding from './src/screens/onboarding';
import Onboarding2 from './src/screens/onboarding2';
import Onboarding3 from './src/screens/onboarding3';
import Auth from './src/screens/auth';
import CreateUser from './src/screens/createUser';
import Home from './src/screens/home';
import ChatBot from './src/screens/chatbox';
import Menu from './src/screens/menu';
import AlterarDados from './src/screens/alterarDados';
import Politica from './src/screens/politica';
import Profile from './src/screens/profile';


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
        <Stack.Screen name="CreateUser" component={CreateUser} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="ChatBot" component={ChatBot} options={{ headerShown: false }} />
        <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
        <Stack.Screen name="AlterarDados" component={AlterarDados} options={{ headerShown: false }} />
        <Stack.Screen name="Politica" component={Politica} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}