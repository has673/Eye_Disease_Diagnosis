import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { format } from 'date-fns';

const DoneAppointmentCard = ({ appointment, onDone}) => {
    // const formattedDate = format(new Date(appointment.appointmentDate), 'EEEE, MMMM d, yyyy');
    // const formattedTime = format(new Date(appointment.appointmentDate), 'h:mm a');
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Text style={styles.text}>{`Patient Name: ${appointment.PatientName}`}</Text>
        <Text style={styles.text}>{`Appointment Date: ${appointment.appointmentDate}`}</Text>
        {/* <Text style={styles.text}>{`Appointment Time: ${formattedTime}`}</Text> */}
        {/* <Text style={styles.text}>{`Address: ${appointment.Clinic}`}</Text>
        <Text style={styles.text}>{`Address: ${appointment.Address}`}</Text> */}

        <TouchableOpacity style={styles.cancelButton} onPress={() => onDone(appointment.id)}>
          <Text style={styles.cancelButtonText}>Done</Text>
        </TouchableOpacity>
        
      
       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#629FFA',
    borderRadius: 20,
    padding: 10,
    width: 300,
    height:130,
  },
  text: {
    color: '#FFFFFF',
    marginBottom: 10,
  },
  row:{
    flexDirection:'row'
  },
  cancelButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    width:100,
    justifyContent:'center',
    marginRight:10
    

  },
  
  cancelButtonText: {
    color: 'black',
    fontWeight: 'bold',
    
  },
});

export default DoneAppointmentCard;
