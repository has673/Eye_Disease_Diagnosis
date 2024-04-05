import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios'; // Import Axios for making HTTP requests

export default function Check() {
  const [filePath, setFilePath] = useState(null);
  const [result, setResult] = useState('');

  const selectImage = () => {
    setFilePath(null);
    const options = {
      mediaType: 'photo',
      quality: 0.7,
      selectionLimit: 1,
      includeExtra: true,
      includeBase64: true,
    };

    launchImageLibrary(options, res => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error:', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button:', res.customButton);
      } else {
        setFilePath(res.assets[0]);
      }
    });
  };

  // const submitImage = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append('image', {
  //       uri: filePath.uri,
  //       name: 'image.jpg',
  //       type: 'image/jpg',
  //     });
  //     console.log( filePath.uri)
  //     const response = await axios.post('http://192.168.18.73:5000/predict', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });

  //     setResult(response.data.result);
  //     console.log(response)
  //   } catch (error) {
  //     console.error('Error submitting image:', error);
  //   }
  // };
  // useEffect(() => {
  //   testServer(); // Test the server when the component mounts
  // }, []);
  const submitImage = async () => {
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: filePath.uri,
        name: 'image.jpg',
        type: 'image/jpg',
      });

      const response = await fetch('http://192.168.137.87:5001/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData, // Pass formData as the request body
      });

      if (response.ok) {
        const responseData = await response.json(); // Assuming the response is in JSON format
        setResult(responseData.result);
        console.log(responseData); // Log the response data
      } else {
        console.error('Error:', response.status); // Log the error status if the request fails
      }
    } catch (error) {
      console.error('Error submitting image:', error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={{width: '100%', height: '55%'}}>
        <View style={styles.InsertImageContainer}>
          <Image
            style={styles.uploadImage}
            resizeMode="contain"
            source={{
              uri: filePath
                ? filePath.uri
                : 'https://icon-library.com/images/file-upload-icon/file-upload-icon-22.jpg',
            }}
          />
          <TouchableOpacity style={styles.selectImage} onPress={selectImage}>
            <Text style={styles.label}>
              {filePath ? 'CHANGE' : 'CHOOSE'} IMAGE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {filePath ? (
        <TouchableOpacity onPress={submitImage} style={styles.submitButton}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      ) : null}
      {result ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{result}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  InsertImageContainer: {
    alignSelf: 'center',
    padding: 8,
    height: 250,
    width: 250,
    backgroundColor: '#629FFA',
    marginTop: -110,
    position: 'relative',
    borderRadius: 22,
  },
  uploadImage: {
    width: '100%',
    height: '100%',
  },
  selectImage: {
    width: '60%',
    backgroundColor: '#629FFA',
    marginTop: 20,
    borderRadius: 20,
    alignSelf: 'center',
  },
  label: {
    fontSize: 20,
    padding: 15,
    color: '#fff',
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#629FFA',
    width: 90,
    padding: 10,
    borderRadius: 15,
    marginTop: -45,
    borderColor: 'black',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  resultContainer: {
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#eee',
  },
  resultText: {
    fontSize: 18,
    textAlign: 'center',
  },
});
