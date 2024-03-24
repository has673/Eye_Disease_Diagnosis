// import React, { useState, useEffect } from 'react';
// import { View, ScrollView, StyleSheet, ActivityIndicator, Text } from 'react-native';
// import firestore from '@react-native-firebase/firestore';

// const SingleDoctorScreen = ({ route }) => {
//   const { doctorId } = route.params;
//   const [doctorData, setDoctorData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = firestore()
//       .collection('Doctor')
//       .doc(doctorId)
//       .onSnapshot((snapshot) => {
//         const doctor = snapshot.data();
//         setDoctorData(doctor);
//         setLoading(false); // Set loading to false when data is fetched
//       });

//     return () => unsubscribe();
//   }, [doctorId]);

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {loading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : doctorData ? (
//         <View style={styles.doctorDetails}>
//           <Text style={styles.label}>Name:</Text>
//           <Text style={styles.value}>{doctorData.Name}</Text>

//           <Text style={styles.label}>City:</Text>
//           <Text style={styles.value}>{doctorData.city}</Text>

//           <Text style={styles.label}>Clinic:</Text>
//           <Text style={styles.value}>{doctorData.Clinic}</Text>

//           {/* You can add more details as needed */}
//         </View>
//       ) : (
//         <Text>No data available for this doctor.</Text>
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: '#FFFFFF',
//     padding: 20,
//   },
//   doctorDetails: {
//     paddingBottom: 20,
//   },
//   label: {
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   value: {
//     marginBottom: 10,
//   },
// });

// export default SingleDoctorScreen;
import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, Text, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const SingleDoctorScreen = ({ route }) => {
  const { doctorId } = route.params;
  const [doctorData, setDoctorData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Doctor')
      .doc(doctorId)
      .onSnapshot((snapshot) => {
        const doctor = snapshot.data();
        setDoctorData(doctor);
        setLoading(false); // Set loading to false when data is fetched
      });

    return () => unsubscribe();
  }, [doctorId]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.doctorContainer}>
        {loading ? (
          <ActivityIndicator style={styles.spinner} size="large" color="#0000ff" />
        ) : (
          <Image
            source={{ uri: doctorData && doctorData.profileImage ? doctorData.profileImage : 'https://via.placeholder.com/150' }}
            style={styles.image}
          />
        )}
      </View>
      <View style={styles.detailsContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#629FFA" />
        ) : doctorData ? (
          <View style={styles.doctorDetails}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{doctorData.Name}</Text>

            <Text style={styles.label}>City:</Text>
            <Text style={styles.value}>{doctorData.city}</Text>

            <Text style={styles.label}>Clinic:</Text>
            <Text style={styles.value}>{doctorData.Clinic}</Text>

            {/* You can add more details as needed */}
          </View>
        ) : (
          <Text>No data available for this doctor.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  doctorContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  spinner: {
    marginTop: 50, // Adjust the margin as needed
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75, // Make it circular by setting half of the width and height as borderRadius
  },
  detailsContainer: {
    flex: 1,
  },
  doctorDetails: {
    paddingBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    marginBottom: 10,
  },
});

export default SingleDoctorScreen;
