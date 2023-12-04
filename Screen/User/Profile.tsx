import { StyleSheet, Text, View ,TouchableOpacity,Image} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react'
import Auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const navigation = useNavigation()
  const handlelogout = async()=>{
    await  Auth().signOut()
    console.log('logoeed out')
  
   }
  return (
    <View>
      <View style={styles.containerLanguage}>
      <View style={styles.ProfileImage}>
        <Image source={require('../../assets/ProfileImage.png')} />
      </View>
      <View style={styles.container}>
      <View style={styles.myView}>
        <View>
          <MaterialCommunityIcons name='account-edit-outline' size={29} />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginLeft: 20,
              marginTop: 5,
            }}>
            Edit Profile
          </Text>
        </TouchableOpacity>
    
      </View>
      <View style={{paddingTop: 10, paddingLeft: 17}}>
        <Image source={require('../../assets/Line.png')} />
      </View>

      <View style={styles.myView}>
        <View>
          <Ionicons name='notifications-outline' size={25}/>
        </View>
        <TouchableOpacity>
          <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 20}}>
            Notification
          </Text>
        </TouchableOpacity>
        
      </View>
      <View style={{paddingTop: 10, paddingLeft: 17}}>
        <Image source={require('../../assets/Line.png')} />
      </View>

      <View style={styles.myView}>
        <View>
          <MaterialCommunityIcons  name='doctor' size={25}/>
        </View>

        <Text style={{fontSize: 20, fontWeight: 'bold', color:"black", marginLeft: 20}}>
          Doctor Registor
        </Text>

      
      </View>
      <View style={{paddingTop: 10, paddingLeft: 17}}>
        <Image source={require('../../assets/Line.png')} />
      </View>
     
    

 
      <View style={styles.myView}>
        <View>
          <Ionicons  name='calendar' size={25}/>
        </View>

        <Text style={{fontSize: 20, fontWeight: 'bold', color:"black", marginLeft: 20}}>
          Appointments
        </Text>

      
      </View>
      <View style={{paddingTop: 10, paddingLeft: 17}}>
        <Image source={require('../../assets/Line.png')} />
      </View>

      <View style={styles.myView}>
        <View>
          <Ionicons  name='log-out-outline' size={25} onPress={handlelogout}/>
        </View>

        <Text style={{fontSize: 20, fontWeight: 'bold', color:"black", marginLeft: 20}}>
        Logout
        </Text>

      
      </View>
      </View>
     
    </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  ProfileImage: {
    marginLeft: 120,
    marginTop: 40,
  },

  myView: {
    flexDirection: 'row',
    marginTop: 25,
    marginLeft: 20,
  },
  container:{
    marginTop:0
  }
});
