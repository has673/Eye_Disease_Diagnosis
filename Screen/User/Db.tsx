import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

const Db = () => {
  const [val, setVal] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const documentSnapshot = await firestore()
        .collection('Users')
        .doc('UcYzFhvOOgkIbaVJ31JS')
        .get();

      const data = documentSnapshot.data();

      if (data) {
        console.log(data);
        setVal(data);
      } else {
        console.log('Document not found');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View>
      <Text>Db</Text>
      {val && (
        <View>
          <Text>Data from Firestore:</Text>
          <Text>Name: {val.Name}</Text>
          <Text>Email: {val.Email}</Text>
          {/* Add more fields as needed */}
        </View>
      )}
    </View>
  );
};

export default Db;
