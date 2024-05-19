import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { firebase } from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { ReloadInstructions } from 'react-native/Libraries/NewAppScreen';

const UserMessages = ({ route }) => {
    const doctorId  = route.params.chat.doctor.id;
    const userId =  route.params.chat.user.id;
    const uId = auth().currentUser.uid;
    console.log(uId,'111111111111111')
    console.log (route.params)
    console.log(doctorId)
    console.log('msg screen');
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [doctorData, setDoctorData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMessages = () => {
            // const userId = firebase.auth().currentUser.uid;
            const chatId = `${userId}_${doctorId}`;

            console.log(chatId,'1234')

            // Fetch messages in real-time from Firestore
            const unsubscribe = firebase.firestore().collection('Chats').doc(chatId)
                .onSnapshot(docSnapshot => {
                    if (docSnapshot.exists) {
                        const chatData = docSnapshot.data();
                        setMessages(chatData.messages || []);
                    } else {
                        setMessages([]);
                    }
                }, error => {
                    console.error('Error fetching messages:', error);
                });

            // Cleanup the subscription on unmount
            return () => unsubscribe();
        };

        fetchMessages();
    }, [doctorId]);

    useEffect(() => {
        const unsubscribe = firestore().collection('Doctor').doc(doctorId).onSnapshot(snapshot => {
          const doctor = snapshot.data();
          setDoctorData(doctor);
          setLoading(false); // Set loading to false when data is fetched
        });
    
   
    
        return () => unsubscribe();
      }, [doctorId]);
      const sendMessage = async () => {
        try {
            // Check if the new message is empty
            if (newMessage.trim() === '') return;
    
            const chatId = `${userId}_${doctorId}`;
            const newMsg = {
                id: Date.now().toString(),
                text: newMessage,
                from: userId,
                fromMe: userId === uId ? true : false,
            };
    
            // Get current messages from Firestore
            const chatRef = firebase.firestore().collection('Chats').doc(chatId);
            const chatSnapshot = await chatRef.get();
            const currentMessages = chatSnapshot.exists ? chatSnapshot.data().messages : [];
    
            // Create or update chat in Firestore
            await chatRef.set({
                userId: userId,
                doctorId: doctorId,
                messages: [...currentMessages, newMsg], // Append the new message to the current messages
            }, { merge: true });
    
            // Clear the input field
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };
    
    // const sendMessage = async () => {
    //     try {
            
    //         console.log(uId,'111111111111111')
    //         if (newMessage.trim() === '') return;
    //         // const uId = auth().currentUser.uid;
    //         const chatId = `${userId}_${doctorId}`;
    //         const newMsg = {
    //             id: Date.now().toString(),
    //             text: newMessage,
    //             from: userId,
    //             fromMe: userId === uId ? true : false,
    //         };
            

    //         // Get current messages from Firestore
    //         const chatRef = firebase.firestore().collection('Chats').doc(chatId);
    //         const chatSnapshot = await chatRef.get();

    //         const currentMessages = chatSnapshot.exists ? chatSnapshot.data().messages : [];

    //         // Create or update chat in Firestore
    //         await chatRef.set({
    //             userId: userId,
    //             doctorId: doctorId,
    //             messages: [...currentMessages, newMsg],
    //         }, { merge: true });

    //         // Update the messages state with the new message
    //         setMessages(prevMessages => [...prevMessages, newMsg]);

    //         // Clear the input field
    //         setNewMessage('');
    //     } catch (error) {
    //         console.error('Error sending message:', error);
    //     }
    // };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.doctorContainer}>
                    {loading ? (
                        <ActivityIndicator style={styles.spinner} size="large" color="#0000ff" />
                    ) : (
                        <Image
                        source={{ uri: doctorData && uId === route.params.chat.user.id ? route.params.chat.doctor.profileImage : route.params.chat.user.profileImage }}
                        style={styles.image}
                      />
                      
                    )}
                </View>
                <Text style={styles.chatName}>
  {uId === route.params.chat.user.id ? route.params.chat.doctor.Name : route.params.chat.user.Name}
</Text>


                {/* <Text style={styles.details}>{doctorData?.Clinic}</Text> */}
            </View>
            <ScrollView style={styles.messagesContainer}>
                {messages.map((message, index) => (
                    <View key={`${message.id}-${index}`} style={[styles.messageItem, message.fromMe ? styles.fromMe : styles.fromOther]}>
                        <Text style={styles.messageText}>{message.text}</Text>
                    </View>
                ))}
            </ScrollView>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={newMessage}
                    onChangeText={setNewMessage}
                    placeholder="Type a message..."
                    multiline
                />
                <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    chatName: {
        fontSize: 20,
        fontWeight: 'bold',
        color:"black",
        marginLeft:30,
        marginTop:-80,
    },
    details: {
        fontSize: 15,
      
        color:"black",
        marginLeft:-90,
        marginTop:-15,
        
    },
    messagesContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    messageItem: {
        maxWidth: '80%',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    fromMe: {
        alignSelf: 'flex-end',
        backgroundColor: '#629FFA',
    },
    fromOther: {
        alignSelf: 'flex-start',
        backgroundColor: '#F2F2F2',
    },
    doctorContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    spinner: {
        marginBottom: 10,
    },
    messageText: {
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    input: {
        flex: 1,
        backgroundColor: '#F2F2F2',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginRight: 10,
        maxHeight: 100,
    },
    sendButton: {
        backgroundColor: '#007AFF',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    sendButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default UserMessages;
