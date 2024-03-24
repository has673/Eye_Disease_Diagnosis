import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const DoctorCard = ({ doctor, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={() => onPress(doctor)}>
        <Image source={{ uri: doctor.profileImage }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name}>{doctor.Name}</Text>
          <Text style={styles.institute}>{doctor.city}</Text>
          <Text style={styles.institute}>{doctor.Clinic}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', // Center the card horizontally
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#629FFA',
    borderRadius: 20,
    height: 130,
    width: 300,
   
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 55,
    marginRight: 10,
    borderColor:'white'
  },
  info: {
    flex: 1,
    marginLeft:10
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FFFFFF',
    textAlign:'justify'
  },
  institute: {
    fontSize: 14,
    color: 'white',
  },
});

export default DoctorCard;
