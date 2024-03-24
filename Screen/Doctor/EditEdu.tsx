import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import Auth from '@react-native-firebase/auth';


const EditEdu = () => {
  const navigation = useNavigation();
  const user = Auth().currentUser?.uid;
  const [userData, setUserData] = useState({
    MBBS: '',
    dateOfGraduation: '',
    specialization: '',
    dateOfSpecialization: '',
    messageOrBio: '',
    profileImage: ''
  });

  const getUser = async () => {
    try {
      const documentSnapshot = await firestore().collection('Doctor').doc(user).get();

      if (documentSnapshot.exists) {
        const fetchedData = documentSnapshot.data();
        console.log('User Data', fetchedData);
        setUserData(fetchedData || {});
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      await firestore().collection('Doctor').doc(user).update(userData);
      Alert.alert('Profile Updated');
      console.log('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Image
          source={{ uri: userData.profileImage }}
          style={{ height: 190, width: 200, marginBottom: 20 , marginTop: -50, borderRadius: 130, borderWidth: 2, borderColor: "black" }}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="MBBS"
        value={userData.MBBS}
        onChangeText={(txt) => setUserData({ ...userData, MBBS: txt })}
      />
      <TextInput
        style={styles.input}
        placeholder="Date of Graduation"
        value={userData.dateOfGraduation}
        onChangeText={(txt) => setUserData({ ...userData, dateOfGraduation: txt })}
      />
      <TextInput
        style={styles.input}
        placeholder="Specialization"
        value={userData.specialization}
        onChangeText={(txt) => setUserData({ ...userData, specialization: txt })}
      />
      <TextInput
        style={styles.input}
        placeholder="Date of Specialization"
        value={userData.dateOfSpecialization}
        onChangeText={(txt) => setUserData({ ...userData, dateOfSpecialization: txt })}
      />
      <TextInput
        style={styles.input}
        placeholder="Message or Bio"
        value={userData.messageOrBio}
        onChangeText={(txt) => setUserData({ ...userData, messageOrBio: txt })}
      />

<TouchableOpacity style={styles.update} onPress={handleUpdateProfile} ><Text style={{color:"azure" ,   justifyContent: 'center', alignItems: 'center',}}>Update</Text></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  input: {
    height: 35,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    textAlign: 'center',
    backgroundColor: '#629FFA',
    borderRadius:14,
  },
  update:{
    backgroundColor: '#629FFA',
    width: 236,
    height: 53,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    alignSelf:'center'
  }
});

export default EditEdu;
