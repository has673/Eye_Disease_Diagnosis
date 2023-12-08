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
  

} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './Screen/User/Login';
import Signup from './Screen/User/Signup';
import Forgot from './Screen/User/Forgotpass';

import Home from './Screen/User/Home';
import auth from '@react-native-firebase/auth';
import First from './Screen/First';
import EditProfile from './Screen/User/EditProfile';
import Message from './Screen/User/Message';
import Profile from './Screen/User/Profile';
import { Screen } from 'react-native-screens';
import Detect from './Screen/User/Detect';





const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
function Dashboard(){
  return(
    <Tab.Navigator  screenOptions={{
      tabBarInactiveTintColor: 'black',
      tabBarActiveTintColor: 'white',
      tabBarStyle: {
        backgroundColor: '#629FFA',
        height: 58,
      },
    }}>
       <Tab.Screen
        name="Home"
        component={Home}
        options={{
          // title: 'Chat',
          headerStyle: {
            backgroundColor: '#629FFA',
          },

          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontFamily: 'inter',
            fontSize: 28,
          },
          tabBarIcon: ({focused}) => (
            <View>
              <Ionicons
                name='home-outline'
                size={28}
             
              />
            </View>
          ),
        }}
      />
      
        <Tab.Screen
        name="messeging"
        component={Message}
        options={{
          title: 'Chat',
          headerStyle: {
            backgroundColor: '#629FFA',
          },

          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontFamily: 'inter',
            fontSize: 24,
          },
          tabBarIcon: ({focused}) => (
            <View>
              <Ionicons
                name='chatbox-outline'
                size={25}
             
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Your Profile',
          headerStyle: {
            backgroundColor: '#629FFA',
          },

          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontFamily: 'inter',
            fontSize: 24,
          
          },
          tabBarIcon: ({focused}) => (
            <View>
              <Ionicons
                name='person-circle'
                size={28}
             
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  )
}


function App(){
 
 
  
  return (
  <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen name='Splash' component={First} options={({navigation})=>({
        headerShown:false
      })}/>
      
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
       <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{headerShown: false}}
            
        />
      <Stack.Screen name='EditProfile' component={EditProfile} options={({ navigation }) => ({
            title: 'Edit Profile',
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
          })}/>
          {/* <Stack.Screen name='Detect' component={Detect}  options={({ navigation }) => ({
            title: 'Detect',
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
          })}/> */}
    </Stack.Navigator>
  </NavigationContainer>
  );
}



export default App;
