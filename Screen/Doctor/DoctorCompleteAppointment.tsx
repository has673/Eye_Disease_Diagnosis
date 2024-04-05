/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import React, { useState, useEffect } from 'react';
import {  Text, StyleSheet, ActivityIndicator,  ScrollView , Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import DoctorCompleteCard from '../../components/DoctorCompleteCard';

const DoctorCompleteAppointment = () => {
    console.log("doctor complete appointments")
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
            .where('doctorId', '==', currentUser.uid)
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
          <DoctorCompleteCard key={appointment.id} appointment={appointment}  />       
        ))
      )}
    </ScrollView>
  )
}

export default DoctorCompleteAppointment

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: '#FFFFFF',
      padding: 10,
       
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
      text:{
        justifyContent:"center",
        alignItems:'center'
      }
})