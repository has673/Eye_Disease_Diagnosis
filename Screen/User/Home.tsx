import { View, Text, TouchableOpacity, StyleSheet  , Image} from 'react-native'
import {SearchBar} from 'react-native-elements';

import React ,{useEffect} from 'react'
import { useRoute } from '@react-navigation/native';
import Auth from '@react-native-firebase/auth';


  
const search = '';

const Home = ({navigation}) => {
  
    // const {email , userid} = route.params
  
    useEffect(() => {
      const unsubscribe = Auth().onAuthStateChanged((user) => {
        if (!user) {
          // If user is not authenticated, navigate to the login screen
          navigation.navigate('Login');
        }
      });
    
      // Cleanup the subscription when the component unmounts
      return unsubscribe;
    }, [navigation]);
 const handlelogout = async()=>{
  await  Auth().signOut()
  console.log('logoeed out')

 }
 
  return (
    <>
     <View>
     
      </View> 
        <View style={styles.Dashboard}>


      <View style={styles.medicalcheck}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 24,
            color: 'white',
            marginLeft: 10,
            marginTop: 10,
          }}>
          {' '}
          Medical Checks !
        </Text>

        <Text style={{color: 'white', marginTop: 10, alignItems: 'center'}}>
          {' '}
          Check your health condition{' '}
        </Text>
        <Text style={{color: 'white'}}> regularly to avoid any mishap</Text>

        <View style={styles.imageandbutton}>
          <View style={styles.BookAppointmentViewbtn}>
            <TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  alignItems: 'center',
                  fontWeight: 'bold',
                  fontSize: 16,
                  paddingTop: 15,
                  paddingLeft: 15,
                }}>
                Check Now
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <Image
              style={styles.stretch}
              source={require('../../assets/image1.png')}
            />
          </View>
        </View>
      </View>

      <View style={styles.history}></View>

      <Text
        style={{
          fontSize: 22,
          fontWeight: 'bold',
          marginTop: 20,
          marginLeft: 10,
        }}>
        History
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
          source={require('../../assets/HistoryIcon.png')}
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
        <Image
          source={require('../../assets/ForwardIcon.png')}
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

      <View style={styles.reports}></View>

      <Text
        style={{
          fontSize: 22,
          fontWeight: 'bold',
          marginTop: 20,
          marginLeft: 10,
        }}>
        Reports
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
        <Image
          source={require('../../assets/ForwardIcon.png')}
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
    </View> 

     
      </>
    
  )
}
const styles = StyleSheet.create({
  SearchBar: {
    backgroundColor: 'white',
    color: 'white',
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20,
    height: 20,
    borderRadius: 40,
  },

  Dashboard: {
    flexDirection: 'column',
    backgroundColor: 'white',
    flex:1,
  },

  medicalcheck: {
    height: 160,
    backgroundColor: '#629FFA',
    marginTop: 80,
    marginLeft: 25,
    marginRight: 25,
    borderRadius: 10,
  },

  stretch: {
    width: 105,
    height: 110,
    marginLeft: 135,
    marginBottom: 60,
    marginTop: -60,
  },

  imageandbutton: {
    flexDirection: 'row',
  },

  history: {
    flexDirection: 'row',
  },

  reports: {
    flexDirection: 'row',
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
    borderColor: 'black',
  },
});

export default Home
