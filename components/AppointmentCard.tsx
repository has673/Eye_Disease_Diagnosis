import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { format } from 'date-fns';

const AppointmentCard = ({ appointment, onCancel }) => {
    // const formattedDate = format(new Date(appointment.appointmentDate), 'EEEE, MMMM d, yyyy');
    // const formattedTime = format(new Date(appointment.appointmentDate), 'h:mm a');
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Text style={styles.text}>{`Doctor Name: ${appointment.DoctorName}`}</Text>
        <Text style={styles.text}>{`Appointment Date: ${appointment.appointmentDate}`}</Text>
        {/* <Text style={styles.text}>{`Appointment Time: ${formattedTime}`}</Text> */}
        <Text style={styles.text}>{`Address: ${appointment.Clinic}`}</Text>
        <Text style={styles.text}>{`Address: ${appointment.Address}`}</Text>
        <TouchableOpacity style={styles.cancelButton} onPress={() => onCancel(appointment.id)}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
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
    borderRadius: 10,
    padding: 20,
    width: 300,
  },
  text: {
    color: '#FFFFFF',
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default AppointmentCard;
