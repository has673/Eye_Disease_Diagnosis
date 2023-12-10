import { StyleSheet, Text, View , TextInput  , TouchableOpacity} from 'react-native'
import React , {useState} from 'react'

const Registor = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const Handleregistor=()=>{

  }
  return (
    <View style={styles.container}>
      <Text>Registor</Text>
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

    marginBottom: 10,
    color: 'azure',
  },
  signin: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})