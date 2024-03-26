import { StyleSheet, Text, View, ActivityIndicator, ScrollView , Alert} from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth'; 
import { useState , useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import DoneAppointmentCard from '../../components/DoneAppointmentCard';
;

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = auth().currentUser?.uid;
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
      if (appointmentData && appointmentData.Status === 'confirmed' && appointmentData.appointmentDate>Date.now()) {
        await appointmentRef.update({ Done: true });
        Alert.alert('Success', 'Appointment Done.');
      } else {
        Alert.alert('Error', 'Appointment cannot be complete.');
      }
    } catch (error) {
      console.error('Error confirming appointment:', error);
      Alert.alert('Error', 'Failed to complete appointment. Please try again.');
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
            <DoneAppointmentCard key={appointment.id} appointment={appointment} onDone={doneAppointment} />   
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