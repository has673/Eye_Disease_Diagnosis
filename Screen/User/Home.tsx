import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import Auth from '@react-native-firebase/auth';

const Home = ({navigation}) => {
    const handleNavigation = screenname => {
        console.log(screenname);
        navigation.navigate(screenname);
      };
    const route = useRoute()
    const {email , userid} = route.params

    
  return (
    <View>
      <Text>Home</Text>
      <Text>Email:{email}</Text>
      <Text>Id:{userid}</Text>
      <TouchableOpacity onPress={async()=>{
       await  Auth().signOut
      }}><Text> Logout </Text></TouchableOpacity>
    </View>
  )
}

export default Home