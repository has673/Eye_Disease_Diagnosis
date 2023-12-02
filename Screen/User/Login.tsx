import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
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
        const isuserloggedin = await auth().signInWithEmailAndPassword(email, password);

        if (isuserloggedin.user) {
          console.log('User loggedin  successfully!', isuserloggedin.user.uid);
          navigation.navigate("Home", {
            userid: isuserloggedin.user.uid,
            email: isuserloggedin.user.email
          })
          // Additional actions after successful signup (e.g., navigation, state updates)
        }
      
      else {
        console.log('User login failed.');
      }
      // Additional actions after successful signup (e.g., navigation, state updates)
      }
      else {
      alert("press enter data")
       }
    } 
   
    
  catch (err) {
    console.error(err)
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


return (
  <View style={styles.container}>
    <View>
      <Image style={styles.stretch} source={require('../../assets/logo.png')} />
    </View>
    <View>
      <Text style={styles.heading}>Login To Your Account </Text>
    </View>
    <View style={styles.box1}>
      <TextInput style={styles.input1} placeholder="Email" onChangeText={(text) => { setEmail(text) }}></TextInput>
    </View>
    <View style={styles.box1}>
      <TextInput
        style={styles.input2}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => { setPassword(text) }}
      ></TextInput>
    </View>
    <Text style={styles.errormsg}>{error}</Text>


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
    height: 50,
    width: 304,
    borderRadius: 14,
    marginTop: 15,
    marginBottom: 10,
    backgroundColor: '#629FFA',
    padding: 10,
    color: 'black',
    textAlign: 'center',
  },
  input2: {
    borderWidth: 1,
    height: 50,
    width: 304,
    borderRadius: 14,
    marginTop: 15,
    backgroundColor: '#629FFA',
    color: 'black',
    textAlign: 'center',
    marginBottom: 10,
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
