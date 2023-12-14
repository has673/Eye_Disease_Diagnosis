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
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const navigation = useNavigation()
 

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
      
      navigation.navigate('Dashboard');

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
      onPress={() => navigation.navigate('Forgot')}
    >
      <Text style={styles.pass}>Forgot Password?</Text>
    </TouchableOpacity>
    <View style={styles.bottom}>
      <Text style={styles.dont}>Don't have an account?</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Signup")}
      >
        <Text style={styles.endtext}>Sign up</Text>
      </TouchableOpacity>
    </View>
    <TouchableOpacity
      onPress={() => navigation.navigate('Registor')}
    >
      <Text style={styles.doc} >Registor as Doctor</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('DoctorLogin')}>
        <Text style={styles.doc}>Doctor Login</Text>
      </TouchableOpacity>
      
  </View>
);
}

const styles = StyleSheet.create({
  stretch: {
    width: 335,
    height: 186,
    marginTop: -100,
   
    alignSelf: 'center',
  },
  heading: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: -10,
    
    fontFamily: 'poppins',
    color: 'black',
  },
  input1: {
    borderWidth: 1,
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
  },
  doc: {
    textAlign: 'center',
    color: '#629FFA',
    marginTop: 10,
    fontWeight:'bold'

  },
});
