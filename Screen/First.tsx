import React from 'react';
import { View ,Text,StyleSheet,Image} from 'react-native';

function First(){
  
    return(
        
        <View style={styles.container}>
      <View>
        <Image style={styles.image} source={require('../assets/logo.png')} />
      </View>
      <View style={styles.loader}>
       
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
  });
export default First