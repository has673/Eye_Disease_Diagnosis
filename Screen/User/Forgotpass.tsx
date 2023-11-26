import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';

// const Stack = createStackNavigator();
//change clolor

function Forgot() {
  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.stretch} source={require('../../assets/logo.png')} />
      </View>
      <View>
        <Text style={styles.heading}>Forgot Password</Text>
      </View>
      <View>
        <Text style={styles.heading2}>Provide Email to Recover Account</Text>
      </View>
      <View style={styles.box1}>
       
      </View>
      <TouchableOpacity style={styles.send}>
        <Text style={{fontWeight: 'bold'}}>Send</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Forgot;
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="forgot"
//           component={Forgot}
//           options={{
//             title: 'Forget Password',
//             headerStyle: {
//               backgroundColor: '#629FFA',
//             },
//             headerTintColor: '#fff',
//             headerLeft: () => (
//               <TouchableOpacity
//                 onPress={() => {
//                   navigation.goBack();
//                 }}>
//                 <Image
//                   source={require('../assets/back.png')}
//                   style={{width: 32, height: 32, marginTop: 5}}
//                 />
//               </TouchableOpacity>
//             ),
//             headerTitleStyle: {
//               fontWeight: 'bold',
//             },
//           }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

const styles = StyleSheet.create({
  container: {
   
    flex: 1,
  },
  heading: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 19,
    marginBottom: 19,
  },
  heading2: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 19,
    marginBottom: 19,
  },
  input1: {
    borderWidth: 1,
    height: 40,
    width: 300,
    borderRadius: 14,
    marginTop: 15,
    padding: 10,
    // placeholderTextColor: 'black',
    textAlign: 'center',
    backgroundColor: '#629FFAB8',
  },
  box1: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  stretch: {
    width: 375,
    height: 256,
    alignSelf: 'center',
    marginBottom:30,
    marginTop:50
  },
  send: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    backgroundColor: '#629FFA',
    width: 250,
    height: 40,
    borderRadius: 14,
    alignSelf: 'center',
  },
});
