import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


export default function Detect() {
  const navigation = useNavigation()
  const buttonData = [
    { text: 'Detect Tumor' },
    { text: 'Detect Epilepsy' },
    { text: 'Detect Alzheimer' },
  ];
  
  return (
    <View style={styles.container}>
   <View>
      {buttonData.map((button, index) => (
        <View style={styles.signin} key={index}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => handleButtonPress(button.text)}
          >
            <Text style={styles.textbtton}>{button.text}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
      <View style={styles.history}></View>
      <Text
        style={{
          fontSize: 22,
          fontWeight: 'bold',
          marginTop: 20,
          marginLeft: 10,
        }}>
        Results
      </Text>

      <View style={styles.Viewall}>
        <TouchableOpacity>
          <Text
            style={{
              color: '#629FFA',
              textAlign: 'center',
              alignItems: 'center',
              fontSize: 16,
              marginTop: -20,
              marginLeft: 300,
            }}>
            View all
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.downloadicon}>
        <Image
          source={require('../../assets/ReportIcon.png')}
          style={{
            alignSelf: 'center',
            height: 0.15,
            width: 0.15,
            top: 10,
            padding: 15,
            paddingLeft: 5,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.downloadicon1}>
      
        <MaterialIcons name='arrow-forward-ios'
        size={25} 
        style={{
          
            
            top: -3,
            padding: 15,
            paddingLeft: 5,
            right: -8,
          
        }}/>
      </TouchableOpacity>
    </View>
  );
}



const styles = StyleSheet.create({
  box1: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#629FFA',
    width: 257,
    height: 67,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 10,
  },
  signin: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textbtton: {
    color: 'white',
    fontSize: 24,
  },
  downloadicon: {
    backgroundColor: '#629FFA',
    borderRadius: 190,
    width: 52,
    height: 52,
    left: 10,
    bottom: -10,
    borderColor: 'black',
  },
  downloadicon1: {
    backgroundColor: '#ffffff',
    borderRadius: 190,
    width: 52,
    height: 52,
    left: 80,
    bottom: 40,
  },
});
