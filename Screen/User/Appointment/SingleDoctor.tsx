import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, Text, Image, TouchableOpacity, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import auth from '@react-native-firebase/auth';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation} from '@react-navigation/native';
const SingleDoctorScreen = ({ route }) => {
  const { doctorId } = route.params;
  const [doctorData, setDoctorData] = useState(null);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const navigation = useNavigation()
  const [selectedDate, setSelectedDate] = useState(new Date());

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleDateConfirm = (date) => {
    hideDatePicker();
    setSelectedDate(date);
    bookAppointment();
  };

  const getUser = async () => {
    try {
      const currentUser = auth().currentUser;
      if (currentUser) {
        const documentSnapshot = await firestore().collection('User').doc(currentUser.uid).get();
        if (documentSnapshot.exists) {
          const fetchedData = documentSnapshot.data();
          console.log('User Data', fetchedData);
          setUserData(fetchedData || {});
          setLoading(false);
          console.log('profile');
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = firestore().collection('Doctor').doc(doctorId).onSnapshot(snapshot => {
      const doctor = snapshot.data();
      setDoctorData(doctor);
      setLoading(false); // Set loading to false when data is fetched
    });

    getUser();

    return () => unsubscribe();
  }, [doctorId]);

  const bookAppointment = async () => {
    try {
      const currentUser = auth().currentUser; // Get the current user
      if (!currentUser) {
        throw new Error('User not authenticated');
      }
  
      // Assuming you have a collection named 'Appointments' in Firestore
      const appointmentDateTime = new Date(selectedDate);
      const appointmentTimestamp = firestore.Timestamp.fromDate(appointmentDateTime);
      const doctorName = doctorData && doctorData.Name ? doctorData.Name : 'Unknown Doctor';
      
      // Use currentUser.uid_doctorId as the document ID
      const appointmentRef = firestore().collection('Appointments').doc(`${currentUser.uid}_${doctorId}`);
      
      await appointmentRef.set({
        doctorId: doctorId,
        DoctorName: doctorName,
        appointmentDate: appointmentTimestamp, // Convert date to ISO string for storage
        userId: currentUser.uid, // Add the user ID
        PatientName: userData.Name, // Add the username
        Clinic: doctorData?.Clinic,
        Address: doctorData?.Address,
        Status: 'unconfirmed',
        Done: false,
      });
  
      const chatId = `${currentUser.uid}_${doctorId}`; // Corrected chatId syntax
      const newMsg = {
        id: Date.now().toString(), // Use a unique id based on timestamp
        text: "Appointment Booked", // Placeholder text
        from: currentUser.uid,
        fromMe: false,
      };
  
      // Create an object of messages under the document ID chatId
      const messagesRef = firestore().collection('Chats').doc(chatId);
      await messagesRef.set({
        doctorId: doctorId,
        userId: currentUser.uid,
        messages: [newMsg] // Include the new message in the messages array
      });
  
      console.log ('chat created')
      Alert.alert('Appointment Booked Successfully');
      // navigation.navigate('messages');
    } catch (error) {
      console.error('Error booking appointment:', error);
      Alert.alert('Failed to book appointment. Please try again.');
    }
  };
  

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
           {/* <Entypo name='chat' size={30} style={styles.chat} onPress={()=>{
         navigation.navigate('UserMessages');

           }}/> */}
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{doctorData.Name}</Text>

            <Text style={styles.label}>City:</Text>
            <Text style={styles.value}>{doctorData.city}</Text>

            <Text style={styles.label}>Clinic:</Text>
            <Text style={styles.value}>{doctorData.Clinic}</Text>

            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>{doctorData.Address}</Text>

            <Text style={styles.label}>MBBS:</Text>
            <Text style={styles.value}>{doctorData.MBBS}</Text>

            <Text style={styles.label}>Date of Graduation:</Text>
            <Text style={styles.value}>{doctorData.dateOfGraduation}</Text>

            <Text style={styles.label}>Date of Specialization:</Text>
            <Text style={styles.value}>{doctorData.dateOfSpecialization}</Text>

            <TouchableOpacity style={styles.button} onPress={showDatePicker}>
              <Text style={styles.buttonText}>Book Appointment</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="datetime"
              onConfirm={handleDateConfirm}
              onCancel={hideDatePicker}
            />
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
    marginTop: 50,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  chat:{
    alignSelf:'center'
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
  button: {
    backgroundColor: '#629FFA',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 10,
    width: 170,
    alignSelf: 'center',
    textAlign: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default SingleDoctorScreen;
