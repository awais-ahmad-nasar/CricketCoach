import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-paper';

const TaskApp = () => {
  const [screen, setScreen] = useState('home');

  // States for New Route Screen
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [busNumber, setBusNumber] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [routes, setRoutes] = useState([]);

  // States for Search Screen
  const [searchSource, setSearchSource] = useState('');
  const [searchDestination, setSearchDestination] = useState('');
  const [filteredRoutes, setFilteredRoutes] = useState([]);

  const [showSourceList, setShowSourceList] = useState(false);
  const [showDestinationList, setShowDestinationList] = useState(false);
  const [showSearchSourceList, setShowSearchSourceList] = useState(false);
  const [showSearchDestinationList, setShowSearchDestinationList] =
    useState(false);

  const cities = [
    'Karachi',
    'Lahore',
    'Islamabad',
    'Rawalpindi',
    'Quetta',
    'Peshawar',
  ];

  const handleAddRoute = () => {
    if (
      source &&
      destination &&
      busNumber &&
      departureTime &&
      source !== destination
    ) {
      const newRoute = {source, destination, busNumber, departureTime};
      setRoutes([...routes, newRoute]);
      setSource('');
      setDestination('');
      setBusNumber('');
      setDepartureTime('');
    } else {
      alert('Please fill all fields correctly!');
    }
  };

  const handleSearch = () => {
    const filtered = routes.filter(
      route =>
        route.source === searchSource &&
        route.destination === searchDestination,
    );
    setFilteredRoutes(filtered);
  };

  const renderCityItem = (item, onSelect) => (
    <TouchableOpacity
      style={styles.cityItem}
      onPress={() => {
        onSelect(item);
      }}>
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {screen === 'home'
              ? 'Home'
              : screen === 'newRoute'
              ? 'New Route'
              : 'Search'}
          </Text>
        </View>

        {/* Home Screen */}
        {screen === 'home' && (
          <View style={styles.homeContainer}>
            <Button
              mode="contained"
              style={styles.btn}
              onPress={() => setScreen('newRoute')}>
              New Route
            </Button>
            <Button
              mode="contained"
              style={styles.btn}
              onPress={() => setScreen('search')}>
              Search
            </Button>
          </View>
        )}

        {/* New Route Screen */}
        {screen === 'newRoute' && (
          <ScrollView style={styles.formContainer}>
            {/* Back Button */}
            <Button mode="text" onPress={() => setScreen('home')}>
              {'<'} Back
            </Button>

            <Text style={styles.subHeading}>New Route</Text>

            {/* Source Selection */}
            <Text>Source:</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowSourceList(!showSourceList)}>
              <Text>{source || 'Select Source'}</Text>
            </TouchableOpacity>
            {showSourceList && (
              <FlatList
                data={cities}
                keyExtractor={item => item}
                renderItem={({item}) => renderCityItem(item, setSource)}
              />
            )}

            {/* Destination Selection */}
            <Text>Destination:</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowDestinationList(!showDestinationList)}>
              <Text>{destination || 'Select Destination'}</Text>
            </TouchableOpacity>
            {showDestinationList && (
              <FlatList
                data={cities}
                keyExtractor={item => item}
                renderItem={({item}) => renderCityItem(item, setDestination)}
              />
            )}

            {/* Bus Number and Departure Time Inputs */}
            <Text>Bus #:</Text>
            <TextInput
              style={styles.input}
              value={busNumber}
              onChangeText={setBusNumber}
              placeholderTextColor="#4B4B4B"
              placeholder="Enter Bus Number"
            />
            <Text>Departure Time:</Text>
            <TextInput
              style={styles.input}
              value={departureTime}
              onChangeText={setDepartureTime}
              placeholderTextColor="#4B4B4B"
              placeholder="Enter Departure Time (e.g., 8:30)"
            />

            {/* Add Button */}
            <Button
              mode="contained"
              style={styles.addButton}
              onPress={handleAddRoute}>
              Add
            </Button>
          </ScrollView>
        )}

        {/* Search Screen */}
        {screen === 'search' && (
          <ScrollView style={styles.formContainer}>
            {/* Back Button */}
            <Button mode="text" onPress={() => setScreen('home')}>
              {'<'} Back
            </Button>

            <Text style={styles.subHeading}>Search</Text>

            {/* Search Source Selection */}
            <Text>Source:</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowSearchSourceList(!showSearchSourceList)}>
              <Text>{searchSource || 'Select Source'}</Text>
            </TouchableOpacity>
            {showSearchSourceList && (
              <FlatList
                data={cities}
                keyExtractor={item => item}
                renderItem={({item}) => renderCityItem(item, setSearchSource)}
              />
            )}

            {/* Search Destination Selection */}
            <Text>Destination:</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() =>
                setShowSearchDestinationList(!showSearchDestinationList)
              }>
              <Text>{searchDestination || 'Select Destination'}</Text>
            </TouchableOpacity>
            {showSearchDestinationList && (
              <FlatList
                data={cities}
                keyExtractor={item => item}
                renderItem={({item}) =>
                  renderCityItem(item, setSearchDestination)
                }
              />
            )}

            {/* Search Button */}
            <Button
              mode="contained"
              style={styles.searchButton}
              onPress={handleSearch}>
              Search
            </Button>

            {/* Display Search Results */}
            <View style={styles.routesContainer}>
              {filteredRoutes.length > 0 ? (
                filteredRoutes.map((route, index) => (
                  <Text key={index} style={styles.routeItem}>
                    Bus#: {route.busNumber}, Time: {route.departureTime}
                  </Text>
                ))
              ) : (
                <Text>No routes found.</Text>
              )}
            </View>
          </ScrollView>
        )}
      </View>
    </>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f7f7f7'},
  header: {backgroundColor: '#f39c12', padding: 15},
  headerText: {textAlign: 'center', fontSize: 24, color: 'white'},
  homeContainer: {alignItems: 'center', marginTop: 50},
  btn: {marginVertical: 10, width: 200},
  formContainer: {padding: 20},
  subHeading: {fontSize: 20, fontWeight: 'bold', marginVertical: 10},
  input: {borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5},
  addButton: {marginVertical: 10, backgroundColor: '#3498db'},
  searchButton: {marginVertical: 10, backgroundColor: '#27ae60'},
  routesContainer: {marginTop: 20},
  routeItem: {padding: 10, backgroundColor: '#ecf0f1', marginVertical: 5},
  cityItem: {padding: 10, borderBottomWidth: 1, borderColor: '#ddd'},
});

export default TaskApp;
