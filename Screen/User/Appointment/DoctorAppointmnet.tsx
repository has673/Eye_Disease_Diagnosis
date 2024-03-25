import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, Text, TouchableOpacity, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AppointmentCard from '../../../components/AppointmentCard';


const DoctorAppointment = ({ route }) => {
  const { doctorId } = route.params;
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Appointments')
      .where('doctorId', '==', doctorId)
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
  }, [doctorId]);

  const cancelAppointment = async (appointmentId) => {
    try {
      await firestore().collection('Appointments').doc(appointmentId).delete();
      Alert.alert('Success', 'Appointment canceled successfully.');
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
          {appointments.map((appointment) => (
            // <Card key={appointment.id}>
            //   <Card.Title>{appointment.PatientName}</Card.Title>
            //   <Card.Divider />
            //   <Text>Appointment Date: {appointment.appointmentDate}</Text>
            //   {/* <Text>Additional Details: {appointment.additionalDetails}</Text> */}
            //   <Button
            //     title="Cancel Appointment"
            //     onPress={() => cancelAppointment(appointment.id)}
            //     buttonStyle={styles.cancelButton}
            //   />
            // </Card>
            <AppointmentCard key={appointment.id} appointment={appointment} onCancel={cancelAppointment} />   
          ))}
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
});

export default DoctorAppointment;