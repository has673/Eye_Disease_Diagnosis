// UserAppointmentCard.js
import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';

const UserAppointmentCard = ({ appointment, onPressLeaveFeedback }) => {
  const appointmentDate = appointment.appointmentDate.toDate();
  const formattedDate = appointmentDate.toLocaleString();

  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <View style={styles.inner}>
          <Text style={styles.text}>{`Doctor Name: ${appointment.DoctorName}`}</Text>
          <Text style={styles.text}>{`Date: ${formattedDate}`}</Text>
          <Text style={styles.textname}>{appointment.Clinic}</Text>
        </View>
        <TouchableOpacity style={styles.leave}
        
          onPress={onPressLeaveFeedback}
          
        ><Text style={styles.txt}> Feedback</Text></TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    marginBottom: 25
  },
  txt:{
    textAlign:'center',
    color:'white',
  },
  leave:{
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignSelf:'center',
    width:110,
    justifyContent:'center',
   

  },
  card: {
    backgroundColor: '#629FFA',
    borderRadius: 18,
    padding: 10,
    width: 250,
    height: 160,
    justifyContent: 'space-between' // Added to space out the content and button
  },
  text: {
    color: '#FFFFFF',
    marginBottom: 10,
    fontWeight: 'bold'
  },
  textname: {
    color: '#FFFFFF',
    marginBottom: 7,
    textAlign: 'left',
    fontWeight: 'bold'
  },
  inner: {
    alignItems: 'center'
  }
});

export default UserAppointmentCard;
