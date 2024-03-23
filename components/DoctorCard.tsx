import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const DoctorCard = ({ doctor, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={() => onPress(doctor)}>
        <Image source={{ uri: doctor.profileImage }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name}>{doctor.Name}</Text>
          <Text style={styles.institute}>{doctor.institute}</Text>
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
    borderRadius: 10,
    height: 130,
    width: 300,
  },
  image: {
    width: 90,
    height: 60,
    borderRadius: 25,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FFFFFF',
    textAlign:'justify'
  },
  institute: {
    fontSize: 14,
    color: '#FFFFFF',
  },
});

export default DoctorCard;
