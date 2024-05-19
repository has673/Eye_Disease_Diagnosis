/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {  Text, StyleSheet, ActivityIndicator,  ScrollView , Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import UserAppointmentCard from '../../../components/UserAppointmentCard'
const  CompleteAppointments = () => {
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
          .where('Status', '==', 'confirmed')
          .where('Done', '==', true)
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <ActivityIndicator style={styles.loadingIndicator} size="large" color="#629FFA" />
      ) : userAppointments.length === 0 ? (
        <Text style={styles.text}>No Appointments History.</Text>
      ) : (
        userAppointments.map(appointment => (
          <UserAppointmentCard key={appointment.id} appointment={appointment}  />
        ))
      )}
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,

  },
  loadingIndicator: {
    marginBottom: 10,
  },

});

export default CompleteAppointments;
