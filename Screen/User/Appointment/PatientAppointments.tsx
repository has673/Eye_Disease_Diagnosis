/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AppointmentCard from '../../../components/AppointmentCard';

const PatientAppointments = () => {
  console.log('user scheduled appointments');
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
          .where('Status', '==', 'confirmed')
          .get();

        const appointments = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
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

  const handleCancelAppointment = async appointmentId => {
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
              await firestore()
                .collection('Appointments')
                .doc(appointmentId)
                .delete();
              setUserAppointments(prevAppointments =>
                prevAppointments.filter(
                  appointment => appointment.id !== appointmentId,
                ),
              );
              Alert.alert('Success', 'Appointment canceled successfully.');
            },
          },
        ],
        {cancelable: false},
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
          {userAppointments.length > 0 ? (
            <View>
              {userAppointments.map(appointment => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onCancel={handleCancelAppointment}
                />
              ))}
            </View>
          ) : (
            <Text style={styles.text}>No Scheduled Appointments!.</Text>
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
  text: {
    textAlign: 'center',
  },
});
// eslint-disable-next-line prettier/prettier

export default PatientAppointments;
