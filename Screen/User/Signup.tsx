
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';

// const Stack = createNativeStackNavigator();
export default function Signup({navigation}) {
  const handleNavigation = screenname => {
    console.log(screenname);
    navigation.navigate(screenname);
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
          <TextInput style={styles.input2} placeholder="Email" 
         />
        </View>
       
        <View style={styles.box1}>
          <TextInput style={styles.input2} placeholder="Password" 
       
          />
        </View>
       
      </View>
      
      <Text  onPress={() => handleNavigation('Login')}>ll</Text>
      <View style={styles.signin}>
        <TouchableOpacity
          
          style={styles.btn}>
          <Text style={{color:"azure"}}>Signup</Text>
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
        marginTop:-65,
        marginBottom:-60,
        
        alignSelf:'center'
       
        
      },
  input2: {
    borderWidth: 1,
    borderBottomWidth:0,
    height: 54,
    width: 304,
    borderRadius: 14,
    marginTop: 15,
    backgroundColor: '#629FFA',
    // placeholderTextColor: 'black',
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
    color:'azure'
  },
  signin: {
    justifyContent: 'center',
    alignItems: 'center',
    color:'azure'
  },
  containerSignup: {
    marginTop: 120,
  },
  inputContainer: {
    marginTop: 10,
  },
});