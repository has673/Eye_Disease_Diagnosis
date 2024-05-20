// CompleteAppointments.js
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, ActivityIndicator, ScrollView, Alert, View, Modal } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import UserAppointmentCard from '../../../components/UserAppointmentCard';
import FeedbackForm from '../../../components/FeedbackForm';

const CompleteAppointments = () => {
  console.log("user complete appointments");
  const [userAppointments, setUserAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const currentUser = auth().currentUser;
        if (!currentUser) {
          throw new Error('User not authenticated');
        }

        const snapshot = await firestore()
          .collection('Appointments')
          .where('userId', '==', currentUser.uid)
          .where('Status', '==', 'confirmed')
          .where('Done', '==', true)
          .get();

        const appointments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUserAppointments(appointments);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching appointments:', error.message);
        setLoading(false);
      }
    };

    fetchAppointments();

    // Clean up
    return () => setUserAppointments([]);
  }, []);
  const handleFeedbackSubmit = async (rating, comment) => {
    try {
      const currentUser = auth().currentUser;
      const doctorRef = firestore().collection('Doctor').doc(selectedAppointment?.doctorId);
      const doctorDoc = await doctorRef.get();
  
      if (!doctorDoc.exists) {
        throw new Error('Doctor not found');
      }
  
      const doctorData = doctorDoc.data();
      const existingFeedback = doctorData.feedbacks?.find(feedback => 
        feedback.userId === currentUser.uid && feedback.appointmentId === selectedAppointment?.id
      );
  
      if (existingFeedback) {
        Alert.alert('You have already submitted feedback for this appointment');
        setShowFeedbackForm(false);
        setSelectedAppointment(null);
        return;
      }
  
      const feedback = {
        userId: currentUser?.uid,
        rating,
        comment,
        appointmentId: selectedAppointment?.id,
        createdAt: new Date(),
      };
  
      await doctorRef.update({
        feedbacks: firestore.FieldValue.arrayUnion(feedback),
      });
  
      setShowFeedbackForm(false);
      setSelectedAppointment(null);
      Alert.alert('Feedback Submitted Successfully');
    } catch (error) {
      console.error('Error submitting feedback:', error.message);
      Alert.alert('Failed to submit feedback. Please try again later.');
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <ActivityIndicator style={styles.loadingIndicator} size="large" color="#629FFA" />
      ) : userAppointments.length === 0 ? (
        <Text style={styles.text}>No Appointments History.</Text>
      ) : (
        userAppointments.map(appointment => (
          <View key={appointment.id}>
            <UserAppointmentCard
              appointment={appointment}
              onPressLeaveFeedback={() => {
                setSelectedAppointment(appointment);
                setShowFeedbackForm(true);
              }}
            />
          </View>
        ))
      )}
      {showFeedbackForm && selectedAppointment && (
        <Modal
          visible={showFeedbackForm}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowFeedbackForm(false)}
        >
          <FeedbackForm
            appointment={selectedAppointment}
            onSubmit={(rating, comment) => {
              setShowFeedbackForm(false);
              handleFeedbackSubmit(rating, comment);
            }}
          />
        </Modal>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
  },
  loadingIndicator: {
    marginBottom: 10,
  },
});

export default CompleteAppointments;
