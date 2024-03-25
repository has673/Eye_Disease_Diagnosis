import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, Text, TouchableOpacity, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AppointmentCard from '../../../components/AppointmentCard';
import auth from '@react-native-firebase/auth'; 
import DocAppointmentCard from '../../../components/DocAppointmentCard';


const DoctorAppointment = () => {
  // const { doctorId } = route.params;
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUser = auth().currentUser?.uid;
  console.log(currentUser)

  

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Appointments')
      .where('doctorId', '==', currentUser) // Filter appointments where doctorId is equal to currentUser (doctor's UID)
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
  return (
    <ScrollView contentContainerStyle={styles.container}>
  {loading ? (
    <ActivityIndicator size="large" color="#629FFA" />
  ) : (
    <View>
      {appointments.length > 0 ? (
        <View>
          {appointments.map((appointment) => (
            <DocAppointmentCard key={appointment.id} appointment={appointment} onCancel={cancelAppointment} />   
          ))}
        </View>
      ) : (
        <Text style={styles.text}>No appointments scheduled.</Text>
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