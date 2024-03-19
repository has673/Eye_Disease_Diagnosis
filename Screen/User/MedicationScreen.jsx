import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Button, FlatList, Text } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome5';

const MedicineScreen = () => {
  const [medicineName, setMedicineName] = useState('');
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [medications, setMedications] = useState([]);

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleDateConfirm = (date) => {
    hideDatePicker();
    setSelectedDate(date);
  };

  const createNotification = () => {
    console.log(selectedDate, 'Alarm date');

    // Clear the medicine name input
    setMedicineName('');
  };

  // Render each medication item in the FlatList
  const renderItem = ({ item }) => (
    <View style={{ padding: 10, borderWidth: 1, borderColor: '#ccc', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
      <View>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>{item.medicineName}</Text>
        <Text style={{ fontSize: 15, color: 'black' }}>{new Date(item.medicineTime).toLocaleString()}</Text>
      </View>
      <TouchableOpacity>
        <Icon name='eraser' size={25} color='black' />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.mainView}>
      <View style={styles.box2}>
        <TextInput style={styles.input2}
          placeholder="Enter medicine name"
          value={medicineName}
          onChangeText={setMedicineName}
          placeholderTextColor={'black'}
        />
      </View>

      <TouchableOpacity style={styles.selectDate} onPress={showDatePicker}>
        <Text style={{ color: 'white' }}>Select Date</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />

      <TouchableOpacity style={styles.createNotification} onPress={createNotification}>
        <Text style={{ color: 'white' }}>Create Notification</Text>
      </TouchableOpacity>

      {/* Medications FlatList */}
      <FlatList
        data={medications}
        renderItem={renderItem}
        keyExtractor={(item) => item.medicineTime}
      />
    </View>
  );
};

export default MedicineScreen;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input2: {
    color: 'black',
    textAlign: 'center',
  },
  box2: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    height: 54,
    width: 360,
    borderRadius: 14,
    marginTop: 35,
    backgroundColor: '#629FFA',
    textAlign: 'center',
    marginLeft: 8
  },
  selectDate: {
    backgroundColor: '#629FFA',
    width: 304,
    height: 54,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  createNotification: {
    backgroundColor: '#629FFA',
    width: 304,
    height: 54,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
});
