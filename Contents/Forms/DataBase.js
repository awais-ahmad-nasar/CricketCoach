import React, {useEffect, useState} from 'react';
import {FlatList, Text, TextInput, View} from 'react-native';
import {Button} from 'react-native-paper';
import {openDatabase} from 'react-native-sqlite-storage';

const DBConnectivity = () => {
  const [ID, setID] = useState('');
  const [name, setName] = useState('');
  const [allPersons, setAllPersons] = useState([]);

  const db = openDatabase({name: 'myDB.db'});

  const createTable = () => {
    db.transaction(txn => {
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS Person (ID INTEGER PRIMARY KEY, pName TEXT)',
        [],
        (sqltxn, res) => {
          console.log('Table Created Successfully');
        },
        error => {
          console.log('Error Message\t' + error.message);
        },
      );
    });
  };

  const insertData = () => {
    if (!ID || !name) {
      console.log('Both ID and Name are required');
      return;
    }
    db.transaction(txn => {
      txn.executeSql(
        'INSERT INTO Person (ID, pName) VALUES (?, ?)',
        [parseInt(ID), name],
        (t, res) => {
          console.log('Data Inserted Successfully');
          setID('');
          setName('');
        },
        error => {
          console.log(error.message);
        },
      );
    });
  };

  const getAllData = () => {
    console.log('Fetching All Data');
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM Person',
        [],
        (txn, res) => {
          const tempAllPerson = [];
          for (let i = 0; i < res.rows.length; i++) {
            const p = {ID: res.rows.item(i).ID, pName: res.rows.item(i).pName};
            tempAllPerson.push(p);
          }
          setAllPersons(tempAllPerson);
          console.log(tempAllPerson);
        },
        error => {
          console.log('Error while fetching data: ' + error.message);
        },
      );
    });
  };

  const getDataByID = () => {
    if (!ID) {
      console.log('ID is required');
      return;
    }
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM Person WHERE ID = ?',
        [parseInt(ID)],
        (t, res) => {
          if (res.rows.length > 0) {
            const person = res.rows.item(0);
            setName(person.pName);
            console.log(person);
          } else {
            console.log('No record found with ID: ' + ID);
            setName('');
          }
        },
        error => {
          console.log('Error while fetching data by ID: ' + error.message);
        },
      );
    });
  };

  useEffect(createTable, []);

  return (
    <View style={{flex: 1}}>
      <TextInput
        onChangeText={text => setID(text)}
        placeholder="Enter ID"
        value={ID?.toString()}
        style={{borderWidth: 1, borderRadius: 10, margin: 10, fontSize: 20}}
        keyboardType="numeric"
      />
      <TextInput
        onChangeText={text => setName(text)}
        placeholder="Enter Name"
        value={name}
        style={{borderWidth: 1, borderRadius: 10, margin: 10, fontSize: 20}}
      />
      <Button
        onPress={insertData}
        mode="contained"
        style={{
          borderRadius: 10,
          margin: 10,
          width: '40%',
          alignSelf: 'center',
        }}>
        Add Data
      </Button>
      <Button
        onPress={getDataByID}
        mode="contained"
        style={{
          borderRadius: 10,
          margin: 10,
          width: '40%',
          alignSelf: 'center',
        }}>
        Show By ID
      </Button>
      <Button
        onPress={getAllData}
        mode="contained"
        style={{
          borderRadius: 10,
          margin: 10,
          width: '40%',
          alignSelf: 'center',
        }}>
        Show All
      </Button>
      <FlatList
        data={allPersons}
        keyExtractor={(item, index) => item.ID.toString()}
        renderItem={({item}) => (
          <Text style={{fontSize: 18, margin: 5}}>
            {item.ID}: {item.pName}
          </Text>
        )}
      />
    </View>
  );
};

export default DBConnectivity;
