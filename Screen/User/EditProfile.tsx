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
    <View>
      <Text>Edit Profile</Text>

      <TextInput
        placeholder="First Name"
        value={userData.fname}
        onChangeText={(txt) => setUserData({ ...userData, fname: txt })}
      />
      <TextInput
        placeholder="Last Name"
        value={userData.lname}
        onChangeText={(txt) => setUserData({ ...userData, lname: txt })}
      />
      <TextInput
        placeholder="City"
        value={userData.city}
        onChangeText={(txt) => setUserData({ ...userData, city: txt })}
      />
      <TextInput
        placeholder="Age"
        value={userData.age}
        keyboardType="numeric"
        onChangeText={(txt) => setUserData({ ...userData, age: txt })}
      />
      <TextInput
        placeholder="Phone Number"
        value={userData.phonenumber}
        keyboardType="numeric"
        onChangeText={(txt) => setUserData({ ...userData, phonenumber: txt })}
      />

      <Button title="Update Profile" onPress={handleUpdateProfile} />
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({});
