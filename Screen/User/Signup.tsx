import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

export default function Signup({ navigation }) {
  const handleNavigation = (screenname) => {
    console.log(screenname);
    navigation.navigate(screenname);
  };
  const gotologin=()=>{
    handleNavigation('Login')
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const Handlesignup = async () => {
    try {
      console.log("signup function")
      
      const isusercraeted = await auth().createUserWithEmailAndPassword(email, password);
      
      if (isusercraeted.user) {
        console.log('User created successfully!', isusercraeted.user.uid);
        

        // Additional actions after successful signup (e.g., navigation, state updates)
      } else {
        console.log('User creation failed.');
      }

      // Additional actions after successful signup (e.g., navigation, state updates)
    } catch (err) {
      // console.error(err)
      if (err.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
        setError('That email address is already in use!');
      }
      if (err.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
        setError('That email address is invalid!');
      }
      
    }
  };

  return (
    <View style={styles.containerSignup}>
      <View>
        <Image style={styles.stretch} source={require('../../assets/logo.png')} />
      </View>

      <View style={styles.inputContainer}>
        <View>
          <Text style={styles.heading}> Signup </Text>
        </View>
        <View style={styles.box1}>
          <TextInput
            style={styles.input2}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={styles.box1}>
          <TextInput
            style={styles.input2}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
        </View>
      </View>
      <Text style={styles.errormsg}>{error}</Text>

      <View style={styles.signin}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            {
            Handlesignup() ;
            handleNavigation("Login")
            }
          }>
          <Text style={{ color: 'azure' }}>Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 19,
    fontFamily: 'poppins',
    color: 'black',
  },
  stretch: {
    width: 335,
    height: 186,
    marginTop: -65,
    marginBottom: -60,
    alignSelf: 'center',
  },
  input2: {
    borderWidth: 1,
    borderBottomWidth: 0,
    height: 54,
    width: 304,
    borderRadius: 14,
    marginTop: 15,
    backgroundColor: '#629FFA',
    textAlign: 'center',
  },
  box1: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pass: {
    textAlign: 'center',
    color: '#629FFA',
    marginTop: 16,
  },
  btn: {
    backgroundColor: '#629FFA',
    width: 304,
    height: 54,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
    color: 'azure',
  },
  signin: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'azure',
  },
  containerSignup: {
    marginTop: 120,
  },
  inputContainer: {
    marginTop: 10,
  },
  errormsg:{
    textAlign:'center',
    color:'red'
  }
});
