import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useFocusEffect } from '@react-navigation/native';

const Message = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  const fetchChats = async () => {
    try {
      const userId1 = auth().currentUser?.uid;
      setCurrentUserId(userId1);
      console.log('Current User ID:', userId1);

      const querySnapshot = await firestore()
        .collection('Chats')
        .where('doctorId', '==', userId1)
        .get();

      // console.log('Number of chats fetched:', querySnapshot.size);

      const fetchedChats = [];
      for (const doc of querySnapshot.docs) {
        const chatData = doc.data();
        // console.log('Chat data:', chatData);

        const doctorId = chatData.doctorId;
        const userId = chatData.userId;

        // console.log('Doctor ID:', doctorId);
        // console.log('User ID:', userId);

        const doctorSnapshot = await firestore()
          .collection('Doctor')
          .doc(doctorId)
          .get();
        const userSnapshot = await firestore()
          .collection('User')
          .doc(userId)
          .get();

        if (doctorSnapshot.exists && userSnapshot.exists) {
          const doctorData = doctorSnapshot.data();
          const userData = userSnapshot.data();
          // console.log('Doctor data:', doctorData);
          // console.log('User data:', userData);

          const mergedChat = {
            id: doc.id,
            ...chatData,
            doctor: doctorData,
            user: userData,
          };
          fetchedChats.push(mergedChat);
        } else {
          if (!doctorSnapshot.exists) {
            console.error('Doctor data not found for ID:', doctorId);
          }
          if (!userSnapshot.exists) {
            console.error('User data not found for ID:', userId);
          }
        }
      }
      setChats(fetchedChats);
      // console.log('Merged data:', fetchedChats);
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

 

  
  useFocusEffect(
    useCallback(() => {
      fetchChats();
    }, [])
  );

  const openChat = (chat) => {
    navigation.navigate('UserMessages', { chat });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>
        To start a new chat, go to booked services. You can only chat with the service provider whose service you have booked.
      </Text>
      {chats.length > 0 ? (
        chats.map((chat) => (
          <TouchableOpacity key={chat.id} onPress={() => openChat(chat)}>
            <View style={styles.chatItem}>
              <Image 
                source={{ uri: chat.doctor.id === currentUserId ? chat.user.profileImage : chat.doctor.profileImage }} 
                style={styles.profileImage} 
              />
              <View style={styles.chatInfo}>
                <Text style={styles.chatName}>
                  {chat.doctor.id === currentUserId ? chat.user.Name : chat.doctor.Name}
                </Text>
                <Text style={styles.chatDetails}>
                  {chat.doctor.id === currentUserId ? 'Patient' : 'Doctor'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.noChatsText}>No chats available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  instructions: {
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#f2f2f2',
    marginBottom: 10,
  },
  chatItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  chatInfo: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  chatDetails: {
    fontSize: 14,
    color: '#777',
  },
  noChatsText: {
    textAlign: 'center',
    padding: 10,
    color: '#777',
  },
});

export default Message;
