import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DiagnosisCard = ({ diagnosis }) => {
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
      <View style={styles.card}>
        <View style={styles.inner}>
          <Text style={styles.text}>{`Result: ${diagnosis.severity}`}</Text>
          <Text style={styles.text}>{`Severity: ${diagnosisText}`}</Text>
        </View>
      </View>
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
