/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  View
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Login from './Screen/User/Login';
import Signup from './Screen/User/Signup';
import Forgot from './Screen/User/Forgotpass';


import Home from './Screen/User/Home';

import First from './Screen/First';
import EditProfile from './Screen/User/EditProfile';
import Message from './Screen/User/Message';
import Profile from './Screen/User/Profile';
import { Screen } from 'react-native-screens';
import Detect from './Screen/User/Detect';
import Registor from './Screen/Doctor/Registor';
import DoctorLogin from './Screen/Doctor/DoctorLogin';
import DocProfile from './Screen/Doctor/DocProfile';
import DocEdit from './Screen/Doctor/DocEdit';
import Check from './Screen/User/Check';
import AllDoctor from './Screen/User/Appointment/AllDoctor';
import Appointments from './Screen/Doctor/Appointments';
import SingleDoctor from './Screen/User/Appointment/SingleDoctor';
import EditEdu from './Screen/Doctor/EditEdu';
import DoctorAppointment from './Screen/User/Appointment/DoctorAppointment';
import PatientAppointments from './Screen/User/Appointment/PatientAppointments';
import PatientRequest from './Screen/User/Appointment/PatientRequest';
import DocHome from './Screen/Doctor/DocHome';
import CompleteAppointments from './Screen/User/Appointment/CompleteAppointments';
import DoctorCompleteAppointment from './Screen/Doctor/DoctorCompleteAppointment';
import Report from './Screen/User/Report';
import UserMessages from './Screen/User/UserMessages';
import Doc_Message from './Screen/User/Doc_Message'
import AllDiagnosis from './Screen/User/AllDiagnosis';




const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
// const navigation = useNavigation()
function DoctorDashboard() {
  return (
    <Tab.Navigator screenOptions={{
      tabBarInactiveTintColor: 'black',
      tabBarActiveTintColor: 'white',
      tabBarStyle: {
        backgroundColor: '#629FFA',
        height: 58,
      },
    }}>
    
      <Tab.Screen
        name="Home"
        component={DocHome}
        options={({ navigation }) => ({
          headerStyle: {
            backgroundColor: '#629FFA',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontFamily: 'inter',
            fontSize: 28,
          },
          headerRight: () => (
            <View style={{ marginRight: 10 }}>
              <Ionicons
                name='person-circle-outline'
                size={30}
                color='white'
                onPress={() => {
                  navigation.navigate('DocProfile');
                }}
              />
            </View>
          ),
          tabBarIcon: ({ focused }) => (
            <View>
              <Ionicons
                name='home-outline'
                size={28}
              />
            </View>
          ),
        })}
      />

      <Tab.Screen
        name="messeging"
        component={Doc_Message}
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
          tabBarIcon: ({ focused }) => (
            <View>
              <Ionicons
                name='chatbox-outline'
                size={25}

              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  )
}
function Dashboard() {
  return (
    <Tab.Navigator screenOptions={{
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
        options={({ navigation }) => ({
          headerStyle: {
            backgroundColor: '#629FFA',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontFamily: 'inter',
            fontSize: 28,
          },
          headerRight: () => (
            <View style={{ marginRight: 10 }}>
              <Ionicons
                name='person-circle-outline'
                size={30}
                color='white'
                onPress={() => {
                  navigation.navigate('Profile');
                }}
              />
            </View>
          ),
          tabBarIcon: ({ focused }) => (
            <View>
              <Ionicons
                name='home-outline'
                size={28}
              />
            </View>
          ),
        })}
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
          tabBarIcon: ({ focused }) => (
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
        name="Doctors"
        component={AllDoctor}
        options={{
          title: 'Doctors',
          headerStyle: {
            backgroundColor: '#629FFA',
          },

          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontFamily: 'inter',
            fontSize: 24,

          },
          tabBarIcon: ({ focused }) => (
            <View>
              <Fontisto
                name='doctor'
                size={28}

              />
            </View>
          ),
        }}
      />


    </Tab.Navigator>
  )
}


function App() {



  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Splash' component={First} options={({ navigation }) => ({
          headerShown: false
        })} />

        <Stack.Screen name='Login' component={Login} options={({ navigation }) => ({

          headerShown: false
        })} />


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
          <Stack.Screen name='Diagnosis' component={AllDiagnosis} options={({ navigation }) => ({
          title: 'Diagnosis',
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
          options={{ headerShown: false }}

        />
        <Stack.Screen name='Detect' component={Detect} options={({ navigation }) => ({
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
        })} />
        <Stack.Screen name='Profile' component={Profile} options={({ navigation }) => ({
          title: 'Your Profile',
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
        })} />

        <Stack.Screen name='Registor' component={Registor} options={({ navigation }) => ({
          title: 'Registor as Doctor',
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
        })} />
        <Stack.Screen
          name="DoctorLogin"
          component={DoctorLogin}
          options={{ headerShown: false }}

        />
        <Stack.Screen
          name="DoctorDashboard"
          component={DoctorDashboard}
          options={{ headerShown: false }}

        />
        <Stack.Screen name='DocEdit' component={DocEdit} options={({ navigation }) => ({
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
        })} />
        <Stack.Screen name='Check' component={Check} options={({ navigation }) => ({
          title: 'Diagnose',
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
        })} />
        <Stack.Screen name='Appointments' component={Appointments} options={({ navigation }) => ({
          title: 'Your Appointments',
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
        })} />
        <Stack.Screen name='Doctor' component={SingleDoctor} options={({ navigation }) => ({
          title: 'Doctor Profile',
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
        })} />
        <Stack.Screen name='Education' component={EditEdu} options={({ navigation }) => ({
          title: 'Education Details',
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
        })} />

        <Stack.Screen name='DoctorAppointment' component={DoctorAppointment} options={({ navigation }) => ({
          title: 'Your Appoinemnts',
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
        })} />
        <Stack.Screen name='UserAppointment' component={PatientAppointments} options={({ navigation }) => ({
          title: 'Scheduled  Appointments',
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
        })} />
           <Stack.Screen name='DocProfile' component={DocProfile} options={({ navigation }) => ({
          title: 'Doctor',
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
        })} />
        <Stack.Screen name='Appointment Requests' component={PatientRequest} options={({ navigation }) => ({
          title: 'Appointment Requests',
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
        })} />
         <Stack.Screen name='Complete Appointments' component={CompleteAppointments} options={({ navigation }) => ({
          title: 'Appointment ',
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
        })} />
        <Stack.Screen name='Doctor Appointment Requests' component={DoctorAppointment} options={({ navigation }) => ({
          title: 'Appointment Requests',
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
        })} />
         <Stack.Screen name='Doctor Completed Appointments' component={DoctorCompleteAppointment} options={({ navigation }) => ({
          title: 'Completed Appointments',
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
        })} />
           <Stack.Screen name='Report' component={Report} options={({ navigation }) => ({
          title: 'Report',
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
        })} />
   
          {/* <Stack.Screen name='Message' component={UserMessages} options={({ navigation }) => ({
          title: 'Chats',
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
        })} /> */}

        <Stack.Screen
          name="UserMessages"
          component={UserMessages}
          options={({ navigation }) => ({
            title: 'Messages',
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





/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import React from 'react';
// import { View } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Fontisto from 'react-native-vector-icons/Fontisto';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { NavigationContainer } from '@react-navigation/native';

// import Login from './Screen/User/Login';
// import Signup from './Screen/User/Signup';
// import Forgot from './Screen/User/Forgotpass';
// import Home from './Screen/User/Home';
// import First from './Screen/First';
// import EditProfile from './Screen/User/EditProfile';
// import Message from './Screen/User/Message';
// import Profile from './Screen/User/Profile';
// import Detect from './Screen/User/Detect';
// import Registor from './Screen/Doctor/Registor';
// import DoctorLogin from './Screen/Doctor/DoctorLogin';
// import DocProfile from './Screen/Doctor/DocProfile';
// import DocEdit from './Screen/Doctor/DocEdit';
// import Check from './Screen/User/Check';
// import AllDoctor from './Screen/User/Appointment/AllDoctor';
// import Appointments from './Screen/Doctor/Appointments';
// import SingleDoctor from './Screen/User/Appointment/SingleDoctor';
// import EditEdu from './Screen/Doctor/EditEdu';
// import DoctorAppointment from './Screen/User/Appointment/DoctorAppointment';
// import PatientAppointments from './Screen/User/Appointment/PatientAppointments';
// import PatientRequest from './Screen/User/Appointment/PatientRequest';
// import DocHome from './Screen/Doctor/DocHome';
// import CompleteAppointments from './Screen/User/Appointment/CompleteAppointments';
// import DoctorCompleteAppointment from './Screen/Doctor/DoctorCompleteAppointment';
// import Report from './Screen/User/Report';
// import UserMessages from './Screen/User/UserMessages';

// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

// function DoctorDashboard() {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarInactiveTintColor: 'black',
//         tabBarActiveTintColor: 'white',
//         tabBarStyle: {
//           backgroundColor: '#629FFA',
//           height: 58,
//         },
//       }}
//     >
//       <Tab.Screen
//         name="Home"
//         component={DocHome}
//         options={({ navigation }) => ({
//           headerStyle: {
//             backgroundColor: '#629FFA',
//           },
//           headerTintColor: 'white',
//           headerTitleStyle: {
//             fontWeight: 'bold',
//             fontFamily: 'inter',
//             fontSize: 28,
//           },
//           headerRight: () => (
//             <View style={{ marginRight: 10 }}>
//               <Ionicons
//                 name="person-circle-outline"
//                 size={30}
//                 color="white"
//                 onPress={() => {
//                   navigation.navigate('DocProfile');
//                 }}
//               />
//             </View>
//           ),
//           tabBarIcon: ({ focused }) => (
//             <Ionicons name="home-outline" size={28} />
//           ),
//         })}
//       />
//       <Tab.Screen
//         name="Messaging"
//         component={Message}
//         options={{
//           title: 'Chat',
//           headerStyle: {
//             backgroundColor: '#629FFA',
//           },
//           headerTintColor: 'white',
//           headerTitleStyle: {
//             fontWeight: 'bold',
//             fontFamily: 'inter',
//             fontSize: 24,
//           },
//           tabBarIcon: ({ focused }) => (
//             <Ionicons name="chatbox-outline" size={25} />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

// function Dashboard() {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarInactiveTintColor: 'black',
//         tabBarActiveTintColor: 'white',
//         tabBarStyle: {
//           backgroundColor: '#629FFA',
//           height: 58,
//         },
//       }}
//     >
//       <Tab.Screen
//         name="Home"
//         component={Home}
//         options={({ navigation }) => ({
//           headerStyle: {
//             backgroundColor: '#629FFA',
//           },
//           headerTintColor: 'white',
//           headerTitleStyle: {
//             fontWeight: 'bold',
//             fontFamily: 'inter',
//             fontSize: 28,
//           },
//           headerRight: () => (
//             <View style={{ marginRight: 10 }}>
//               <Ionicons
//                 name="person-circle-outline"
//                 size={30}
//                 color="white"
//                 onPress={() => {
//                   navigation.navigate('Profile');
//                 }}
//               />
//             </View>
//           ),
//           tabBarIcon: ({ focused }) => (
//             <Ionicons name="home-outline" size={28} />
//           ),
//         })}
//       />
//       <Tab.Screen
//         name="Messaging"
//         component={Message}
//         options={{
//           title: 'Chat',
//           headerStyle: {
//             backgroundColor: '#629FFA',
//           },
//           headerTintColor: 'white',
//           headerTitleStyle: {
//             fontWeight: 'bold',
//             fontFamily: 'inter',
//             fontSize: 24,
//           },
//           tabBarIcon: ({ focused }) => (
//             <Ionicons name="chatbox-outline" size={25} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Doctors"
//         component={AllDoctor}
//         options={{
//           title: 'Doctors',
//           headerStyle: {
//             backgroundColor: '#629FFA',
//           },
//           headerTintColor: 'white',
//           headerTitleStyle: {
//             fontWeight: 'bold',
//             fontFamily: 'inter',
//             fontSize: 24,
//           },
//           tabBarIcon: ({ focused }) => (
//             <Fontisto name="doctor" size={28} />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Splash"
//           component={First}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="Login"
//           component={Login}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="Signup"
//           component={Signup}
//           options={({ navigation }) => ({
//             title: 'Signup',
//             headerStyle: {
//               backgroundColor: '#629FFA',
//             },
//             headerTintColor: '#fff',
//             headerTitleStyle: {
//               fontWeight: 'bold',
//             },
//             headerTitleAlign: 'center',
//             headerLeft: () => (
//               <Ionicons
//                 onPress={() => navigation.goBack()}
//                 name="arrow-back"
//                 size={25}
//                 color="white"
//               />
//             ),
//           })}
//         />
//         <Stack.Screen
//           name="Forgot"
//           component={Forgot}
//           options={({ navigation }) => ({
//             title: 'Forgot Password',
//             headerStyle: {
//               backgroundColor: '#629FFA',
//             },
//             headerTintColor: '#fff',
//             headerTitleStyle: {
//               fontWeight: 'bold',
//             },
//             headerTitleAlign: 'center',
//             headerLeft: () => (
//               <Ionicons
//                 onPress={() => navigation.goBack()}
//                 name="arrow-back"
//                 size={25}
//                 color="white"
//               />
//             ),
//           })}
//         />
//         <Stack.Screen
//           name="Dashboard"
//           component={Dashboard}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="Detect"
//           component={Detect}
//           options={({ navigation }) => ({
//             title: 'Detect',
//             headerStyle: {
//               backgroundColor: '#629FFA',
//             },
//             headerTintColor: '#fff',
//             headerTitleStyle: {
//               fontWeight: 'bold',
//             },
//             headerTitleAlign: 'center',
//             headerLeft: () => (
//               <Ionicons
//                 onPress={() => navigation.goBack()}
//                 name="arrow-back"
//                 size={25}
//                 color="white"
//               />
//             ),
//           })}
//         />
//         <Stack.Screen
//           name="Profile"
//           component={Profile}
//           options={({ navigation }) => ({
//             title: 'Your Profile',
//             headerStyle: {
//               backgroundColor: '#629FFA',
//             },
//             headerTintColor: '#fff',
//             headerTitleStyle: {
//               fontWeight: 'bold',
//             },
//             headerTitleAlign: 'center',
//             headerLeft: () => (
//               <Ionicons
//                 onPress={() => navigation.goBack()}
//                 name="arrow-back"
//                 size={25}
//                 color="white"
//               />
//             ),
//           })}
//         />
//         <Stack.Screen
//           name="EditProfile"
//           component={EditProfile}
//           options={({ navigation }) => ({
//             title: 'Edit Profile',
//             headerStyle: {
//               backgroundColor: '#629FFA',
//             },
//             headerTintColor: '#fff',
//             headerTitleStyle: {
//               fontWeight: 'bold',
//             },
//             headerTitleAlign: 'center',
//             headerLeft: () => (
//               <Ionicons
//                 onPress={() => navigation.goBack()}
//                 name="arrow-back"
//                 size={25}
//                 color="white"
//               />
//             ),
//           })}
//         />
//         <Stack.Screen
//           name="Registor"
//           component={Registor}
//           options={({ navigation }) => ({
//             title: 'Register as Doctor',
//             headerStyle: {
//               backgroundColor: '#629FFA',
//             },
//             headerTintColor: '#fff',
//             headerTitleStyle: {
//               fontWeight: 'bold',
//             },
//             headerTitleAlign: 'center',
//             headerLeft: () => (
//               <Ionicons
//                 onPress={() => navigation.goBack()}
//                 name="arrow-back"
//                 size={25}
//                 color="white"
//               />
//             ),
//           })}
//         />
//         <Stack.Screen
//           name="DoctorLogin"
//           component={DoctorLogin}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="DocProfile"
//           component={DocProfile}
//           options={({ navigation }) => ({
//             title: 'Your Profile',
//             headerStyle: {
//               backgroundColor: '#629FFA',
//             },
//             headerTintColor: '#fff',
//             headerTitleStyle: {
//               fontWeight: 'bold',
//             },
//             headerTitleAlign: 'center',
//             headerLeft: () => (
//               <Ionicons
//                 onPress={() => navigation.goBack()}
//                 name="arrow-back"
//                 size={25}
//                 color="white"
//               />
//             ),
//           })}
//         />
//         <Stack.Screen
//           name="DocEdit"
//           component={DocEdit}
//           options={({ navigation }) => ({
//             title: 'Edit Profile',
//             headerStyle: {
//               backgroundColor: '#629FFA',
//             },
//             headerTintColor: '#fff',
//             headerTitleStyle: {
//               fontWeight: 'bold',
//             },
//             headerTitleAlign: 'center',
//             headerLeft: () => (
//               <Ionicons
//                 onPress={() => navigation.goBack()}
//                 name="arrow-back"
//                 size={25}
//                 color="white"
//               />
//             ),
//           })}
//         />
//         <Stack.Screen
//           name="Check"
//           component={Check}
//           options={({ navigation }) => ({
//             title: 'Results',
//             headerStyle: {
//               backgroundColor: '#629FFA',
//             },
//             headerTintColor: '#fff',
//             headerTitleStyle: {
//               fontWeight: 'bold',
//             },
//             headerTitleAlign: 'center',
//             headerLeft: () => (
//               <Ionicons
//                 onPress={() => navigation.goBack()}
//                 name="arrow-back"
//                 size={25}
//                 color="white"
//               />
//             ),
//           })}
//         />
//         <Stack.Screen
//           name="SingleDoctor"
//           component={SingleDoctor}
//           options={({ navigation }) => ({
//             title: 'Doctor',
//             headerStyle: {
//               backgroundColor: '#629FFA',
//             },
//             headerTintColor: '#fff',
//             headerTitleStyle: {
//               fontWeight: 'bold',
//             },
//             headerTitleAlign: 'center',
//             headerLeft: () => (
//               <Ionicons
//                 onPress={() => navigation.goBack()}
//                 name="arrow-back"
//                 size={25}
//                 color="white"
//               />
//             ),
//           })}
//         />
//         <Stack.Screen
//           name="Appointments"
//           component={Appointments}
//           options={({ navigation }) => ({
//             title: 'Appointments',
//             headerStyle: {
//               backgroundColor: '#629FFA',
//             },
//             headerTintColor: '#fff',
//             headerTitleStyle: {
//               fontWeight: 'bold',
//             },
//             headerTitleAlign: 'center',
//             headerLeft: () => (
//               <Ionicons
//                 onPress={() => navigation.goBack()}
//                 name="arrow-back"
//                 size={25}
//                 color="white"
//               />
//             ),
//           })}
//         />
//         <Stack.Screen
//           name="EditEdu"
//           component={EditEdu}
//           options={({ navigation }) => ({
//             title: 'Edit Education',
//             headerStyle: {
//               backgroundColor: '#629FFA',
//             },
//             headerTintColor: '#fff',
//             headerTitleStyle: {
//               fontWeight: 'bold',
//             },
//             headerTitleAlign: 'center',
//             headerLeft: () => (
//               <Ionicons
//                 onPress={() => navigation.goBack()}
//                 name="arrow-back"
//                 size={25}
//                 color="white"
//               />
//             ),
//           })}
//         />
//         <Stack.Screen
//           name="DoctorAppointment"
//           component={DoctorAppointment}
//           options={({ navigation }) => ({
//             title: 'Appointment',
//             headerStyle: {
//               backgroundColor: '#629FFA',
//             },
//             headerTintColor: '#fff',
//             headerTitleStyle: {
//               fontWeight: 'bold',
//             },
//             headerTitleAlign: 'center',
//             headerLeft: () => (
//               <Ionicons
//                 onPress={() => navigation.goBack()}
//                 name="arrow-back"
//                 size={25}
//                 color="white"
//               />
//             ),
//           })}
//         />
//         <Stack.Screen
//           name="PatientAppointments"
//           component={PatientAppointments}
//           options={({ navigation }) => ({
//             title: 'Appointments',
//             headerStyle: {
//               backgroundColor: '#629FFA',
//             },
//             headerTintColor: '#fff',
//             headerTitleStyle: {
//               fontWeight: 'bold',
//             },
//             headerTitleAlign: 'center',
//             headerLeft: () => (
//               <Ionicons
//                 onPress={() => navigation.goBack()}
//                 name="arrow-back"
//                 size={25}
//                 color="white"
//               />
//             ),
//           })}
//         />
//         <Stack.Screen
//           name="PatientRequest"
//           component={PatientRequest}
//           options={({ navigation }) => ({
//             title: 'Pending Appointments',
//             headerStyle: {
//               backgroundColor: '#629FFA',
//             },
//             headerTintColor: '#fff',
//             headerTitleStyle: {
//               fontWeight: 'bold',
//             },
//             headerTitleAlign: 'center',
//             headerLeft: () => (
//               <Ionicons
//                 onPress={() => navigation.goBack()}
//                 name="arrow-back"
//                 size={25}
//                 color="white"
//               />
//             ),
//           })}
//         />
//         <Stack.Screen
//           name="CompleteAppointments"
//           component={CompleteAppointments}
//           options={({ navigation }) => ({
//             title: 'Complete Appointments',
//             headerStyle: {
//               backgroundColor: '#629FFA',
//             },
//             headerTintColor: '#fff',
//             headerTitleStyle: {
//               fontWeight: 'bold',
//             },
//             headerTitleAlign: 'center',
//             headerLeft: () => (
//               <Ionicons
//                 onPress={() => navigation.goBack()}
//                 name="arrow-back"
//                 size={25}
//                 color="white"
//               />
//             ),
//           })}
//         />
//         <Stack.Screen
//           name="DoctorCompleteAppointment"
//           component={DoctorCompleteAppointment}
//           options={({ navigation }) => ({
//             title: 'Complete Appointments',
//             headerStyle: {
//               backgroundColor: '#629FFA',
//             },
//             headerTintColor: '#fff',
//             headerTitleStyle: {
//               fontWeight: 'bold',
//             },
//             headerTitleAlign: 'center',
//             headerLeft: () => (
//               <Ionicons
//                 onPress={() => navigation.goBack()}
//                 name="arrow-back"
//                 size={25}
//                 color="white"
//               />
//             ),
//           })}
//         />
//         <Stack.Screen
//           name="Report"
//           component={Report}
//           options={({ navigation }) => ({
//             title: 'Report',
//             headerStyle: {
//               backgroundColor: '#629FFA',
//             },
//             headerTintColor: '#fff',
//             headerTitleStyle: {
//               fontWeight: 'bold',
//             },
//             headerTitleAlign: 'center',
//             headerLeft: () => (
//               <Ionicons
//                 onPress={() => navigation.goBack()}
//                 name="arrow-back"
//                 size={25}
//                 color="white"
//               />
//             ),
//           })}
//         />
//         <Stack.Screen
//           name="UserMessages"
//           component={UserMessages}
//           options={({ navigation }) => ({
//             title: 'Messages',
//             headerStyle: {
//               backgroundColor: '#629FFA',
//             },
//             headerTintColor: '#fff',
//             headerTitleStyle: {
//               fontWeight: 'bold',
//             },
//             headerTitleAlign: 'center',
//             headerLeft: () => (
//               <Ionicons
//                 onPress={() => navigation.goBack()}
//                 name="arrow-back"
//                 size={25}
//                 color="white"
//               />
//             ),
//           })}
//         />
//         <Stack.Screen
//           name="DoctorDashboard"
//           component={DoctorDashboard}
//           options={{ headerShown: false }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;
