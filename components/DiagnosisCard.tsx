/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import { format } from 'date-fns';

const DiagnosisCard = ({ diagnosis}) => {
//   const Date = diagnosis.date.toDate();
  
//   // // Format date to a human-readable string
//   const formattedDate = Date.toLocaleString();
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <View style={styles.inner}>
          <Text style={styles.text}>{`Result: ${diagnosis.Severity}`}</Text>
          <Text style={styles.text}>{`Severity: ${diagnosis.diagnosis}`}</Text>
          {/* <Text style={styles.text}>{`Appointment Date: ${appointment.appointmentDate}`}</Text> */}
          {/* <Text style={styles.text}>{`Appointment Time: ${formattedTime}`}</Text> */}
      
          {/* <Text style={styles.text}>{`Date: ${formattedDate}`}</Text> */}
        
          
        </View>
        

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    marginBottom:25

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

  textname: {
    color: '#FFFFFF',
    marginBottom: 7,
    textAlign:'left',
    fontWeight: "bold",
  },


  
  inner: {
    alignItems: "center"
  }
});

export default DiagnosisCard;
