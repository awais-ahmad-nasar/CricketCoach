import React, {useState} from 'react';
import {
  View,
  Button,
  FlatList,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';

const CarSearchApp = () => {
  const [StartPrice, SetStartPrice] = useState('');
  const [EndPrice, SetEndPrice] = useState('');
  const [filteredCars, SetFilteredCars] = useState([]);

  const cars = [
    {company: 'Honda', series: 'Mehran', model: '2021', price: 20000},
    {company: 'Toyota', series: 'Corolla', model: '2020', price: 25000},
    {company: 'Suzuki', series: 'Alto', model: '2019', price: 15000},
    {company: 'Hyundai', series: 'Elantra', model: '2022', price: 30000},
    {company: 'Kia', series: 'Sportage', model: '2023', price: 40000},
    {company: 'Ford', series: 'Focus', model: '2018', price: 22000},
    {company: 'BMW', series: 'X5', model: '2021', price: 60000},
    {company: 'Mercedes', series: 'C-Class', model: '2022', price: 55000},
    {company: 'Nissan', series: 'Altima', model: '2017', price: 20000},
    {company: 'Chevrolet', series: 'Cruze', model: '2020', price: 21000},
  ];

  // Function to filter cars based on price range
  const DisplayFilterData = () => {
    const start = parseInt(StartPrice) || 0; // Default to 0 if empty
    const end = parseInt(EndPrice) || Infinity; // Default to Infinity if empty

    const result = cars.filter(car => car.price >= start && car.price <= end);
    SetFilteredCars(result);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>

      <Text style={styles.title}>Provide Amount Range</Text>

      {/* Input fields for Start Price and End Price in the same line */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Start</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={StartPrice}
            onChangeText={SetStartPrice}
            placeholder="Enter start price"
          />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>End</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={EndPrice}
            onChangeText={SetEndPrice}
            placeholder="Enter end price"
          />
        </View>
      </View>

      {/* Search Button */}
      <View style={styles.buttonContainer}>
        <Button onPress={DisplayFilterData} title="Search" />
      </View>

      {/* Display Filtered Cars */}
      <FlatList
        data={filteredCars}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.carItem}>
            <Text style={styles.carText}>Company: {item.company}</Text>
            <Text style={styles.carText}>Series: {item.series}</Text>
            <Text style={styles.carText}>Model: {item.model}</Text>
            <Text style={styles.carText}>Price: ${item.price}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 20,
  },
  header: {
    backgroundColor: 'grey',
    height: '20%',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  inputContainer: {
    flexDirection: 'row', // Ensures inputs are in the same row
    justifyContent: 'space-between', // Adds space between the inputs
    margin: 20,
    alignItems: 'center',
  },
  inputWrapper: {
    flex: 1, // Allows both inputs to take equal space
    marginHorizontal: 5, // Adds space between the inputs
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    height: 40,
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: 16,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  carItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    borderRadius: 5,
  },
  carText: {
    fontSize: 18,
  },
});

export default CarSearchApp;
