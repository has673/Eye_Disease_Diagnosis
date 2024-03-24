import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import DoctorCard from '../../../components/DoctorCard'; // Import DoctorCard component
import firestore from '@react-native-firebase/firestore';
import { StackActions } from '@react-navigation/native';


const AllDoctor = ({ navigation }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Doctor')
      .onSnapshot((snapshot) => {
        const doctorList = [];
        snapshot.forEach((doc) => {
          const { Name, city,Clinic, profileImage } = doc.data();
          doctorList.push({
            id: doc.id,
            Name,
            city,
            Clinic,
            profileImage ,
            Address,
          });
        });
        setDoctors(doctorList);
        setLoading(false); // Set loading to false when data is fetched
        console.log(doctorList);
      });

    return () => unsubscribe();
  }, []);

  const handleDoctorPress = (doctorId) => {
    // navigation.navigate('SingleDoctorScreen', { doctorId });
    navigation.dispatch(StackActions.push('Doctor', { doctorId }));
    console.log('single doctor');
  };

  // const renderDoctorItem = ({ item }) => (
  //   <DoctorCard doctor={item} onPress={() => handleDoctorPress(item.id)} />
  // );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.list}>
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} onPress={() => handleDoctorPress(doctor.id)} />
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom:140
  },
});

export default AllDoctor;
