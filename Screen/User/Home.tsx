import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React ,{useEffect} from 'react'
import { useRoute } from '@react-navigation/native';
import Auth from '@react-native-firebase/auth';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



const Home = ({navigation}) => {
    const handleNavigation = screenname => {
        console.log(screenname);
        navigation.navigate(screenname);
      };
    const route = useRoute()
    // const {email , userid} = route.params
  
    useEffect(() => {
      const unsubscribe = Auth().onAuthStateChanged((user) => {
        if (!user) {
          // If user is not authenticated, navigate to the login screen
          navigation.navigate('Login');
        }
      });
    
      // Cleanup the subscription when the component unmounts
      return unsubscribe;
    }, [navigation]);
 const handlelogout = async()=>{
  await  Auth().signOut()
  console.log('logoeed out')

 }
    
  return (
    <>
    <View>
      <Text>Home</Text>
       <Text>Email:{Auth().currentUser?.email}</Text>
      <Text>Id:{Auth().currentUser?.uid}</Text> 
      <TouchableOpacity onPress={handlelogout}><Text> Logout </Text></TouchableOpacity>
      </View>
     
      </>
    
  )
}
const styles = StyleSheet.create({
  bottomtab:{
  flex:1
  }
})
export default Home
