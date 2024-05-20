import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const DiagnosisCard = ({ diagnosis,onPress }) => {
  let diagnosisText = diagnosis.diagnosis;

  // Adjust the diagnosis text for better readability
  if (diagnosisText.includes('Diabetic Retinopathy Symptoms Present')) {
    diagnosisText = 'Diabetic Retinopathy';
  }
  if (diagnosisText.includes('Normal Retina')) {
    diagnosisText = 'Normal Retina';
  }

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity style={styles.card} onPress={() => onPress(diagnosis)}>
        <View style={styles.inner}>
          <Text style={styles.text}>{`Severity: ${diagnosis.severity}`}</Text>
          <Text style={styles.text}>{`Result: ${diagnosisText}`}</Text>
          <Text style={styles.text}>{`Date: ${diagnosis.date}`}</Text>
          <Text style={styles.text}>{`Time: ${diagnosis.time}`}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    marginBottom: 25
  },
  card: {
    backgroundColor: '#629FFA',
    borderRadius: 18,
    padding: 10,
    width: 250,
    height: 120
  },
  text: {
    color: '#FFFFFF',
    marginBottom: 10,
    fontWeight: 'bold'
  },
  inner: {
    alignItems: 'center'
  }
});

export default DiagnosisCard;
