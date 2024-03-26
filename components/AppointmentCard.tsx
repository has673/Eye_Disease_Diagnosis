import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { format } from 'date-fns';

const AppointmentCard = ({ appointment, onCancel }) => {
  // const formattedDate = format(new Date(appointment.appointmentDate), 'EEEE, MMMM d, yyyy');
  // const formattedTime = format(new Date(appointment.appointmentDate), 'h:mm a');
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <View style={styles.inner}>
          <Text style={styles.text}>{`Doctor Name: ${appointment.DoctorName}`}</Text>
          <Text style={styles.text}>{`Appointment Date: ${appointment.appointmentDate}`}</Text>
          {/* <Text style={styles.text}>{`Appointment Time: ${formattedTime}`}</Text> */}
          <Text style={styles.textclinic}>{`Clinic: ${appointment.Clinic}`}</Text>
          <Text style={styles.text}>{`Address: ${appointment.Address}`}</Text>
        </View>
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
    marginBottom: 450,
  },
  card: {
    backgroundColor: '#629FFA',
    borderRadius: 18,
    padding: 10,
    width: 250,
    height: 200,

  },
  text: {
    color: '#FFFFFF',
    marginBottom: 10,
    fontWeight: "bold"
  },
  textclinic: {
    color: '#FFFFFF',
    marginBottom: 10,
    marginRight: 75,
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

export default AppointmentCard;
