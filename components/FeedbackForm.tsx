import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import StarRating from 'react-native-star-rating'; // Assuming you have a star rating component

const FeedbackForm = ({ appointment, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleRatingChange = (rating) => {
    setRating(rating);
  };

  const handleCommentChange = (text) => {
    setComment(text);
  };

  const handleSubmit = () => {
    // Ensure rating is not 0 and comment is not empty before submitting
    if (rating === 0) {
      Alert.alert('Please provide a rating.');
      return;
    }

    if (comment.trim() === '') {
      Alert.alert('Please provide a comment.');
      return;
    }

    // Call onSubmit callback with rating and comment
    onSubmit(rating, comment);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Leave Feedback</Text>
      <StarRating
        maxStars={5}
        rating={rating}
        fullStarColor="#FFD700"
        emptyStarColor="#D3D3D3"
        selectedStar={(rating) => handleRatingChange(rating)}
      />
      <TextInput
        style={styles.commentInput}
        multiline
        placeholder="Leave your comment here..."
        value={comment}
        onChangeText={(text) => handleCommentChange(text)}
      />
      <TouchableOpacity  style={styles.button}onPress={handleSubmit} ><Text style={styles.txt}>Submit</Text></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button:{
    backgroundColor: '#629FFA',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignSelf:'center',
    width:100,
    justifyContent:'center',

  },
  txt:{
  color:'white',
  textAlign:'center',
  },
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    marginHorizontal: 20,
    marginTop: '30%',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    minHeight: 100,
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
  },
});

export default FeedbackForm;
