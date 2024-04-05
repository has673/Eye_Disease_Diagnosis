/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import { format } from 'date-fns';

const DoctorCompleteCard = ({ appointment}) => {
  // const formattedDate = format(new Date(appointment.appointmentDate), 'EEEE, MMMM d, yyyy');
  // const formattedTime = format(new Date(appointment.appointmentDate), 'h:mm a');
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <View style={styles.inner}>
          <Text style={styles.text}>{`Doctor Name: ${appointment.PatientName}`}</Text>
          {/* <Text style={styles.text}>{`Appointment Date: ${appointment.appointmentDate}`}</Text> */}
          {/* <Text style={styles.text}>{`Appointment Time: ${formattedTime}`}</Text> */}
      
          <Text style={styles.text}>{`Date: ${appointment.appointmentDate}`}</Text>
          <Text style={styles.textname}>{appointment.Clinic}</Text>
          
        </View>
        

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    marginTop:100
 
  },
  card: {
    backgroundColor: '#629FFA',
    borderRadius: 18,
    padding: 10,
    width: 250,
    height: 120,

  },
  text: {
    color: '#FFFFFF',
    marginBottom: 10,
    fontWeight: "bold",
    
    
  },
  // textclinic: {
  //   color: '#FFFFFF',
  //   marginBottom: 7,
  //   marginRight: 110,
  //   fontWeight: "bold",
  // },
  textname: {
    color: '#FFFFFF',
    marginBottom: 7,
    textAlign:'left',
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    justifyContent: 'center',
    alignSelf: 'center',
    width: 100,
  },

  cancelButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  inner: {
    alignItems: "center"
  }
});

export default DoctorCompleteCard;
