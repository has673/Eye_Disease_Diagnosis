import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
// import * as tf from '@tensorflow/tfjs';
// import { bundleResourceIO, decodeJpeg } from '@tensorflow/tfjs-react-native';

export default function Check({navigation}) {
  const handleNavigation = screenname => {
    console.log(screenname);
    navigation.navigate(screenname);
  };
  const [filePath, setFilePath] = useState(null);
  const [pred, setPred] = useState(null);


  const selectImage = () => {
    setFilePath(null);
    const options = {
      mediaType: 'photo',
      quality: 0.7,
      selectionLimit: 1,
      includeExtra: true,
      includeBase64: true,
    };

    launchImageLibrary(options, (res) => {
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

  return (
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
            <Text style={styles.label}>{filePath ? 'CHANGE' : 'CHOOSE'} IMAGE</Text>
          </TouchableOpacity>
        </View>
      </View>
{filePath?
      <TouchableOpacity
        // onPress={getPredictions}
        // onPress={() => handleNavigation('Report')}
        style={styles.submitButton}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>:null
}
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
    height: 100,
    width: 250,
    backgroundColor: '#629FFA',
    marginTop: 10,
    position: 'relative',
    borderRadius: 20,
  },
  uploadImage: {
    width: '100%',
    height: '100%',
  },
  selectImage: {
    width: 200,
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
    marginTop: 25,
    borderColor: 'black',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },

})