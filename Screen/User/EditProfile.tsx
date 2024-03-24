import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert, Image, TouchableOpacity ,  ActivityIndicator ,  ScrollView,
  KeyboardAvoidingView } from 'react-native';
import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import DocumentPicker from 'react-native-document-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const EditProfile = () => {
  const navigation = useNavigation();
  const user = Auth().currentUser?.uid;
  const [imageData, setImageData] = useState(null);
  const [fullImgRefPath, setFullImgRefPath] = useState('');
  const [imgDownloadUrl, setImgDownloadUrl] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');


  const [userData, setUserData] = useState({
    Name: '',
    city: '',
    age: '',
    phonenumber: '',
    // profileImage: imgDownloadUrl || ''   
  });
  console.log('new code')






console.log('mew code')
const getUser = async () => {
  try {
    const documentSnapshot = await firestore().collection('User').doc(user).get();

    if (documentSnapshot.exists) {
      const fetchedData = documentSnapshot.data();
      console.log('User Data', fetchedData);
      setUserData(fetchedData || {});
      setProfileImageUrl(fetchedData.profileImage || '');
    }
  } catch (error) {
    console.error('Error fetching user data:', error.message);
  }
};

const handleUpdateProfile = async () => {
  try {
    let updateData = {
      Name: userData.Name || '',
      
      city: userData.city || '',
      age: userData.age || '',
      phonenumber: userData.phonenumber || '',
      profileImage: profileImageUrl || '',
    };
    if (imageData) {
      const reference = storage().ref(`/profile/${imageData.name}`);
      await reference.putFile(imageData.uri);
      const url = await reference.getDownloadURL();
      updateData = {
        ...updateData,
        profileImage: url,
      };
    }

    await firestore().collection('User').doc(user).update(updateData);
    Alert.alert('Profile Updated');
    navigation.goBack();
    console.log('Profile updated successfully!');
  } catch (error) {
    console.error('Error updating profile:', error.message);
  }
};

useEffect(() => {
  getUser();
}, []);

const pickImage = async () => {
  try {
    const response = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.images],
    });
    console.log(response);
    setImageData(response);
    setProfileImageUrl(response.uri);
  } catch (err) {
    console.log(err);
  }
};
const removeImage = () => {
  setProfileImageUrl(''); // Clear the profile image URL
  setImageData(null); // Clear the image data
};

const uploadImage = async () => {
  try {
    if (!imageData || !imageData.uri) {
      Alert.alert('No image selected');
      return;
    }

    const reference = storage().ref(`/profile/${imageData.name}`);
    await reference.putFile(imageData.uri);

    const url = await reference.getDownloadURL();
    setProfileImageUrl(url);

    Alert.alert('Image Uploaded Successfully');
  } catch (err) {
    console.error('Error uploading image:', err.message);
  }
};

  return (
   
<View style={styles.container}>
  
      {profileImageUrl ? (
        <View style={{ alignItems: 'center' }}>
          <Image
            source={{ uri: profileImageUrl }}
            style={{ height: 190, width: 200, marginTop:-50, marginBottom: 20, alignSelf: 'center', borderRadius: 130, borderWidth: 2, borderColor: "black" }}
          />
          
        </View>
      ) : (
        <Text style={{ alignSelf: 'center', marginBottom: 20 }}>No Image Found</Text>
      )}
       <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 , justifyContent:"center" }}>
    <TouchableOpacity onPress={removeImage} style={{ backgroundColor: '#629FFA', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, marginRight: 10 }}>
      <AntDesign size={25} name='delete' color={"white"} />
    </TouchableOpacity>
    <TouchableOpacity onPress={pickImage} style={{ backgroundColor: "#629FFA", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 }}>
      <Ionicons size={25} name='add' color={"white"} />
    </TouchableOpacity>
  </View>
      <TextInput
        style={styles.input}
        placeholder=" Name"
        value={userData.Name}
        onChangeText={(txt) => setUserData({ ...userData, Name: txt })}
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
      <TouchableOpacity style={styles.update} onPress={handleUpdateProfile}><Text style={{ color: "azure", justifyContent: 'center', alignItems: 'center', }}>Update</Text></TouchableOpacity>
  
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

export default EditProfile;
