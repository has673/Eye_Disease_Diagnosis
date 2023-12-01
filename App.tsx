/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button

} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './Screen/User/Login';
import Signup from './Screen/User/Signup';
import Forgot from './Screen/User/Forgotpass';
import Db from './Screen/User/Db';





const Stack = createNativeStackNavigator();


function App(){
  
  return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name='Db' component={Db} options={({navigation})=>({
        headerShown:false
      })} />  
      <Stack.Screen name='Login' component={Login} options={({navigation})=>({
        headerShown:false
      })}/>
      <Stack.Screen name='Signup' component={Signup} options={({ navigation }) => ({
            title: 'Signup',
            headerStyle: {
              backgroundColor: '#629FFA',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
            headerLeft: () => (
              
              <Ionicons
              onPress={() => navigation.goBack()}
              name="arrow-back"
              size={25}
              color="white"
              
            />
            ),
          })}
      />
      <Stack.Screen name='Forgot' component={Forgot} options={({ navigation }) => ({
            title: 'Forgot Password',
            headerStyle: {
              backgroundColor: '#629FFA',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
            headerLeft: () => (
              <Ionicons
                onPress={() => navigation.goBack()}
                name="arrow-back"
                size={25}
                color="white"
                
              />
            ),
          })}
      />
    </Stack.Navigator>
  </NavigationContainer>
  );
}



export default App;
