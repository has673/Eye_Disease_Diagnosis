import React from 'react';
import { View ,Image,Text, StyleSheet, TouchableOpacity} from 'react-native';

function ChartCard({ doctor, onPress }) {
  // Check if the doctor object exists before accessing its properties
  if (!doctor) {
    return null; // or render a placeholder component or message
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Image source={{ uri: doctor.profileImage }} style={styles.image} alt="Doctor" />
        <Text style={styles.name}>{doctor.name}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChartCard;
