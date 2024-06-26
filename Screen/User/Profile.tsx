import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import storage from '@react-native-firebase/storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react'
import Auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';


const Profile = () => {
  const [userData, setUserData] = useState({
    Name: '',
    city: '',
    age: '',
    phonenumber: '',
    profileImage: '',
  });
  const [loading, setLoading] = useState(true)
  const navigation = useNavigation()
  const user = Auth().currentUser?.uid;
  const handlelogout = async () => {
    await Auth().signOut()
    console.log('logoeed out')

  }
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const documentSnapshot = await firestore().collection('User').doc(user).get();

      if (documentSnapshot.exists) {
        const fetchedData = documentSnapshot.data();
        console.log('User Data', fetchedData);
        setUserData(fetchedData || {});
        console.log(userData.profileImage)
        setLoading(false)
        console.log('profile')
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };
  return (
    <View>

      <View style={styles.containerLanguage}>
        <View style={styles.ProfileImage}>
          {userData.profileImage ? (
            <Image
              source={{ uri: userData.profileImage }}
              style={{ height: 200, width: 200, marginBottom: 20, alignSelf: 'center', borderRadius: 130, borderWidth: 2, borderColor: "azure" }}
            />
          ) : (
            <Text style={{ marginBottom: 20, alignSelf: 'center' }}>No Image Found</Text>
          )}
        </View>
        <Text style={{ textAlign: "center", fontWeight: "bold", color: "black", fontSize: 20 }}>{`${userData.Name}`}</Text>
        <View style={styles.container}>
          <View style={styles.myView}>
            <TouchableOpacity onPress={() => navigation.navigate('EditProfile')} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View>
                <MaterialCommunityIcons name='account-edit-outline' size={29} />
              </View>

              <Text style={{ fontSize: 20, fontWeight: 'bold', color: "black", marginLeft: 20, marginTop: 5 }}>
                Edit Profile
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ paddingTop: 10, paddingLeft: 17 }}>
            <Image source={require('../../assets/Line.png')} />
          </View>

        

          <View style={styles.myView}>
          <TouchableOpacity onPress={() => navigation.navigate('Registor')} style={{ flexDirection: 'row', alignItems: 'center' }}>

            <View>
              <MaterialCommunityIcons name='doctor' size={25} />
            </View>

            <Text style={{ fontSize: 20, fontWeight: 'bold', color: "black", marginLeft: 20 }}>
              Doctor Registor
            </Text>

       </TouchableOpacity>
          </View>
          <View style={{ paddingTop: 10, paddingLeft: 17 }}>
            <Image source={require('../../assets/Line.png')} />
          </View>

          <View style={styles.myView}>
            <TouchableOpacity onPress={() => navigation.navigate('Diagnosis')} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View>
                <Ionicons name='medkit' size={25} />
              </View>

              <Text style={{ fontSize: 20, fontWeight: 'bold', color: "black", marginLeft: 20, marginTop: 5 }}>
                Diagnosis
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={{ paddingTop: 10, paddingLeft: 17 }}>
            <Image source={require('../../assets/Line.png')} />
          </View>


          {/* <View style={styles.myView}>
            <View>
              <Ionicons name='calendar' size={25} />
            </View>

            <Text style={{ fontSize: 20, fontWeight: 'bold', color: "black", marginLeft: 20 }}>
              Appointments
            </Text>


          </View> */}
          <View style={styles.myView}>
            <TouchableOpacity onPress={() => navigation.navigate('UserAppointment')} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View>
                <Ionicons name='calendar' size={25} />
              </View>

              <Text style={{ fontSize: 20, fontWeight: 'bold', color: "black", marginLeft: 20, marginTop: 5 }}>
                Appointments
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={{ paddingTop: 10, paddingLeft: 17 }}>
            <Image source={require('../../assets/Line.png')} />
          </View>

          <View style={styles.myView}>

            <TouchableOpacity onPress={handlelogout} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View>
                <Ionicons name='log-out-outline' size={25} />
              </View>


              <Text style={{ fontSize: 20, fontWeight: 'bold', color: "black", marginLeft: 20 }}>
                Logout
              </Text>
            </TouchableOpacity>



          </View>
          
        </View>

      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  ProfileImage: {

    marginTop: 40,
  },

  myView: {
    flexDirection: 'row',
    marginTop: 25,
    marginLeft: 20,
  },
  container: {
    marginTop: 0
  }
});
