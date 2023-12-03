/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React , {useState} from 'react';
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

import Home from './Screen/User/Home';
import auth from '@react-native-firebase/auth';
import First from './Screen/First';





const Stack = createNativeStackNavigator();


function App(){
  const[isloggedin, setIsloggedin] =useState(false)
  auth().onAuthStateChanged((user)=>{
    console.log(user)
  })
  
  return (
  <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen name='Splash' component={First} options={({navigation})=>({
        headerShown:false
      })}/>
      
        <Stack.Screen name='Login' component={Login} options={({navigation})=>({
     
      headerShown:false
      })}/>
     
      <Stack.Screen name='Home' component={Home}  options={({navigation})=>({
          title: 'Dashboard',
          headerStyle: {
            backgroundColor: '#629FFA',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
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
