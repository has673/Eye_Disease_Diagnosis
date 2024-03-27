import { StyleSheet, Text, View , TextInput  , TouchableOpacity, Image ,Alert} from 'react-native'
import React , {useState} from 'react'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
const Registor = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pmdc, setPmdc] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation()
  const isValidEmail = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const Handleregistor = async () => {
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
            id: isusercreated.user.uid,
            email: email,
            Name: name,
            Regno: pmdc,
          }
          await firestore().collection('Doctor').doc(isusercreated.user.uid).set(Userdata)
          
          
          Alert.alert("Please verify your email")
          // await auth().currentUser.reload();
          navigation.navigate('DoctorLogin')
          // gotologin();
        
       
        } else {
          console.log('User creation failed.');
        }
      } else {
        // Show an alert if the user didn't fill in all fields
        Alert.alert('Error', 'Please fill in all fields');
      }
    } catch (err) {
      setEmail('')
      setPassword('')
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
    <View style={styles.container}>
       {/* <View>
      <Image style={styles.stretch} source={require('../../assets/logo.png')} />
    </View> */}
     <View style={styles.form}>
      
      
      <View style={styles.box1}>
      <TextInput style={styles.input1} placeholder="PMDC" value={pmdc} onChangeText={text =>  setPmdc(text) }></TextInput>
    </View>
    <View style={styles.box1}>
      <TextInput
        style={styles.input2}
        placeholder="Email"
        
        value={email}
        onChangeText={text => { setEmail(text) }}
      ></TextInput>
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
  
    </View>
    <Text  style={styles.errormsg} > {error}</Text>
    <View style={styles.signin}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            Handleregistor();
          // Navigate to login screen after signup
          }}
        >
          <Text style={{ color: 'azure' }}>Registor</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Registor

const styles = StyleSheet.create({
  input1: {
    borderWidth: 1,
    height: 54,
    width: 304,
    borderRadius: 14,
    marginTop: 15,
    backgroundColor: '#629FFA',
    textAlign: 'center',
  
  },
  errormsg: {
    textAlign: 'center',
    color: 'red'
  },
  stretch: {
    width: 335,
    height: 160,
    marginTop: -120,
   
    alignSelf: 'center',
  },
  form:{
    marginTop:-10,
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
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
  btn: {
    backgroundColor: '#629FFA',
    width: 236,
    height: 53,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
   
    fontSize: 16,
  },
  signin: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:10
   
  },
})