import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
 // Importing an icon from @expo/vector-icons
 import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DiseaseCard = ({ name, icon, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.content}>
        <MaterialCommunityIcons name={icon} size={24} color="white" style={styles.icon} />
        <Text style={styles.name}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: '#629FFA',
    height: 100,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin:5
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 5,
  },
  name: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#fff',
  },
  text: {
    fontSize: 16,
    color: '#fff',
  },
});

export default DiseaseCard;
