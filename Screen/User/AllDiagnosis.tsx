/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import { View, ScrollView, StyleSheet, ActivityIndicator, Text,  Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import auth from '@react-native-firebase/auth'; 
import DiagnosisCard from '../../components/DiagnosisCard';
import { useState , useEffect } from 'react';


const AllDiagnosis = () => {
  const [diagnosises, setDiagnosises] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUser = auth().currentUser?.uid;
  console.log(currentUser)

  

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('diagnosis')
      .where('userId', '==', currentUser) 
     
      .onSnapshot((snapshot) => {
        const diagnosisList = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          diagnosisList.push({ id: doc.id, ...data });
        });
        setDiagnosises( diagnosisList);
        setLoading(false);
      });

    return () => unsubscribe();
  }, [currentUser]); // Trigger effect whenever currentUser changes



 
  return (
    <ScrollView contentContainerStyle={styles.container}>
  {loading ? (
    <ActivityIndicator size="large" color="#629FFA" />
  ) : (
    <View>
      {diagnosises.length > 0 ? (
        <View>
          {diagnosises.map((diagnosis) => (
            // eslint-disable-next-line no-trailing-spaces
            <DiagnosisCard key={diagnosis.id} diagnosis={diagnosis} />   
          ))}
        </View>
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
  cancelButton: {
    marginTop: 10,
    backgroundColor: 'red',
  },
  text:{
    textAlign:'center'
  }
});

export default AllDiagnosis;