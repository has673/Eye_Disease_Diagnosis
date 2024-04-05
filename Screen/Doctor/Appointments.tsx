/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, ActivityIndicator, ScrollView , Alert} from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth'; 
import { useState , useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import DoneAppointmentCard from '../../components/DoneAppointmentCard';


const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = auth().currentUser?.uid;
  console.log('confirmed')
  console.log(currentUser)
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Appointments')
      .where('doctorId', '==', currentUser) 
      .where('Status', '==', 'confirmed')
      .where('Done', '==', false)
      .onSnapshot((snapshot) => {
        const appointmentsList = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          appointmentsList.push({ id: doc.id, ...data });
        });
        setAppointments(appointmentsList);
        setLoading(false);
      });

    return () => unsubscribe();
  }, [currentUser]); 
  const doneAppointment = async (appointmentId) => {
    try {
      const appointmentRef = firestore().collection('Appointments').doc(appointmentId);
      const appointmentSnapshot = await appointmentRef.get();
  
      if (!appointmentSnapshot.exists) {
        throw new Error('Appointment not found');
      }
  
      const appointmentData = appointmentSnapshot.data();
      console.log(appointmentData);
      console.log('function');
      if (
        appointmentData &&
        appointmentData.Status === 'confirmed' &&
        new Date(appointmentData.appointmentDate) > new Date()
      ) {
        // Update the appointment status to Done
        await appointmentRef.update({ Done: true });
        console.log(appointmentRef);
        Alert.alert('Success', 'Appointment Done.');
      } 
    else {
        Alert.alert('Error', 'Appointment cannot be complete.');
        console.log('err');
      }
    } catch (error) {
      console.error('Error confirming appointment:', error);
      Alert.alert('Error', 'Failed to complete appointment. Please try again.');
    }
  };
  const cancelAppointment = async (appointmentId) => {
    try {
      Alert.alert(
        'Confirm Delete',
        'Are you sure you want to cancel this appointment?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: async () => {
              await firestore().collection('Appointments').doc(appointmentId).delete();
              Alert.alert('Success', 'Appointment canceled successfully.');
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error canceling appointment:', error);
      Alert.alert('Error', 'Failed to cancel appointment. Please try again.');
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
  {loading ? (
    <ActivityIndicator size="large" color="#629FFA" />
  ) : (
    <View>
      {appointments.length > 0 ? (
        <View>
          {appointments.map((appointment) => (
            <DoneAppointmentCard key={appointment.id} appointment={appointment} onCancel={cancelAppointment} onDone={doneAppointment} />   
          ))}
        </View>
      ) : (
        <Text style={styles.text}>No Scheduled Appoinments!.</Text>
      )}
    </View>
  )}
</ScrollView>
  )
}

export default Appointments

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: 'red',
  },
  text:{
    textAlign:'center'
  }
})