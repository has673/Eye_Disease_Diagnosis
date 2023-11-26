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
      {/* <View>
        <Text style={styles.heading}>Forgot Password</Text>
      </View> */}
      <View>
        <Text style={styles.heading2}>Provide Email to Recover Account</Text>
      </View>
      <View style={styles.box1}>
      <TextInput style={styles.input1} placeholder="Enter Email" 
        
           maxLength={10}
           

          />
      </View>
      <TouchableOpacity style={styles.send}>
        <Text style={{fontWeight: 'bold', color:'white'}}>Send</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Forgot;


const styles = StyleSheet.create({
  container: {
   
    flex: 1,
  },
  heading: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 19,
    

  },
  heading2: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 12,
    marginBottom: 19,
    fontWeight: 'bold',
    color:'black'
  },
  input1: {
    borderWidth: 1,
    height: 40,
    width: 300,
    borderRadius: 14,
    marginTop: 5,
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
    marginTop:10
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
    color:'azure',
  },
});
