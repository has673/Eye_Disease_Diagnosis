import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert, Image } from 'react-native';
import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import DocumentPicker from 'react-native-document-picker';

const EditProfile = () => {
  const navigation = useNavigation();
  const user = Auth().currentUser?.uid;
  const [imageData, setImageData] = useState(null);
  const [fullImgRefPath, setFullImgRefPath] = useState('');
  const [imgDownloadUrl, setImgDownloadUrl] = useState('');

  const [userData, setUserData] = useState({
    fname: '',
    lname: '',
    city: '',
    age: '',
    phonenumber: '',
  });

  const getUser = async () => {
    try {
      const documentSnapshot = await firestore().collection('User').doc(user).get();

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
        profileImage: imgDownloadUrl || ''
      };

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

  // const pickImage = async () => {
  //   try {
  //     const response = await DocumentPicker.pickSingle({
  //       type: [DocumentPicker.types.images],
  //     });
  //     console.log(response);
  //     setImageData(response);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const uploadImage = async () => {
  //   try {
  //     if (!imageData || !imageData.uri) {
  //       Alert.alert('No image selected');
  //       return;
  //     }

  //     const reference = storage().ref(`/profile/${imageData.name}`);
  //     await reference.putFile(imageData.uri);

  //     setFullImgRefPath(reference.fullPath);
  //     const url = await reference.getDownloadURL();
  //     setImgDownloadUrl(url);

  //     Alert.alert('Image Uploaded Successfully');
  //   } catch (err) {
  //     console.error('Error uploading image:', err.message);
  //   }
  // };

  return (
    <View style={styles.container}>
     
      {/* {imageData ? (
        <Image
          source={{ uri: imageData.uri }}
          style={{ height: 200, width: 200, marginBottom: 20 , alignSelf:'center' }}
        />
      ) : (
        <Text>No Image Found</Text>
      )} */}
      {/* <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <Button title="Select Image" onPress={pickImage} />
        <Button title="Upload Image" onPress={uploadImage} />
      </View> */}
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
    textAlign: 'center',
  },
});

export default EditProfile;
