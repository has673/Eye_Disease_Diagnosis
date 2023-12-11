import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert, Image, TouchableOpacity } from 'react-native';
import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import DocumentPicker from 'react-native-document-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const DocEdit = () => {
  const navigation = useNavigation();
  const user = Auth().currentUser?.uid;
  const [imageData, setImageData] = useState(null);
  const [fullImgRefPath, setFullImgRefPath] = useState('');
  const [imgDownloadUrl, setImgDownloadUrl] = useState('');

  const [userData, setUserData] = useState({
    Name: '',
    email:'',
    Institute:'',
    Hospital:'',
    city: '',
    age: '',
    phonenumber: '',
    // profileImage: imgDownloadUrl || ''   
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

//   const handleUpdateProfile = async () => {
//     try {
//       let updateData = {
//         fname: userData.fname || '',
//         lname: userData.lname || '',
//         city: userData.city || '',
//         age: userData.age || '',
//         phonenumber: userData.phonenumber || '',
//         // profileImage: userData.profileImage || '',
//       };
//       if (imageData) {
//         // Upload the image and get the download URL
//         const reference = storage().ref(`/profile/${imageData.name}`);
//         await reference.putFile(imageData.uri);
//         const url = await reference.getDownloadURL();

//         // Add the image download URL to the updateData
//         updateData = {
//           ...updateData,
//           profileImage: url,
//         };
//       }

//       await firestore().collection('User').doc(user).update(updateData);
//       Alert.alert('Profile Updated');
//       navigation.goBack();
//       console.log('Profile updated successfully!');
//     } catch (error) {
//       console.error('Error updating profile:', error.message);
//     }
//   };

  useEffect(() => {
    getUser();
  }, []);
  // useEffect(() => {
  //   // This effect runs when imgDownloadUrl changes
  //   if (imgDownloadUrl) {
  //     // Update userData with the new image URL
  //     setUserData((prevData) => ({
  //       ...prevData,
  //       profileImage: imgDownloadUrl,
  //     }));
  //   }
  // }, [imgDownloadUrl]);
  const pickImage = async () => {
    try {
      const response = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      console.log(response);
      setImageData(response);
    } catch (err) {
      console.log(err);
    }
  };

  const uploadImage = async () => {
    try {
      if (!imageData || !imageData.uri) {
        Alert.alert('No image selected');
        return;
      }

      const reference = storage().ref(`/profile/${imageData.name}`);
      await reference.putFile(imageData.uri);

      setFullImgRefPath(reference.fullPath);
      const url = await reference.getDownloadURL();
      setImgDownloadUrl(url);

      Alert.alert('Image Uploaded Successfully');
    } catch (err) {
      console.error('Error uploading image:', err.message);
    }
  
  };
  console.log('imgDownloadUrl:', imgDownloadUrl);
  return (
    <View style={styles.container}>
     
      {imgDownloadUrl? (
        <Image
          source={{ uri: imgDownloadUrl }}
          style={{height: 200, width: 200, marginBottom: 20, alignSelf: 'center' ,  borderRadius:130 ,  borderWidth: 2 , borderColor:"black" }}
        />
      ) : (
        <Text style={{ alignSelf: 'center' , marginBottom: 20,}}>No Image Found</Text>
      )} 
       <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity  onPress={pickImage}  style={{marginBottom:10 , width:25 }}><Ionicons size={25} name='add' color={"white"}  style={{backgroundColor:"#629FFA"}}/></TouchableOpacity>
        <TouchableOpacity  onPress={uploadImage} style={{marginBottom:10 , width:25 }} ><MaterialIcons size={25} name='delete-outline' color={"white"}  style={{backgroundColor:"#629FFA"}}/></TouchableOpacity>
        <TouchableOpacity  onPress={uploadImage} style={{marginBottom:10 , width:25 }} ><Feather size={25} name='upload' color={"white"}  style={{backgroundColor:"#629FFA"}}/></TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder= "Name"
        value={userData.Name}
        onChangeText={(txt) => setUserData({ ...userData, Name: txt })}
      />
        <TextInput
        style={styles.input}
        placeholder="email"
        value={userData.email}
        onChangeText={(txt) => setUserData({ ...userData, email: txt })}
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
      {/* <TouchableOpacity style={styles.update} onPress={handleUpdateProfile} ><Text style={{color:"azure" ,   justifyContent: 'center',
    alignItems: 'center',}}>Update</Text></TouchableOpacity> */}
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

export default DocEdit;
