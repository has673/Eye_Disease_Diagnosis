import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, Text, Image, TouchableOpacity, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import StarRating from 'react-native-star-rating';

const SingleDoctorScreen = ({ route }) => {
  const { doctorId } = route.params;
  const [doctorData, setDoctorData] = useState(null);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bookingAppointment, setBookingAppointment] = useState(false); // State to control the visibility of the activity indicator

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
          setUserData(fetchedData || {});
          setLoading(false);
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
      
      setBookingAppointment(true); // Show activity indicator while booking appointment

      const appointmentDateTime = new Date(selectedDate);
      const appointmentTimestamp = firestore.Timestamp.fromDate(appointmentDateTime);
      const doctorName = doctorData && doctorData.Name ? doctorData.Name : 'Unknown Doctor';

      const appointmentRef = firestore().collection('Appointments').doc(`${currentUser.uid}_${doctorId}`);
      
      await appointmentRef.set({
        doctorId: doctorId,
        DoctorName: doctorName,
        appointmentDate: appointmentTimestamp,
        userId: currentUser.uid,
        PatientName: userData.Name,
        Clinic: doctorData?.Clinic,
        Address: doctorData?.Address,
        Status: 'unconfirmed',
        Done: false,
      });

      const chatId = `${currentUser.uid}_${doctorId}`;
      const newMsg = {
        id: Date.now().toString(),
        text: "Appointment Booked",
        from: currentUser.uid,
        fromMe: false,
      };

      const messagesRef = firestore().collection('Chats').doc(chatId);
      await messagesRef.set({
        doctorId: doctorId,
        userId: currentUser.uid,
        messages: [newMsg]
      });

      setBookingAppointment(false); // Hide activity indicator after booking appointment
      Alert.alert(
        'Appointment Booked Successfully',
        '',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home'), // Navigate to Home screen
          },
        ]
      );
    } catch (error) {
      console.error('Error booking appointment:', error);
      Alert.alert('Failed to book appointment. Please try again.');
      setBookingAppointment(false); // Hide activity indicator in case of error
    }
  };

  const calculateAverageRating = () => {
    if (!doctorData || !doctorData.feedbacks || doctorData.feedbacks.length === 0) {
      return 0; // If no feedbacks or doctor data available, return 0 rating
    }

    const totalRating = doctorData.feedbacks.reduce((accumulator, feedback) => accumulator + feedback.rating, 0);
    return totalRating / doctorData.feedbacks.length; // Calculate average rating
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.doctorContainer}>
        {loading ? (
          <ActivityIndicator style={styles.spinner} size="large" color="#0000ff" />
        ) : (
          <>
            <Image
              source={{ uri: doctorData && doctorData.profileImage ? doctorData.profileImage : 'https://via.placeholder.com/150' }}
              style={styles.image}
            />
            <StarRating
              disabled={true}
              maxStars={5}
              rating={calculateAverageRating()} // Use the calculated average rating here
              starSize={24}
              fullStarColor="#FFD700"
              emptyStarColor="#D3D3D3"
            />
          </>
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

            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>{doctorData.Address}</Text>

            <Text style={styles.label}>MBBS:</Text>
            <Text style={styles.value}>{doctorData.MBBS}</Text>

            <Text style={styles.label}>Date of Graduation:</Text>
            <Text style={styles.value}>{doctorData.dateOfGraduation}</Text>

            <Text style={styles.label}>Date of Specialization:</Text>
            <Text style={styles.value}>{doctorData.dateOfSpecialization}</Text>

            <TouchableOpacity style={styles.button} onPress={showDatePicker} disabled={bookingAppointment}>
              {bookingAppointment ? ( // If booking is in progress, display the loader
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>Book Appointment</Text>
              )}
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
  ActivityIndicatorContainer:{
    color:'blue'
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
