/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import { View, ScrollView, StyleSheet, ActivityIndicator, Text,  Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import auth from '@react-native-firebase/auth'; 
import DocAppointmentCard from '../../../components/DocAppointmentCard';
import { useState , useEffect } from 'react';


const DoctorAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUser = auth().currentUser?.uid;
  console.log(currentUser)

  

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Appointments')
      .where('doctorId', '==', currentUser) 
      .where('Status', '==', 'unconfirmed')
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
  }, [currentUser]); // Trigger effect whenever currentUser changes


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
  const confirmAppointment = async (appointmentId) => {
    try {
      const appointmentRef = firestore().collection('Appointments').doc(appointmentId);
      const appointmentSnapshot = await appointmentRef.get();
  
      if (!appointmentSnapshot.exists) {
        throw new Error('Appointment not found');
      }
  
      const appointmentData = appointmentSnapshot.data();
      if (appointmentData && appointmentData.Status === 'unconfirmed') {
        await appointmentRef.update({ Status: 'confirmed' });
        Alert.alert('Success', 'Appointment confirmed successfully.');
      } else {
        Alert.alert('Error', 'Appointment cannot be confirmed as it is not unconfirmed.');
      }
    } catch (error) {
      console.error('Error confirming appointment:', error);
      Alert.alert('Error', 'Failed to confirm appointment. Please try again.');
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
            // eslint-disable-next-line no-trailing-spaces
            <DocAppointmentCard key={appointment.id} appointment={appointment} onCancel={cancelAppointment} onAccept={confirmAppointment}/>   
          ))}
        </View>
      ) : (
        <Text style={styles.text}>No Appointment Requests.</Text>
      )}
    </View>
  )}
</ScrollView>

  );
};

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
});

export default DoctorAppointment;