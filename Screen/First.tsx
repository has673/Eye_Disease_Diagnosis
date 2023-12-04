import React  , {useEffect}from 'react';
import { View ,Text,StyleSheet,Image} from 'react-native';
import LottieView from 'lottie-react-native';
import Auth from '@react-native-firebase/auth';


function First({navigation}){
  // const navigateToNextScreen = () => {
  //   const screenName = 'Login';
  //   console.log(screenName);
  //   navigation.navigate(screenName);
  // };
  
  // setTimeout(navigateToNextScreen, 1000);
  useEffect(() => {
    const navigateToNextScreen = () => {
      const isAuthenticated = Auth().currentUser;
      const screenName = isAuthenticated ? 'Dashboard' : 'Login';
      navigation.navigate(screenName);
    };

    setTimeout(navigateToNextScreen, 1000);

    // Clean up any resources or subscriptions if needed
    return () => {
      clearTimeout(navigateToNextScreen);
    };
  }, [navigation]);
    return(
        
        <View style={styles.container}>
         <View>
        <Image style={styles.stretch} source={require('../assets/logo.png')} />
      </View>
      <Image
            style={styles.image3}
            source={require('../assets/Text.png')}
          />
      <View>
        <Image style={styles.image} source={require("../assets/loader.json")} />
      </View>
      <View style={styles.loader}>
      <LottieView style={{height:100 , width:100 , marginBottom:900}} source={require('../assets/loader.json')} autoPlay loop />
       
      </View>
      
      
    </View>

    );
} 

const styles = StyleSheet.create({
    image: {
      width: 375,
      height: 256,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: 140,
    },
    container: {
      marginTop: 100,
    },
    loader: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 150,
      marginLeft: 110,
      height: 240,
      width: 160,
    },
    stretch: {
      width: 335,
      height: 186,
      marginTop: -65,
      marginBottom: -60,
      alignSelf: 'center',
    },
    image3: {
      width: 240,
      height: 95,
      marginLeft: 22,
      marginTop: 140,
    }
  });
export default First