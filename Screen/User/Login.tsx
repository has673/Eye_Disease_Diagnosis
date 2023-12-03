import React, { useState  } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';

import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function Login({ navigation }) {
  const handleNavigation = screenname => {
    console.log(screenname);
    navigation.navigate(screenname);
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const Handlelogin = async () => {
    try {
      console.log("login function")
      if (email.length > 0 && password.length > 0) {
       
      const isUserLogin = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      setError('');
      console.log(isUserLogin);
      setEmail('')
      setPassword('')
     if(isUserLogin.user.emailVerified){
      
      navigation.navigate('Home', {
        email: isUserLogin.user.email,
        uid: isUserLogin.user.uid,
        
      });

     }
     else{
      Alert.alert("Check your Inbox for email Verification")
      await auth().currentUser.sendEmailVerification()
     }
      
     
    } 
      else {
      Alert.alert("press enter data")
       }
    } 

   
    
  catch (err) {
    console.error(err)
    setEmail('')
    setPassword('')
    setError('')
    if (err.code === 'auth/wrong-password') {
      console.log('The password is wrong!');
      setError('The password is wrong!');
    }
    if (err.code === 'auth/invalid-credential') {
      console.log('That email address  or password is invalid!');
      setError('The email or password is invalid is invalid!');
    }
    // setError(err.message)

  }
};
//


return (
  <View style={styles.container}>
    <View>
      <Image style={styles.stretch} source={require('../../assets/logo.png')} />
    </View>
    <View>
      <Text style={styles.heading}>Login To Your Account </Text>
    </View>
    <View style={styles.box1}>
      <TextInput style={styles.input1} placeholder="Email" value={email} onChangeText={text =>  setEmail(text) }></TextInput>
    </View>
    <View style={styles.box1}>
      <TextInput
        style={styles.input2}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={text => { setPassword(text) }}
      ></TextInput>
    </View>
    <Text  style={styles.errormsg} > {error}</Text>


    <View style={styles.signin}>
      <TouchableOpacity
        onPress={() => Handlelogin()}
        style={styles.btn}>
        <Text>Sign in</Text>
      </TouchableOpacity>
    </View>
    <TouchableOpacity
      onPress={() => handleNavigation('Forgot')}
    >
      <Text style={styles.pass}>Forgot Password?</Text>
    </TouchableOpacity>
    <View style={styles.bottom}>
      <Text style={styles.dont}>Don't have an account?</Text>
      <TouchableOpacity
        onPress={() => handleNavigation("Signup")}
      >
        <Text style={styles.endtext}>Sign up</Text>
      </TouchableOpacity>
    </View>
  </View>
);
}

const styles = StyleSheet.create({
  stretch: {
    width: 335,
    height: 186,
    marginTop: -65,
    marginBottom: -60,
    alignSelf: 'center',
  },
  heading: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 19,
    marginBottom: 19,
    fontFamily: 'poppins',
    color: 'black',
  },
  input1: {
    borderWidth: 1,
    borderBottomWidth: 0,
    height: 54,
    width: 304,
    borderRadius: 14,
    marginTop: 15,
    backgroundColor: '#629FFA',
    textAlign: 'center',
  
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
  checkboxcontainer: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  checkbox: {
    marginRight: 5,
    height: 17,
    marginBottom: 0.7,
  },
  checkboxInner: {
    borderWidth: 1,
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxIcon: {
    backgroundColor: '#629FFA',
    width: 9,
    height: 9,
    borderRadius: 2,
  },
  text: {
    fontSize: 15,
    color: 'black',
  },
  btn: {
    backgroundColor: '#629FFA',
    width: 236,
    height: 53,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
    fontSize: 16,
  },
  signin: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pass: {
    textAlign: 'center',
    color: '#629FFA',
    marginBottom: 10,

  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  endtext: {
    color: '#629FFA',
    marginLeft: 8,
  },
  container: {
    marginTop: 120,
  },
  dont: {
    color: 'black',
  },
  errormsg: {
    textAlign: 'center',
    color: 'red'
  }
});
