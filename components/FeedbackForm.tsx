import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet , Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const FeedbackForm = ({ appointmentId, doctorId, onSubmit }) => {
    const [stars, setStars] = useState(0);
    const [comment, setComment] = useState('');
    const [previousStars, setPreviousStars] = useState(null);
  
    useEffect(() => {
      const fetchPreviousFeedback = async () => {
        try {
          const snapshot = await firestore()
            .collection('Feedback')
            .where('appointmentId', '==', appointmentId)
            .where('userId', '==', auth().currentUser.uid)
            .get();
  
          if (!snapshot.empty) {
            const feedbackData = snapshot.docs[0].data();
            setPreviousStars(feedbackData.stars);
            setStars(feedbackData.stars);
            setComment(feedbackData.comment);
          }
        } catch (error) {
          console.error('Error fetching previous feedback:', error.message);
        }
      };
  
      fetchPreviousFeedback();
    }, []);
  
    const handleSubmit = async () => {
      if (stars === 0) {
        alert('Please provide a star rating');
        return;
      }
  
      try {
        await firestore().collection('Feedback').add({
          appointmentId,
          doctorId,
          userId: auth().currentUser.uid,
          stars,
          comment,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
  
        onSubmit();
      } catch (error) {
        console.error('Error submitting feedback:', error.message);
      }
    };
  
    return (
      <View style={styles.container}>
        {previousStars && (
          <Text style={styles.label}>Your previous rating: {previousStars} stars</Text>
        )}
        <Text style={styles.label}>Rate your appointment:</Text>
        {[1, 2, 3, 4, 5].map(star => (
          <Text
            key={star}
            style={star <= stars ? styles.starSelected : styles.star}
            onPress={() => setStars(star)}
          >
            ★
          </Text>
        ))}
        <TextInput
          style={styles.input}
          placeholder="Leave a comment"
          value={comment}
          onChangeText={setComment}
        />
        <Button title="Submit Feedback" onPress={handleSubmit} />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      marginVertical: 10,
    },
    label: {
      fontSize: 16,
      marginBottom: 5,
    },
    star: {
      fontSize: 30,
      color: '#ccc',
      marginHorizontal: 5,
    },
    starSelected: {
      fontSize: 30,
      color: '#FFD700',
      marginHorizontal: 5,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
  });
  
  export default FeedbackForm;