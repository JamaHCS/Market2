import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ScreenStack } from 'react-native-screens';
import Login from './src/modules/auth/login';
import Registro from './src/modules/auth/registro';
import Home from './src/modules/home/home';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import {getHeaderTitle} from './src/shared/utils/getHeaderTitle';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ route }) => ({
            headerTitle: getHeaderTitle(route),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
