import { View, Text } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';

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
    </View>
  )
}

export default Home