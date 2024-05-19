import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert, // Import Alert for showing an error alert
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';

export default function Signup({ navigation }) {
  const handleNavigation = (screenname) => {
    console.log(screenname);
    navigation.navigate(screenname);
  };


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState('');

  const isValidEmail = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const Handlesignup = async () => {
    try {
      console.log("signup function");
      if (email.length > 0 && password.length > 0) {
        // Check if the email is valid
        if (!isValidEmail(email)) {
         
          Alert.alert('Error', 'Please enter a valid email address');
         
          return;
        }
  
        const isusercreated = await auth().createUserWithEmailAndPassword(email, password);
  
        if (isusercreated.user) {
          console.log('User created successfully!', isusercreated.user.uid);
         
          await auth().currentUser.sendEmailVerification()
  
          const Userdata = {
            id : isusercreated.user.uid,
            email:email,
            profileImage:"https://firebasestorage.googleapis.com/v0/b/braindiseasedetector.appspot.com/o/ProfilePicUsers%2Fnawababbas756%40gmail.com%2F1000000635.jpg?alt=media&token=f4489e29-cfc6-4e86-90ed-07058c5ceeb5",

  
          }
          await firestore().collection('User').doc(isusercreated.user.uid).set(Userdata)
          
          
          Alert.alert("Please verify your email")
          // await auth().currentUser.reload();
          navigation.navigate('Login')
          // gotologin();
        
       
        } else {
          console.log('User creation failed.');
        }
      } else {
        // Show an alert if the user didn't fill in all fields
        Alert.alert('Error', 'Please fill in all fields');
      }
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
        setError('That email address is already in use!');
      } else if (err.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
        setError('That email address is invalid!');
      } 
      else if (err.code === 'auth/weak-password') {
        console.log('Password should be atleast 6 characters!');
        setError('Password should be atleast 6 characters!');
      }
      else {
        console.error(err);
        setError('Signup failed. Please try again later.');
      }
    }
  };
  

  return (
    <View style={styles.containerSignup}>
      <View>
        <Image style={styles.stretch} source={require('../../assets/logo.png')} />
      </View>
      <View style={styles.inputContainer}>
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
          onPress={() => {
            Handlesignup();
          // Navigate to login screen after signup
          }}
        >
          <Text style={{ color: 'azure' }}>Signup</Text>
        </TouchableOpacity>
      </View>
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
  input2: {
    borderWidth: 1,
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
    width: 236,
    height: 53,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',

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
    flex:1,
  },
  inputContainer: {
    marginTop: 10,
  },
  errormsg: {
    textAlign: 'center',
    color: 'red',
    margin:10
  }
});
