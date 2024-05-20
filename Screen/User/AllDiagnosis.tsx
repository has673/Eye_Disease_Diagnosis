import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'; 
import DiagnosisCard from '../../components/DiagnosisCard';
import { StackActions } from '@react-navigation/native';

const AllDiagnosis = ({ navigation }) => {
  const [diagnoses, setDiagnoses] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = auth().currentUser?.uid;

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Diagnosis') // Ensure this matches your Firestore collection name
      .where('userId', '==', currentUser)
      .onSnapshot((snapshot) => {
        const diagnosisList = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          diagnosisList.push({ id: doc.id, ...data });
        });
        setDiagnoses(diagnosisList);
        setLoading(false);
      });

    return () => unsubscribe();
  }, [currentUser]);

  const handleDiagnosisPress = (diagnosisId) => {
    navigation.dispatch(StackActions.push('ViewReport', { diagnosisId }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#629FFA" />
      ) : (
        <View>
          {diagnoses.length > 0 ? (
            diagnoses.map((diagnosis) => (
              <DiagnosisCard key={diagnosis.id} diagnosis={diagnosis} onPress={() => handleDiagnosisPress(diagnosis.id)} />
            ))
          ) : (
            <Text style={styles.text}>No Diagnosis Made.</Text>
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  text: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default AllDiagnosis;
