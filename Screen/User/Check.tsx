import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

export default function Check() {
  const [filePath, setFilePath] = useState(null);
  const [screenResult, setScreenResult] = useState('');
  const [predictResult, setPredictResult] = useState('');
  const navigation = useNavigation()

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

  const navigateToReport = () => {
    navigation.navigate('Report', { screenResult, predictResult, imageUri: filePath.uri });
  };

  const submitImage = async () => {
    // Your submitImage function code here
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: filePath.uri,
        name: 'image.jpg',
        type: 'image/jpg',
      });

      setScreenResult('');
      setPredictResult('');

      const screenResponse = await fetch('http://192.168.0.108:5001/screen', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (screenResponse.ok) {
        const screenData = await screenResponse.json();
        setScreenResult(screenData.result);

        if (screenData.result === 'Diabetic Retinopathy Symptoms Present') {
          const predictResponse = await fetch('http://192.168.0.108:5001/predict', {
            method: 'POST',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            body: formData,
          });

          if (predictResponse.ok) {
            const predictData = await predictResponse.json();
            setPredictResult(predictData.result);
          } else {
            console.error('Error in predict route:', predictResponse.status);
          }
        }
      } else {
        console.error('Error in screen route:', screenResponse.status);
      }
    } catch (error) {
      console.error('Error submitting image:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={{ width: '100%', height: '55%' }}>
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
        {(screenResult || predictResult) ? (
          <TouchableOpacity onPress={navigateToReport} style={styles.reportButton}>
            <Text style={styles.buttonText}>View Report</Text>
          </TouchableOpacity>
        ) : null}
        {screenResult ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultHeader}>Screen Result:</Text>
            <Text style={styles.resultText}>{screenResult}</Text>
          </View>
        ) : null}
        {predictResult ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultHeader}>Predict Result:</Text>
            <Text style={styles.resultText}>{predictResult}</Text>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
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
  reportButton: {
    backgroundColor: '#629FFA',
    width: 120,
    padding: 10,
    borderRadius: 15,
    marginTop: 20,
    borderColor: 'black',
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
    marginTop: -15,
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
    alignSelf: 'stretch',
    paddingHorizontal: 20,
  },
  resultHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  resultText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 5,
  },
});
