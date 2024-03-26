import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { format } from 'date-fns';

const DocAppointmentCard = ({ appointment, onCancel , onAccept }) => {
    // const formattedDate = format(new Date(appointment.appointmentDate), 'EEEE, MMMM d, yyyy');
    // const formattedTime = format(new Date(appointment.appointmentDate), 'h:mm a');
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <View  style={styles.inner}>
        <Text style={styles.text}>{`Patient Name: ${appointment.PatientName}`}</Text>
        <Text style={styles.textdate}>{`Appointment Date: ${appointment.appointmentDate}`}</Text>
        </View>
        {/* <Text style={styles.text}>{`Appointment Time: ${formattedTime}`}</Text> */}
        {/* <Text style={styles.text}>{`Address: ${appointment.Clinic}`}</Text>
        <Text style={styles.text}>{`Address: ${appointment.Address}`}</Text> */}
        <View style={styles.row}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => onCancel(appointment.id)}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={() => onAccept(appointment.id)}>
          <Text style={styles.cancelButtonText}>Accept</Text>
        </TouchableOpacity>
        </View>
       
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
  textdate: {
    color: '#FFFFFF',
    marginBottom: 10,
    marginRight:15,
  },
  row:{
    flexDirection:'row',
    justifyContent:'center'
  },
  cancelButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    width:100,
    justifyContent:'center',
    marginRight:10
    

  },
  
  cancelButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    
  },
  inner:{
    alignItems:"center"
  }
});

export default DocAppointmentCard;
