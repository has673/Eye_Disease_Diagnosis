import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const EditProfile = () => {
    const [userData, setUserData] = useState(null);
    const getUser = async()=>{
        
        await firestore()
        .collection('User')
        .doc( Auth().currentUser?.uid)
        .get()
        .then(((documentSnapshot)=>{
            if( documentSnapshot.exists ) {
                console.log('User Data', documentSnapshot.data());
                setUserData(documentSnapshot.data());
              }

        })
        )                        
 
    }
  
  

  const handleUpdateProfile = async () => {
    try {
      
       await  firestore().collection("User").doc( Auth().currentUser?.uid).update({
        name : userData?.name
       })
    
    } catch (error) {
      console.error('Error updating profile:', error.message);
    }
  };

  useEffect(() => {
    getUser()
   }, []);
  return (
    <View>
      <Text>Edit Profile</Text>
     
      <TextInput
        placeholder="Name"
        value= {userData ? userData.name : ''}
        onChangeText={(txt) => setUserData({...userData, fname: txt})}
      />
      <Button title="Update Profile" onPress={handleUpdateProfile} />
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({});
