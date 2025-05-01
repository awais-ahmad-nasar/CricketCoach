// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
// } from 'react-native';
// import React, {useState} from 'react';
// import {Button, RadioButton} from 'react-native-paper';
// const Parking = () => {
//   const [carBike, setCarBike] = useState(false);
//   const [data, setData] = useState([]);

//   const MyData = {
//     car: [
//       {id: 1, number: '1234'},
//       {id: 2, number: '1235'},
//       {id: 3, number: '1236'},
//     ],
//     bike: [
//       {id: 4, number: '1237'},
//       {id: 5, number: '1238'},
//       {id: 6, number: '1239'},
//     ],
//   };
//   return (
//     <View style={ss.main}>
//       <Text style={ss.headerText}>Car Parking System</Text>
//       <TextInput
//         placeholder="Vehicle Number"
//         placeholderTextColor="black"
//         style={ss.vehicleNumber}
//         onChangeText={setData}></TextInput>

//       {/* View 1 */}
// <View style={ss.row}>
//   <RadioButton
//     value="car"
//     status={carBike ? 'checked' : 'unchecked'}
//     onPress={() => setCarBike(true)}
//   />
//   <Text style={ss.radioText}>Car</Text>
//   <RadioButton
//     value="bike"
//     status={!carBike ? 'checked' : 'unchecked'}
//     onPress={() => setCarBike(false)}
//   />
//   <Text style={ss.radioText}>Bike</Text>

//   <TouchableOpacity
//     style={ss.button}
//     onPress={() => alert('Parking Successful')}>
//     <Text style={ss.buttonText}>Park in</Text>
//   </TouchableOpacity>
// </View>

//       {/* View 2 */}
//       <View style={ss.row}>
//         <TouchableOpacity
//           style={ss.button}
//           onPress={() => alert('Parking Successful')}>
//           <Text style={ss.buttonText2}>All</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={ss.button}
//           onPress={() => alert('Parking Successful')}>
//           <Text style={ss.buttonText2}>Car</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={ss.button}
//           onPress={() => alert('Parking Successful')}>
//           <Text style={ss.buttonText2}>Bike</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={ss.button}
//           onPress={() => alert('Parking Successful')}>
//           <Text style={ss.buttonText2}>All Out</Text>
//         </TouchableOpacity>
//       </View>

//       {/* View 3 */}
//       <View style={ss.row}>
//         <Text style={{fontWeight: 'bold'}}>Total Parked In: </Text>
//         <Text style={{fontWeight: 'bold'}}>Total Earning: </Text>
//       </View>

//       {/* View 4 */}
//       <View>
//         <Text style={{paddingTop: 20, paddingBottom: 10, fontWeight: 'bold'}}>
//           Parking Lot Details
//         </Text>
//         <FlatList data={data} renderItem={MyData} />
//       </View>
//     </View>
//   );
// };

// const ss = StyleSheet.create({
//   main: {
//     flex: 1,
//     backgroundColor: 'white',
//     padding: 10,
//   },
//   headerText: {
//     fontSize: 20,
//     color: 'black',
//     backgroundColor: 'purple',
//     width: '100%',
//     textAlign: 'center',
//     padding: 10,
//   },

//   vehicleNumber: {
//     borderWidth: 1,
//     borderRadius: 5,
//     margin: 10,
//     fontWeight: 'bold',
//     fontFamily: 'Helvet',
//     padding: 10,
//     fontSize: 15,
//     borderColor: 'black',
//     backgroundColor: 'white',
//     textShadowColor: 'black',
//     color: 'black', // jo text krty ho uska color ha mean input ka color
//   },
//   label: {
//     fontSize: 18,
//     marginTop: 15,
//     color: 'black',
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 10,
//     justifyContent: 'space-around',
//   },
//   radioText: {
//     fontSize: 18,
//     marginRight: 20,
//     color: 'black',
//   },
//   buttonText: {
//     fontSize: 18,
//     color: 'purple',
//     fontWeight: 'bold',
//     borderWidth: 1,
//     borderRadius: 20,
//     padding: 10,
//     marginTop: 10,
//     marginLeft: 20,
//     marginRight: 20,
//     marginBottom: 10,
//     borderColor: 'black',
//     backgroundColor: 'grey',
//     textShadowColor: 'black',
//   },
//   buttonText2: {
//     fontSize: 10,
//     color: 'purple',
//     fontWeight: 'bold',
//     borderWidth: 1,
//     borderRadius: 15,
//     padding: 15,
//     marginTop: 1,
//     marginLeft: 20,
//     marginRight: 20,
//     marginBottom: 10,
//     borderColor: 'black',
//     backgroundColor: 'grey',
//     textShadowColor: 'black',
//   },
// });
// export default Parking;

import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const ParkingSystem = () => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [carBike, setCarBike] = useState(true); // True for Car, False for Bike
  const [parkedVehicles, setParkedVehicles] = useState([]);
  const [parkedOutVehicles, setParkedOutVehicles] = useState([]);
  const [filterType, setFilterType] = useState('All');
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalParkedIn, setTotalParkedIn] = useState(0);

  const parkingFee = {Car: 50, Bike: 30};

  // Handle Park In
  const handleParkIn = () => {
    if (vehicleNumber.trim() === '') {
      alert('Please enter a vehicle number.');
      return;
    }
    const newVehicle = {
      id: Date.now(),
      number: vehicleNumber,
      type: carBike ? 'Car' : 'Bike',
    };
    setParkedVehicles([...parkedVehicles, newVehicle]);
    setTotalParkedIn(totalParkedIn + 1);
    setVehicleNumber('');
  };

  // Handle Park Out
  const handleParkOut = id => {
    const vehicleToRemove = parkedVehicles.find(vehicle => vehicle.id === id);
    if (vehicleToRemove) {
      setParkedVehicles(parkedVehicles.filter(vehicle => vehicle.id !== id));
      setParkedOutVehicles([...parkedOutVehicles, vehicleToRemove]);
      setTotalEarnings(totalEarnings + parkingFee[vehicleToRemove.type]);
      setTotalParkedIn(totalParkedIn - 1);
    }
  };

  // Filter Vehicles
  const getFilteredVehicles = () => {
    if (filterType === 'All') return parkedVehicles;
    return parkedVehicles.filter(vehicle => vehicle.type === filterType);
  };

  // Render a single vehicle item
  const renderVehicleItem = ({item}) => (
    <View style={styles.vehicleItem}>
      <Text style={styles.vehicleText}>Number: {item.number}</Text>
      <Text style={styles.vehicleText}>Type: {item.type}</Text>
      <TouchableOpacity
        style={styles.parkOutButton}
        onPress={() => handleParkOut(item.id)}>
        <Text style={styles.parkOutButtonText}>Park Out</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Parking System</Text>

      {/* Vehicle Input Section */}
      <TextInput
        style={styles.input}
        placeholder="Enter Vehicle Number"
        placeholderTextColor="#aaa"
        value={vehicleNumber}
        onChangeText={setVehicleNumber}
      />
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.radioButton, carBike && styles.selectedRadioButton]}
          onPress={() => setCarBike(true)}>
          <Text style={styles.radioText}>Car</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.radioButton, !carBike && styles.selectedRadioButton]}
          onPress={() => setCarBike(false)}>
          <Text style={styles.radioText}>Bike</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleParkIn}>
          <Text style={styles.buttonText}>Park In</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Buttons */}
      <View style={styles.row}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filterType === 'All' && styles.selectedFilterButton,
          ]}
          onPress={() => setFilterType('All')}>
          <Text style={styles.filterButtonText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filterType === 'Car' && styles.selectedFilterButton,
          ]}
          onPress={() => setFilterType('Car')}>
          <Text style={styles.filterButtonText}>Car</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filterType === 'Bike' && styles.selectedFilterButton,
          ]}
          onPress={() => setFilterType('Bike')}>
          <Text style={styles.filterButtonText}>Bike</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => alert(JSON.stringify(parkedOutVehicles))}>
          <Text style={styles.filterButtonText}>All Out</Text>
        </TouchableOpacity>
      </View>

      {/* Display Total Parked In and Earnings */}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Total Parked In: {totalParkedIn}</Text>
        <Text style={styles.summaryText}>
          Total Earnings: {totalEarnings} PKR
        </Text>
      </View>

      {/* Vehicle List */}
      <FlatList
        data={getFilteredVehicles()}
        renderItem={renderVehicleItem}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyListText}>No vehicles parked</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: 'purple',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  radioButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  selectedRadioButton: {
    backgroundColor: 'purple',
  },
  radioText: {
    color: 'white',
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  filterButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  selectedFilterButton: {
    backgroundColor: 'purple',
  },
  filterButtonText: {
    color: '#fff',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  vehicleItem: {
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#f1f1f1',
  },
  vehicleText: {
    fontSize: 16,
  },
  parkOutButton: {
    backgroundColor: 'red',
    padding: 5,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  parkOutButtonText: {
    color: '#fff',
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#aaa',
  },
});

export default ParkingSystem;
