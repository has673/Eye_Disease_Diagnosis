import { View, Text, TouchableOpacity, StyleSheet  , Image} from 'react-native'
useNavigation


import React ,{useEffect} from 'react'
import Auth from '@react-native-firebase/auth';

import { useNavigation } from '@react-navigation/native';
import Card from '../../components/Card';
import DiseaseCard from '../../components/DiseaseCard';

 
const Home = () => {
  const navigation = useNavigation()
  const Press1=()=>{
    navigation.navigate('UserAppointment')
  }
  const Press2=()=>{
    navigation.navigate('Appointment Requests')
  }
  const Press3=()=>{
    navigation.navigate('Complete Appointments')
  }

  const Press4=()=>{
    navigation.navigate('Check')
    console.log('lll')
  }
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
 
    const data = [
      { name: 'Appointments', text: 'calendar-month', icon: 'calendar-month', onPress: Press1 },
      { name: 'Requests', text: 'calendar-question', icon: 'calendar-question', onPress: Press2 },
      { name: 'History', text: 'calendar-check', icon: 'calendar-check', onPress: Press3 }
    ];

    const data2 = [
      { name: 'Diabetic', icon: 'eye-outline', onPress: Press4 },
      { name: 'Glaucoma', icon: 'eye-outline', onPress: Press4 },
      { name: 'Cataract',  icon: 'eye', onPress: Press4 }
    ];
  return (
    <>
     <View>
     
      </View> 
        <View style={styles.Dashboard}>
        <View style={styles.medicalcheck}>
      <Text style={styles.title}>Eye Disease Diagnosis</Text>
        <Text style={styles.description}>
          Here you can view information about various eye diseases and their treatments.
        </Text>
        {/* <Text style={styles.description}>
        Manage your Appoitments with us. Connect with best Healthcare Providers. 
        </Text> */}
      </View>
      <View style={styles.history}></View>
      <Text
        style={{
          fontSize: 22,
          fontWeight: 'bold',
          marginTop: 20,
          marginLeft: 10,
          color:'black'
        }}>
        Appointments
      </Text>
      <View style={styles.cardcontainer}>
      {data.map((item, index) => (
        <Card
          key={index}
          name={item.name}
          text={item.text}
          icon={item.icon}
          onPress={item.onPress}
        />
      ))}
    </View>
    
    </View> 
    <View style={styles.detections}></View>

<Text
  style={{
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 10,
    color:'black'
  }}>
  Detections
</Text>
<View style={styles.cardcontainer}>
{data2.map((item, index) => (
  <DiseaseCard
    key={index}
    name={item.name}
   
    icon={item.icon}
    onPress={item.onPress}
  />
))}
</View>

     
      </>
    
  )
}
const styles = StyleSheet.create({


  Dashboard: {
    flexDirection: 'column',
    // backgroundColor: '',
    flex:1,
  },
  
  medicalcheck: {
    height: 160,
    backgroundColor: '#629FFA',
    marginTop: 30,
    marginLeft: 25,
    marginRight: 25,
    borderRadius: 10,
  },

  
  cardcontainer: {
    flex: 1,
    justifyContent: 'center',
    
    flexDirection:"row"
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    marginTop: 10,
    textAlign:'center',
  },
  description: {
    fontSize: 16,
    color: 'white',
    textAlign:"center"
  },
  detections: {
    flex: 1,
    justifyContent: 'center',
    
    flexDirection:"row"
  },


  medicalcheck: {
    height: 160,
    backgroundColor: '#629FFA',
    marginTop: 30,
    marginLeft: 25,
    marginRight: 25,
    borderRadius: 10,
  },

  stretch: {
    width: 105,
    height: 110,
    marginLeft: 125,
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

 
});

export default Home
