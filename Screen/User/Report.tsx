import React, { useState, useEffect, useRef } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';
import Auth from '@react-native-firebase/auth';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import ViewShot from 'react-native-view-shot';
import storage from '@react-native-firebase/storage';

import RNFS from 'react-native-fs';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';

const Report = () => {
  const [userData, setUserData] = useState({
    Name: '',
    city: '',
    age: '',
    phonenumber: '',
  });
  const generateReportNumber = () => {
    const prefix = 'DR'; // You can customize the prefix if needed
    const randomSuffix = Math.floor(Math.random() * 10000); // Adjust the range as needed
    return `${prefix}${randomSuffix}`;
  };
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const [reportNumber] = useState(generateReportNumber()); 
  const { screenResult, predictResult, imageUri } = route.params;
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const user = Auth().currentUser?.uid;
  const currentDate = new Date();
  const [saving, setSaving] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
  const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
  const ref = useRef();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const documentSnapshot = await firestore().collection('User').doc(user).get();

      if (documentSnapshot.exists) {
        const fetchedData = documentSnapshot.data();
        setUserData(fetchedData || {});
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };

  const saveReportData = async () => {
    try {
      setSaving(true);
      const imageRef = storage().ref(`reports/${reportNumber}.jpg`);
      await imageRef.putFile(imageUri);
      const downloadURL = await imageRef.getDownloadURL();
      await firestore().collection('Diagnosis').add({
        userId: user,
        date: formattedDate,
        time: formattedTime,
        name: userData.Name,
        diagnosis: screenResult,
        severity: predictResult || 'Normal',
        imageUri: downloadURL,
        reportNumber: generateReportNumber()
      });
      Alert.alert('Success', 'Report data saved successfully.');
    } catch (error) {
      console.error('Error saving report data:', error);
      Alert.alert('Error', 'Failed to save report data.');
    }
    finally {
      setSaving(false); // Set saving state to false when the save process is complete
    }
  };

 
  const captureScreenshot = async () => {
    console.log('called');
    try {
      // Capture the view shot
      const uri = await ref.current.capture();
  
      setCapturedImage(uri);
  
      // Create a destination path in the device's filesystem
      const destinationPath = `${RNFS.DocumentDirectoryPath}/image.jpg`;
  
      // Move the captured image to the destination path
      await RNFS.moveFile(uri, destinationPath);
  
      // Save the image to the device's gallery using CameraRoll
      await CameraRoll.save(destinationPath, { type: 'photo' });
  
      // Show a success message
      Alert.alert('Image Saved', 'Image saved successfully in the gallery.');
    } catch (error) {
      // Show an error message if something goes wrong
      console.log(error);
      Alert.alert('Error', 'Failed to save image.');
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator style={styles.spinner} size="large" color="#629FFA" />
      ) : (
        <View>
          <ViewShot ref={ref} options={{ format: "jpg", quality: 1 }}>
            <Image style={styles.stretch} source={require('../../assets/logo.png')} />
            <View style={styles.row}>
              <Text style={[styles.heading, styles.bold]}>Report Number:</Text>
              <Text style={styles.text}>{reportNumber}</Text>
            </View>

            <View style={styles.row}>

              <Text style={[styles.heading, styles.bold]}>Date:</Text>
              <Text style={styles.text}>{formattedDate}</Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.heading, styles.bold]}>Time:</Text>
              <Text style={styles.text}>{formattedTime}</Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.heading, styles.bold]}>Name:</Text>
              <Text style={styles.text}>{userData.Name}</Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.heading, styles.bold]}>Diagnosis:</Text>
              <Text style={styles.text}>{screenResult}</Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.heading, styles.bold]}>Severity:</Text>
              <Text style={styles.text}>{predictResult}</Text>
            </View>
            <Image source={{ uri: imageUri }} style={styles.capturedImage} />
          </ViewShot>
          <View style={styles.btns}>
          <TouchableOpacity style={styles.button1} onPress={saveReportData} disabled={saving}>
              {saving ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>Save</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={captureScreenshot}>
              <Text style={styles.buttonText}>Capture</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  stretch: {
    width: 335,
    height: 150,
    marginTop: 10,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    marginTop: 10,
    marginLeft: 10,
  },
  spinner: {
    marginTop: 50,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    marginLeft: 5,
    marginBottom: 10,
  },
  button1: {
    backgroundColor: '#629FFA',
    padding: 10,
    borderRadius: 15,
    marginTop: 10,
    alignItems: 'center',
    alignSelf: 'center',
    width: 90,
    justifyContent: 'center',
    textAlign: 'justify',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  capturedImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#629FFA',
    padding: 10,
    borderRadius: 15,
    marginTop: 10,
    alignItems: 'center',
    alignSelf: 'center',
    width: 90,
    justifyContent: 'center',
    textAlign: 'justify',
  },
});

export default Report;
