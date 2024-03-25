import React, { useState, useEffect } from 'react';
import {  Text, StyleSheet, ActivityIndicator,  ScrollView , Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AppointmentCard from '../../../components/AppointmentCard';

const  PatientAppointments = () => {
    console.log("user appointments")
  const [userAppointments, setUserAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const currentUser = auth().currentUser;
        if (!currentUser) {
          throw new Error('User not authenticated');
        }
        
        const snapshot = await firestore()
          .collection('Appointments')
          .where('userId', '==', currentUser.uid)
          .get();

        const appointments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUserAppointments(appointments);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching appointments:', error.message);
        setLoading(false);
      }
    };

    fetchAppointments();

    // Clean up
    return () => setUserAppointments([]);
  }, []);

  // const handleCancelAppointment = async (appointmentId) => {
  //   try {
  //     await firestore().collection('Appointments').doc(appointmentId).delete();
  
  //     // Optionally show a success message or perform other actions
  //   } catch (error) {
  //     console.error('Error canceling appointment:', error.message);
  //     // Optionally show an error message
  //   }
  // };
  const handleCancelAppointment = async (appointmentId) => {
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
              setUserAppointments(prevAppointments => prevAppointments.filter(appointment => appointment.id !== appointmentId));
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
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <ActivityIndicator style={styles.loadingIndicator} size="large" color="#629FFA" />
      ) : userAppointments.length === 0 ? (
        <Text>No appointments found.</Text>
      ) : (
        userAppointments.map(appointment => (
          <AppointmentCard key={appointment.id} appointment={appointment} onCancel={handleCancelAppointment} />       
        ))
      )}
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingIndicator: {
    marginBottom: 20,
  },
  appointmentCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
  cancelButton: {
    backgroundColor: '#FF5733',
    marginTop: 5,
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default PatientAppointments;
