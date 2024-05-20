import React, { useState, useEffect, useRef } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';
import Auth from '@react-native-firebase/auth';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import ViewShot from 'react-native-view-shot';


import RNFS from 'react-native-fs';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';

const ViewReport = () => {
  const [userData, setUserData] = useState({
    Name: '',
    city: '',
    age: '',
    phonenumber: '',
  });

  const [loading, setLoading] = useState(true);
  const route = useRoute();


const { diagnosisId } = route.params;
console.log(diagnosisId)
const [imageLoading, setImageLoading] = useState(true);
const [diagnosisData, setDiagnosisData] = useState(null);
  const user = Auth().currentUser?.uid;

  const [capturedImage, setCapturedImage] = useState(null);

  const ref = useRef();


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

  useEffect(() => {
    console.log(diagnosisId)
    const unsubscribe = firestore().collection('Diagnosis').doc(diagnosisId).onSnapshot(snapshot => {
      const diagnosis = snapshot.data();
      setDiagnosisData(diagnosis);
      console.log(diagnosis)
      setLoading(false); // Set loading to false when data is fetched
    });

    getUser();

    return () => unsubscribe();
  }, [diagnosisId]);

 
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
          <ViewShot ref={ref} options={{  fileName: 'DR Report',format: "jpg", quality: 1 }}>
            <Image style={styles.stretch} source={require('../../assets/logo.png')} />
            {/* <View style={styles.row}>
              <Text style={[styles.heading, styles.bold]}>Report Number:</Text>
              <Text style={styles.text}>{diagnosisData?.reportNumber}</Text>
            </View> */}

            <View style={styles.row}>

              <Text style={[styles.heading, styles.bold]}>Date:</Text>
              <Text style={styles.text}>{diagnosisData?.date}</Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.heading, styles.bold]}>Time:</Text>
              <Text style={styles.text}>{diagnosisData?.time}</Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.heading, styles.bold]}>Name:</Text>
              <Text style={styles.text}>{userData.Name}</Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.heading, styles.bold]}>Diagnosis:</Text>
              <Text style={styles.text}>{diagnosisData?.diagnosis}</Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.heading, styles.bold]}>Severity:</Text>
              <Text style={styles.text}>{diagnosisData?.severity}</Text>
            </View>
            {diagnosisData?.imageUri && (
              <View style={styles.imageContainer}>
                {imageLoading && <ActivityIndicator style={styles.imageLoader} size="large" color="#629FFA" />}
                <Image
                  source={{ uri: diagnosisData.imageUri }}
                  style={styles.capturedImage}
                  onLoad={() => setImageLoading(false)}
                  onError={() => setImageLoading(false)}
                />
              </View>
            )}
          </ViewShot>
          <View style={styles.btns}>
          
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
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 150,
    marginTop: 20,
  },
  imageLoader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -18,
    marginTop: -18,
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
    marginTop: 35,
    alignItems: 'center',
    alignSelf: 'center',
    width: 90,
    justifyContent: 'center',
    textAlign: 'justify',
  },
});

export default ViewReport;
