import * as React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
export default function Splash() {
  
  return (
    <View>
      {/* <Image style={styles.image1} source={require('../assets/Welcome.png')} /> */}
      <View style={styles.container}>
        <View>
          <Image style={styles.image2} source={require('../assets/logo.png')} />
          <Image
            style={styles.image3}
            source={require('../assets/Text.png')}
          />
          {/* <Image
            style={styles.image4}
            source={require('../assets/text2_brain.png')}
          /> */}
        </View>
        <View style={styles.Started}>
          <TouchableOpacity
            // onPress={() => handleNavigation('login')}
            style={styles.btn}>
            <Text style={styles.textB}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  
  image2: {
    width: 375,
    height: 256,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 190,
  },
  image3: {
    width: 240,
    height: 95,
    marginLeft: 22,
    marginBottom: 40,
  },
  image4: {
    width: 167,
    height: 53,
    marginLeft: 22,
    marginBottom: 50,
  },
  btn: {
    backgroundColor: '#629FFA',
    width: 296,
    height: 50,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  Started: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textB: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },

  container: {
    marginTop: 100,
  },
});
