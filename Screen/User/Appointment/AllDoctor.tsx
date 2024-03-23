import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import DoctorCard from '../../../components/DoctorCard'; // Import DoctorCard component
import firestore from '@react-native-firebase/firestore';

const AllDoctor = ({ navigation }) => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Doctor')
      .onSnapshot((snapshot) => {
        const doctorList = [];
        snapshot.forEach((doc) => {
          const { Name, institute, profileImage } = doc.data();
          doctorList.push({
            id: doc.id,
            Name,
            institute,
            profileImage ,
          });
        });
        setDoctors(doctorList);
        console.log(doctorList)
      });

    return () => unsubscribe();
  }, []);

  const handleDoctorPress = (doctorId) => {
    // navigation.navigate('SingleDoctorScreen', { doctorId });
    console.log('new screen')
  };

  const renderDoctorItem = ({ item }) => (
    <DoctorCard doctor={item} onPress={() => handleDoctorPress(item.id)} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={doctors}
        renderItem={renderDoctorItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  list: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
});

export default AllDoctor;
