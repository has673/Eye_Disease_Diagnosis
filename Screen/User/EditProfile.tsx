import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button , Alert } from 'react-native';
import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const EditProfile = () => {
const navigation = useNavigation()
  const user = Auth().currentUser?.uid;

  const [userData, setUserData] = useState({
    fname: '',
    lname: '',
    city: '',
    age: '',
    phonenumber: '',
  });

  const getUser = async () => {
    try {
      const documentSnapshot = await firestore()
        .collection('User')
        .doc(user)
        .get();

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
      const updateData = {
        fname: userData.fname || '',
        lname: userData.lname || '',
        city: userData.city || '',
        age: userData.age || '',
        phonenumber: userData.phonenumber || '',
      };

      await firestore().collection('User').doc(user).update(updateData);
Alert.alert("Profile Updated")
      navigation.goBack()
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
      <Text style={styles.header}>Edit Profile</Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={userData.fname}
        onChangeText={(txt) => setUserData({ ...userData, fname: txt })}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={userData.lname}
        onChangeText={(txt) => setUserData({ ...userData, lname: txt })}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={userData.city}
        onChangeText={(txt) => setUserData({ ...userData, city: txt })}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={userData.age}
        keyboardType="numeric"
        onChangeText={(txt) => setUserData({ ...userData, age: txt })}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={userData.phonenumber}
        keyboardType="numeric"
        onChangeText={(txt) => setUserData({ ...userData, phonenumber: txt })}
      />

      <Button title="Update Profile" onPress={handleUpdateProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    textAlign:'center'
  },
});

export default EditProfile;
