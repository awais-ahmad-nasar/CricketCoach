// ************************* ANEEQ API ********************************
// import {ip_adress} from './IP-config';
// import React, {useState, useEffect} from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   ScrollView,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import {SelectList} from 'react-native-dropdown-select-list';
// import CustomGradient from './components/CustomGradient';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const ArrangeSessionScreen = ({navigation}) => {
//   const [date, setDate] = useState(new Date());
//   const [startTime, setStartTime] = useState(new Date());
//   const [endTime, setEndTime] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [showStartTimePicker, setShowStartTimePicker] = useState(false);
//   const [showEndTimePicker, setShowEndTimePicker] = useState(false);
//   const [venue, setVenue] = useState('Jinan Sports Complex');
//   const [selectedPlayer, setSelectedPlayer] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [players, setPlayers] = useState([]);
//   const [coachId, setCoachId] = useState(null);
//   const [shots, setShots] = useState([]);
//   const [selectedShot, setSelectedShot] = useState(null);

//   useEffect(() => {
//     const checkAuthAndLoadData = async () => {
//       try {
//         const id = await AsyncStorage.getItem('user_id');
//         if (!id) {
//           Alert.alert('Session Expired', 'Please login again');
//           navigation.replace('SignIn');
//           return;
//         }
//         setCoachId(id);

//         // Load players and shots in parallel
//         const [playersResponse, shotsResponse] = await Promise.all([
//           fetch(`${ip_adress}/coach/get_all_players?coach_id=${id}`),
//           fetch(`${ip_adress}/coach/get_all_shots`),
//         ]);

//         const [playersData, shotsData] = await Promise.all([
//           playersResponse.json(),
//           shotsResponse.json(),
//         ]);
//         console.log('Players Data:', playersData); // Log the entire response

//         console.log('Players Data:', playersData); // Log to check players data

//         // Handle responses
//         if (!playersResponse.ok || !playersData.value) {
//           throw new Error(playersData.message || 'Failed to load players');
//         }
//         if (!shotsResponse.ok || !shotsData.value) {
//           throw new Error(shotsData.message || 'Failed to load session types');
//         }

//         // Set players
//         setPlayers(
//           playersData.players.map(p => ({
//             key: p.id.toString(),
//             value: p.name,
//           })),
//         );

//         setShots(
//           shotsData.shots.map(s => ({
//             key: s.id.toString(),
//             value: s.name,
//           })),
//         );
//       } catch (error) {
//         console.error('Data load error:', error);
//         Alert.alert('Error', error.message || 'Failed to load data');
//         navigation.goBack();
//       }
//     };

//     const unsubscribe = navigation.addListener('focus', checkAuthAndLoadData);
//     checkAuthAndLoadData();
//     return unsubscribe;
//   }, [navigation]);

//   const formatDate = date => {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };

//   const formatTime = date => {
//     const hours = String(date.getHours()).padStart(2, '0');
//     const minutes = String(date.getMinutes()).padStart(2, '0');
//     return `${hours}:${minutes}`;
//   };

//   const handleDateChange = (event, selectedDate) => {
//     setShowDatePicker(false);
//     if (selectedDate) setDate(selectedDate);
//   };

//   const handleStartTimeChange = (event, selectedTime) => {
//     setShowStartTimePicker(false);
//     if (selectedTime) {
//       setStartTime(selectedTime);
//       // Set end time to 1 hour after start time by default
//       const endTime = new Date(selectedTime);
//       endTime.setHours(endTime.getHours() + 1);
//       setEndTime(endTime);
//     }
//   };

//   const handleEndTimeChange = (event, selectedTime) => {
//     setShowEndTimePicker(false);
//     if (selectedTime) setEndTime(selectedTime);
//   };

//   const validateSession = () => {
//     if (!venue || !selectedPlayer || !selectedShot) {
//       Alert.alert('Error', 'Please fill all required fields');
//       return false;
//     }

//     const start = new Date(date);
//     start.setHours(startTime.getHours(), startTime.getMinutes());
//     const end = new Date(date);
//     end.setHours(endTime.getHours(), endTime.getMinutes());

//     if (start >= end) {
//       Alert.alert('Error', 'End time must be after start time');
//       return false;
//     }

//     return true;
//   };

//   const handleSave = async () => {
//     if (!validateSession()) return;

//     setIsLoading(true);

//     try {
//       const sessionData = {
//         name: selectedShot, // Use selected shot name as session name
//         date: formatDate(date),
//         start_time: formatTime(startTime),
//         end_time: formatTime(endTime),
//         venue: venue,
//         coach_id: coachId,
//         player_id: selectedPlayer, // Ensure player_id is passed
//       };

//       const response = await fetch(`${ip_adress}/coach/arrange_session`, {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify(sessionData),
//       });

//       const result = await response.json();

//       if (!response.ok || !result.value) {
//         throw new Error(result.message || 'Session creation failed');
//       }

//       Alert.alert('Success', 'Session Created Successfully');
//       navigation.navigate('CoachDashboard');
//     } catch (error) {
//       console.error('Session creation error:', error);
//       Alert.alert('Error', error.message || 'Operation failed');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.scrollContainer}>
//       <View style={styles.container}>
//         <CustomGradient style={styles.gradientBackground} />

//         <View style={styles.header}>
//           <TouchableOpacity
//             style={styles.backButtonContainer}
//             onPress={() => navigation.goBack()}>
//             <Text style={styles.backButton}>{'< Back'}</Text>
//           </TouchableOpacity>
//           <Text style={styles.title}>Arrange Session</Text>
//         </View>

//         <View style={{padding: 40}}>
//           <Text style={styles.label}>Session Type</Text>
//           <View style={styles.dropdownContainer}>
//             <SelectList
//               setSelected={setSelectedShot}
//               data={shots}
//               save="value"
//               search={false}
//               boxStyles={styles.dropdown}
//               dropdownStyles={styles.dropdownMenu}
//               placeholder="Select Session Type"
//             />
//           </View>

//           <Text style={styles.label}>Date</Text>
//           <TouchableOpacity
//             style={styles.inputContainer}
//             onPress={() => setShowDatePicker(true)}>
//             <View style={styles.dateInputWrapper}>
//               <Text style={styles.dateInputText}>{formatDate(date)}</Text>
//               <MaterialIcons
//                 name="calendar-today"
//                 size={24}
//                 color="#000080"
//                 style={styles.calendarIcon}
//               />
//             </View>
//           </TouchableOpacity>

//           {showDatePicker && (
//             <DateTimePicker
//               value={date}
//               mode="date"
//               display="default"
//               onChange={handleDateChange}
//             />
//           )}

//           <Text style={styles.label}>Start Time</Text>
//           <TouchableOpacity
//             style={styles.inputContainer}
//             onPress={() => setShowStartTimePicker(true)}>
//             <View style={styles.dateInputWrapper}>
//               <Text style={styles.dateInputText}>{formatTime(startTime)}</Text>
//               <MaterialIcons
//                 name="access-time"
//                 size={24}
//                 color="#000080"
//                 style={styles.calendarIcon}
//               />
//             </View>
//           </TouchableOpacity>

//           {showStartTimePicker && (
//             <DateTimePicker
//               value={startTime}
//               mode="time"
//               display="default"
//               onChange={handleStartTimeChange}
//             />
//           )}

//           <Text style={styles.label}>End Time</Text>
//           <TouchableOpacity
//             style={styles.inputContainer}
//             onPress={() => setShowEndTimePicker(true)}>
//             <View style={styles.dateInputWrapper}>
//               <Text style={styles.dateInputText}>{formatTime(endTime)}</Text>
//               <MaterialIcons
//                 name="access-time"
//                 size={24}
//                 color="#000080"
//                 style={styles.calendarIcon}
//               />
//             </View>
//           </TouchableOpacity>

//           {showEndTimePicker && (
//             <DateTimePicker
//               value={endTime}
//               mode="time"
//               display="default"
//               onChange={handleEndTimeChange}
//             />
//           )}

//           <Text style={styles.label}>Venue</Text>
//           <View style={styles.inputContainer}>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter Venue"
//               placeholderTextColor="rgba(0,0,0,0.7)"
//               value={venue}
//               onChangeText={setVenue}
//             />
//           </View>

//           <Text style={styles.label}>Player</Text>
//           <View style={styles.dropdownContainer}>
//             <SelectList
//               setSelected={setSelectedPlayer}
//               data={players}
//               save="key"
//               search={false}
//               boxStyles={styles.dropdown}
//               dropdownStyles={styles.dropdownMenu}
//               placeholder="Select Player"
//             />
//           </View>

//           <TouchableOpacity
//             style={styles.saveButton}
//             onPress={handleSave}
//             disabled={isLoading}>
//             {isLoading ? (
//               <ActivityIndicator size="small" color="white" />
//             ) : (
//               <Text style={styles.buttonText}>Save Session</Text>
//             )}
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     paddingTop: 100,
//     position: 'relative',
//   },
//   gradientBackground: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 30,
//     backgroundColor: '#E6F2E6',
//     padding: 30,
//     borderBottomWidth: 1,
//     borderBottomColor: '#DFF4DF',
//     width: '100%',
//     position: 'absolute',
//     top: 0,
//     zIndex: 1,
//   },
//   backButtonContainer: {
//     position: 'absolute',
//     left: 10,
//     top: 10,
//   },
//   backButton: {
//     color: '#000080',
//     fontSize: 13,
//     fontWeight: '600',
//     marginTop: 25,
//   },
//   title: {
//     flex: 1,
//     textAlign: 'center',
//     color: '#000080',
//     fontSize: 22,
//     fontWeight: 'bold',
//   },
//   label: {
//     color: 'rgba(0,0,0,0.7)',
//     fontSize: 15,
//     fontWeight: 'bold',
//     padding: 2,
//     marginLeft: 5,
//     alignSelf: 'flex-start',
//   },
//   inputContainer: {
//     width: 300,
//     height: 50,
//     borderWidth: 2,
//     borderColor: 'rgba(28,58,107,1)',
//     borderRadius: 15,
//     justifyContent: 'center',
//     paddingLeft: 15,
//     marginTop: 10,
//   },
//   input: {
//     fontSize: 15,
//     color: 'black',
//     flex: 1,
//   },
//   dateInputWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     flex: 1,
//   },
//   dateInputText: {
//     fontSize: 15,
//     color: 'black',
//   },
//   calendarIcon: {
//     marginRight: 10,
//   },
//   saveButton: {
//     width: 300,
//     height: 50,
//     backgroundColor: 'rgba(0,100,0,1)',
//     borderRadius: 15,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   dropdownContainer: {
//     width: 300,
//     marginTop: 10,
//   },
//   dropdown: {
//     borderWidth: 2,
//     borderColor: 'rgba(28,58,107,1)',
//     borderRadius: 15,
//     height: 50,
//     justifyContent: 'center',
//     paddingLeft: 15,
//   },
//   dropdownMenu: {
//     borderWidth: 2,
//     borderColor: 'rgba(28,58,107,1)',
//     borderRadius: 15,
//     marginTop: 5,
//     backgroundColor: 'white',
//   },
// });

// export default ArrangeSessionScreen;

import {ip_adress} from './IP-config';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
  Modal,
  Image,
} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import CustomGradient from './components/CustomGradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ArrangeSessionScreen = ({navigation}) => {
  // const [date, setDate] = useState(new Date());
  // const [startTime, setStartTime] = useState(new Date());
  // const [endTime, setEndTime] = useState(new Date());
  // const [showDatePicker, setShowDatePicker] = useState(false);
  // const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  // const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  // const [venue, setVenue] = useState('Jinan Sports Complex');
  // const [selectedPlayer, setSelectedPlayer] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  // const [players, setPlayers] = useState([]);
  // const [coachId, setCoachId] = useState(null);
  // const [shots, setShots] = useState([]);
  // const [selectedShot, setSelectedShot] = useState(null);
  // const [showSuccessModal, setShowSuccessModal] = useState(false);

  // useEffect(() => {
  //   const checkAuthAndLoadData = async () => {
  //     try {
  //       const id = await AsyncStorage.getItem('user_id');
  //       if (!id) {
  //         Alert.alert('Session Expired', 'Please login again');
  //         navigation.replace('SignIn');
  //         return;
  //       }
  //       setCoachId(id);

  //       // Load players and shots in parallel
  //       const [playersResponse, shotsResponse] = await Promise.all([
  //         fetch(`${ip_adress}/coach/get_all_players?coach_id=${id}`),
  //         fetch(`${ip_adress}/coach/get_all_shots`),
  //       ]);

  //       const [playersData, shotsData] = await Promise.all([
  //         playersResponse.json(),
  //         shotsResponse.json(),
  //       ]);
  //       console.log('Players Data:', playersData); // Log the entire response

  //       console.log('Players Data:', playersData); // Log to check players data

  //       // Handle responses
  //       if (!playersResponse.ok || !playersData.value) {
  //         throw new Error(playersData.message || 'Failed to load players');
  //       }
  //       if (!shotsResponse.ok || !shotsData.value) {
  //         throw new Error(shotsData.message || 'Failed to load session types');
  //       }

  //       // Set players
  //       setPlayers(
  //         playersData.players.map(p => ({
  //           key: p.id.toString(),
  //           value: p.name,
  //         })),
  //       );

  //       setShots(
  //         shotsData.shots.map(s => ({
  //           key: s.id.toString(),
  //           value: s.name,
  //         })),
  //       );
  //     } catch (error) {
  //       console.error('Data load error:', error);
  //       Alert.alert('Error', error.message || 'Failed to load data');
  //       navigation.goBack();
  //     }
  //   };

  //   const unsubscribe = navigation.addListener('focus', checkAuthAndLoadData);
  //   checkAuthAndLoadData();
  //   return unsubscribe;
  // }, [navigation]);

  // const formatDate = date => {
  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, '0');
  //   const day = String(date.getDate()).padStart(2, '0');
  //   return `${year}-${month}-${day}`;
  // };

  // const formatTime = date => {
  //   const hours = String(date.getHours()).padStart(2, '0');
  //   const minutes = String(date.getMinutes()).padStart(2, '0');
  //   return `${hours}:${minutes}`;
  // };

  // const handleDateChange = (event, selectedDate) => {
  //   setShowDatePicker(false);
  //   if (selectedDate) setDate(selectedDate);
  // };

  // const handleStartTimeChange = (event, selectedTime) => {
  //   setShowStartTimePicker(false);
  //   if (selectedTime) {
  //     setStartTime(selectedTime);
  //     // Set end time to 1 hour after start time by default
  //     const endTime = new Date(selectedTime);
  //     endTime.setHours(endTime.getHours() + 1);
  //     setEndTime(endTime);
  //   }
  // };

  // const handleEndTimeChange = (event, selectedTime) => {
  //   setShowEndTimePicker(false);
  //   if (selectedTime) setEndTime(selectedTime);
  // };

  // const validateSession = () => {
  //   if (!venue || !selectedPlayer || !selectedShot) {
  //     Alert.alert('Error', 'Please fill all required fields');
  //     return false;
  //   }

  //   const start = new Date(date);
  //   start.setHours(startTime.getHours(), startTime.getMinutes());
  //   const end = new Date(date);
  //   end.setHours(endTime.getHours(), endTime.getMinutes());

  //   if (start >= end) {
  //     Alert.alert('Error', 'End time must be after start time');
  //     return false;
  //   }

  //   return true;
  // };

  // const handleSave = async () => {
  //   if (!validateSession()) return;

  //   setIsLoading(true);

  //   try {
  //     const sessionData = {
  //       name: selectedShot, // Use selected shot name as session name
  //       date: formatDate(date),
  //       start_time: formatTime(startTime),
  //       end_time: formatTime(endTime),
  //       venue: venue,
  //       coach_id: coachId,
  //       player_id: selectedPlayer, // Ensure player_id is passed
  //     };

  //     const response = await fetch(`${ip_adress}/coach/arrange_session`, {
  //       method: 'POST',
  //       headers: {'Content-Type': 'application/json'},
  //       body: JSON.stringify(sessionData),
  //     });

  //     const result = await response.json();

  //     if (!response.ok || !result.value) {
  //       throw new Error(result.message || 'Session creation failed');
  //     }

  //     // Show success modal instead of alert
  //     setShowSuccessModal(true);
  //   } catch (error) {
  //     console.error('Session creation error:', error);
  //     Alert.alert('Error', error.message || 'Operation failed');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const handleModalClose = () => {
  //   setShowSuccessModal(false);
  //   navigation.navigate('CoachDashboard');
  // };

  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [venue, setVenue] = useState('Jinan Sports Complex');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [players, setPlayers] = useState([]);
  const [coachId, setCoachId] = useState(null);
  const [shots, setShots] = useState([]);
  const [selectedShot, setSelectedShot] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const checkAuthAndLoadData = async () => {
      try {
        const id = await AsyncStorage.getItem('user_id');
        if (!id) {
          Alert.alert('Session Expired', 'Please login again');
          navigation.replace('SignIn');
          return;
        }
        setCoachId(id);

        // Load players and shots in parallel
        const [playersResponse, shotsResponse] = await Promise.all([
          fetch(`${ip_adress}/coach/get_all_players?coach_id=${id}`),
          fetch(`${ip_adress}/coach/get_all_shots`),
        ]);

        const [playersData, shotsData] = await Promise.all([
          playersResponse.json(),
          shotsResponse.json(),
        ]);

        // Handle responses
        if (!playersResponse.ok || !playersData.value) {
          throw new Error(playersData.message || 'Failed to load players');
        }
        if (!shotsResponse.ok || !shotsData.value) {
          throw new Error(shotsData.message || 'Failed to load session types');
        }

        // Set players
        setPlayers(
          playersData.players.map(p => ({
            key: p.id.toString(),
            value: p.name,
          })),
        );

        setShots(
          shotsData.shots.map(s => ({
            key: s.id.toString(),
            value: s.name,
          })),
        );
      } catch (error) {
        console.error('Data load error:', error);
        Alert.alert('Error', error.message || 'Failed to load data');
        navigation.goBack();
      }
    };

    const unsubscribe = navigation.addListener('focus', checkAuthAndLoadData);
    checkAuthAndLoadData();
    return unsubscribe;
  }, [navigation]);

  const formatDate = date => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatTime = date => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const handleStartTimeChange = (event, selectedTime) => {
    setShowStartTimePicker(false);
    if (selectedTime) {
      setStartTime(selectedTime);
      // Set end time to 1 hour after start time by default
      const endTime = new Date(selectedTime);
      endTime.setHours(endTime.getHours() + 1);
      setEndTime(endTime);
    }
  };

  const handleEndTimeChange = (event, selectedTime) => {
    setShowEndTimePicker(false);
    if (selectedTime) setEndTime(selectedTime);
  };

  const validateSession = () => {
    if (!venue || !selectedPlayer || !selectedShot) {
      Alert.alert('Error', 'Please fill all required fields');
      return false;
    }

    const start = new Date(date);
    start.setHours(startTime.getHours(), startTime.getMinutes());
    const end = new Date(date);
    end.setHours(endTime.getHours(), endTime.getMinutes());

    if (start >= end) {
      Alert.alert('Error', 'End time must be after start time');
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!validateSession()) return;

    setIsLoading(true);

    try {
      const sessionData = {
        name: selectedShot,
        date: formatDate(date),
        start_time: formatTime(startTime),
        end_time: formatTime(endTime),
        venue: venue,
        coach_id: coachId,
        player_id: selectedPlayer,
      };

      const response = await fetch(`${ip_adress}/coach/arrange_session`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(sessionData),
      });

      const result = await response.json();

      // Modified success condition check
      if (response.ok && result.message === 'Session arranged successfully') {
        setShowSuccessModal(true);
      } else {
        throw new Error(result.message || 'Session creation failed');
      }
    } catch (error) {
      console.error('Session creation error:', error);
      Alert.alert('Error', error.message || 'Operation failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigation.navigate('Coachdashboard');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <CustomGradient style={styles.gradientBackground} />

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButtonContainer}
            onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>{'< Back'}</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Arrange Session</Text>
        </View>

        <View style={{padding: 40}}>
          <Text style={styles.label}>Session Type</Text>
          <View style={styles.dropdownContainer}>
            <SelectList
              setSelected={setSelectedShot}
              data={shots}
              save="value"
              search={false}
              boxStyles={styles.dropdown}
              dropdownStyles={styles.dropdownMenu}
              placeholder="Select Session Type"
            />
          </View>

          <Text style={styles.label}>Date</Text>
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => setShowDatePicker(true)}>
            <View style={styles.dateInputWrapper}>
              <Text style={styles.dateInputText}>{formatDate(date)}</Text>
              <MaterialIcons
                name="calendar-today"
                size={24}
                color="#000080"
                style={styles.calendarIcon}
              />
            </View>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}

          <Text style={styles.label}>Start Time</Text>
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => setShowStartTimePicker(true)}>
            <View style={styles.dateInputWrapper}>
              <Text style={styles.dateInputText}>{formatTime(startTime)}</Text>
              <MaterialIcons
                name="access-time"
                size={24}
                color="#000080"
                style={styles.calendarIcon}
              />
            </View>
          </TouchableOpacity>

          {showStartTimePicker && (
            <DateTimePicker
              value={startTime}
              mode="time"
              display="default"
              onChange={handleStartTimeChange}
            />
          )}

          <Text style={styles.label}>End Time</Text>
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => setShowEndTimePicker(true)}>
            <View style={styles.dateInputWrapper}>
              <Text style={styles.dateInputText}>{formatTime(endTime)}</Text>
              <MaterialIcons
                name="access-time"
                size={24}
                color="#000080"
                style={styles.calendarIcon}
              />
            </View>
          </TouchableOpacity>

          {showEndTimePicker && (
            <DateTimePicker
              value={endTime}
              mode="time"
              display="default"
              onChange={handleEndTimeChange}
            />
          )}

          <Text style={styles.label}>Venue</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter Venue"
              placeholderTextColor="rgba(0,0,0,0.7)"
              value={venue}
              onChangeText={setVenue}
            />
          </View>

          <Text style={styles.label}>Player</Text>
          <View style={styles.dropdownContainer}>
            <SelectList
              setSelected={setSelectedPlayer}
              data={players}
              save="key"
              search={false}
              boxStyles={styles.dropdown}
              dropdownStyles={styles.dropdownMenu}
              placeholder="Select Player"
            />
          </View>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.buttonText}>Save Session</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Success Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={showSuccessModal}
          onRequestClose={handleModalClose}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <MaterialIcons
                  name="check-circle"
                  size={60}
                  color="#4BB543"
                  style={styles.successIcon}
                />
                <Text style={styles.modalTitle}>Success!</Text>
                <Text style={styles.modalText}>
                  Session has been arranged successfully.
                </Text>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleModalClose}>
                  <Text style={styles.modalButtonText}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 100,
    position: 'relative',
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#E6F2E6',
    padding: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#DFF4DF',
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
  backButtonContainer: {
    position: 'absolute',
    left: 10,
    top: 10,
  },
  backButton: {
    color: '#000080',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 25,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: '#000080',
    fontSize: 22,
    fontWeight: 'bold',
  },
  label: {
    color: 'rgba(0,0,0,0.7)',
    fontSize: 15,
    fontWeight: 'bold',
    padding: 2,
    marginLeft: 5,
    alignSelf: 'flex-start',
  },
  inputContainer: {
    width: 300,
    height: 50,
    borderWidth: 2,
    borderColor: 'rgba(28,58,107,1)',
    borderRadius: 15,
    justifyContent: 'center',
    paddingLeft: 15,
    marginTop: 10,
  },
  input: {
    fontSize: 15,
    color: 'black',
    flex: 1,
  },
  dateInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  dateInputText: {
    fontSize: 15,
    color: 'black',
  },
  calendarIcon: {
    marginRight: 10,
  },
  saveButton: {
    width: 300,
    height: 50,
    backgroundColor: 'rgba(0,100,0,1)',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdownContainer: {
    width: 300,
    marginTop: 10,
  },
  dropdown: {
    borderWidth: 2,
    borderColor: 'rgba(28,58,107,1)',
    borderRadius: 15,
    height: 50,
    justifyContent: 'center',
    paddingLeft: 15,
  },
  dropdownMenu: {
    borderWidth: 2,
    borderColor: 'rgba(28,58,107,1)',
    borderRadius: 15,
    marginTop: 5,
    backgroundColor: 'white',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalContent: {
    alignItems: 'center',
    padding: 10,
  },
  successIcon: {
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000080',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#000080',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 10,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ArrangeSessionScreen;
// ***********************************************************************************
// ***********************************************************************************
// import {ip_adress} from './IP-config';
// import React, {useState, useEffect} from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   ScrollView,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import {SelectList} from 'react-native-dropdown-select-list';
// import CustomGradient from './components/CustomGradient';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const ArrangeSessionScreen = ({navigation}) => {
//   const [sessionName, setSessionName] = useState('');
//   const [date, setDate] = useState(new Date());
//   const [time, setTime] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [showTimePicker, setShowTimePicker] = useState(false);
//   const [venue, setVenue] = useState('Jinan Sports Complex');
//   const [selectedPlayers, setSelectedPlayers] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [players, setPlayers] = useState([]);
//   const [shots, setShots] = useState([]);
//   const [selectedShot, setSelectedShot] = useState('');
//   const [coachId, setCoachId] = useState(null);

//   useEffect(() => {
//     const checkAuthAndLoadData = async () => {
//       try {
//         const id = await AsyncStorage.getItem('user_id');
//         if (!id) {
//           Alert.alert('Session Expired', 'Please login again');
//           navigation.replace('SignIn');
//           return;
//         }
//         setCoachId(id);

//         // Load players
//         const playersResponse = await fetch(
//           `${ip_adress}/api/coach/get_all_players?coach_id=${id}`,
//         );

//         if (!playersResponse.ok) {
//           const error = await playersResponse.json();
//           throw new Error(error.error || 'Failed to load players');
//         }

//         const playersData = await playersResponse.json();
//         setPlayers(
//           playersData.players.map(p => ({
//             key: p.id.toString(),
//             value: p.name,
//           })),
//         );

//         // Load shots
//         const shotsResponse = await fetch(
//           `${ip_adress}/api/coach/get_all_shots`,
//         );

//         if (!shotsResponse.ok) {
//           const error = await shotsResponse.json();
//           throw new Error(error.error || 'Failed to load shots');
//         }

//         const shotsData = await shotsResponse.json();
//         const mappedShots = shotsData.map(shot => ({
//           key: shot.id.toString(),
//           value: shot.type,
//         }));
//         setShots(mappedShots);

//         if (mappedShots.length > 0) {
//           setSelectedShot(mappedShots[0].key);
//         }
//       } catch (error) {
//         Alert.alert('Error', error.message || 'Failed to load data');
//         navigation.goBack();
//       }
//     };

//     const unsubscribe = navigation.addListener('focus', checkAuthAndLoadData);
//     checkAuthAndLoadData();
//     return unsubscribe;
//   }, [navigation]);

//   const formatDate = date => {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     return `${year}/${month}/${day}`;
//   };

//   const formatTime = date => {
//     const hours = String(date.getHours()).padStart(2, '0');
//     const minutes = String(date.getMinutes()).padStart(2, '0');
//     return `${hours}:${minutes}`;
//   };

//   const handleDateChange = (event, selectedDate) => {
//     setShowDatePicker(false);
//     if (selectedDate) setDate(selectedDate);
//   };

//   const handleTimeChange = (event, selectedTime) => {
//     setShowTimePicker(false);
//     if (selectedTime) setTime(selectedTime);
//   };

//   const handleSave = async () => {
//     if (
//       !sessionName ||
//       !venue ||
//       selectedPlayers.length === 0 ||
//       !selectedShot
//     ) {
//       Alert.alert('Error', 'Please fill all required fields');
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const timeFrom = new Date(time);
//       const timeTo = new Date(timeFrom);
//       timeTo.setHours(timeTo.getHours() + 1);

//       const sessionData = {
//         name: sessionName,
//         coach_id: parseInt(coachId),
//         shot_id: parseInt(selectedShot),
//         venue,
//         date: formatDate(date).replace(/\//g, '-'),
//         session_from: `${formatTime(timeFrom)}:00`,
//         session_to: `${formatTime(timeTo)}:00`,
//       };

//       // Create session
//       const sessionResponse = await fetch(
//         `${ip_adress}/api/coach/arrange_session`,
//         {
//           method: 'POST',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify(sessionData),
//         },
//       );

//       if (!sessionResponse.ok) {
//         const errorData = await sessionResponse.json();
//         throw new Error(errorData.error || 'Session creation failed');
//       }

//       const sessionResult = await sessionResponse.json();

//       // Add players and shots
//       const addPlayersResponse = await fetch(
//         `${ip_adress}/api/coach/add_players_in_session/${sessionResult.session_id}`,
//         {
//           method: 'POST',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             player_ids: selectedPlayers.map(Number),
//             shot_id: parseInt(selectedShot),
//           }),
//         },
//       );

//       if (!addPlayersResponse.ok) {
//         const errorData = await addPlayersResponse.json();
//         throw new Error(errorData.error || 'Failed to add players and shots');
//       }

//       Alert.alert('Success', 'Session created successfully');
//       navigation.navigate('CoachDashboard');
//     } catch (error) {
//       Alert.alert('Error', error.message || 'Operation failed');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.scrollContainer}>
//       <View style={styles.container}>
//         <CustomGradient style={styles.gradientBackground} />

//         <View style={styles.header}>
//           <TouchableOpacity
//             style={styles.backButtonContainer}
//             onPress={() => navigation.goBack()}>
//             <Text style={styles.backButton}>{'< Back'}</Text>
//           </TouchableOpacity>
//           <Text style={styles.title}>Arrange Session</Text>
//         </View>

//         <View style={{padding: 40}}>
//           <Text style={styles.label}>Session Name</Text>
//           <View style={styles.inputContainer}>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter Session Name"
//               placeholderTextColor="rgba(0,0,0,0.7)"
//               value={sessionName}
//               onChangeText={setSessionName}
//             />
//           </View>

// <Text style={styles.label}>Shot Type</Text>
// <View style={styles.dropdownContainer}>
//   <SelectList
//     setSelected={setSelectedShot}
//     data={shots}
//     save="key"
//     search={false}
//     boxStyles={styles.dropdown}
//     dropdownStyles={styles.dropdownMenu}
//     defaultOption={shots[0]}
//     placeholder="Select Shot Type"
//   />
// </View>

//           <Text style={styles.label}>Date</Text>
//           <TouchableOpacity
//             style={styles.inputContainer}
//             onPress={() => setShowDatePicker(true)}>
//             <View style={styles.dateInputWrapper}>
//               <Text style={styles.dateInputText}>{formatDate(date)}</Text>
//               <MaterialIcons
//                 name="calendar-today"
//                 size={24}
//                 color="#000080"
//                 style={styles.calendarIcon}
//               />
//             </View>
//           </TouchableOpacity>

//           {showDatePicker && (
//             <DateTimePicker
//               value={date}
//               mode="date"
//               display="default"
//               onChange={handleDateChange}
//             />
//           )}

//           <Text style={styles.label}>Time</Text>
//           <TouchableOpacity
//             style={styles.inputContainer}
//             onPress={() => setShowTimePicker(true)}>
//             <View style={styles.dateInputWrapper}>
//               <Text style={styles.dateInputText}>{formatTime(time)}</Text>
//               <MaterialIcons
//                 name="access-time"
//                 size={24}
//                 color="#000080"
//                 style={styles.calendarIcon}
//               />
//             </View>
//           </TouchableOpacity>

//           {showTimePicker && (
//             <DateTimePicker
//               value={time}
//               mode="time"
//               display="default"
//               onChange={handleTimeChange}
//             />
//           )}

//           <Text style={styles.label}>Venue</Text>
//           <View style={styles.inputContainer}>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter Venue"
//               placeholderTextColor="rgba(0,0,0,0.7)"
//               value={venue}
//               onChangeText={setVenue}
//             />
//           </View>

//           <Text style={styles.label}>Players</Text>
//           <View style={styles.dropdownContainer}>
//             <SelectList
//               setSelected={setSelectedPlayers}
//               data={players}
//               save="key"
//               search={false}
//               boxStyles={styles.dropdown}
//               dropdownStyles={styles.dropdownMenu}
//               placeholder="Select Players"
//               multiple={true}
//             />
//           </View>

//           <TouchableOpacity
//             style={styles.saveButton}
//             onPress={handleSave}
//             disabled={isLoading}>
//             {isLoading ? (
//               <ActivityIndicator size="small" color="white" />
//             ) : (
//               <Text style={styles.buttonText}>Save Session</Text>
//             )}
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     paddingTop: 100,
//     position: 'relative',
//   },
//   gradientBackground: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 30,
//     backgroundColor: '#E6F2E6',
//     padding: 30,
//     borderBottomWidth: 1,
//     borderBottomColor: '#DFF4DF',
//     width: '100%',
//     position: 'absolute',
//     top: 0,
//     zIndex: 1,
//   },
//   backButtonContainer: {
//     position: 'absolute',
//     left: 10,
//     top: 10,
//   },
//   backButton: {
//     color: '#000080',
//     fontSize: 13,
//     fontWeight: '600',
//     marginTop: 25,
//   },
//   title: {
//     flex: 1,
//     textAlign: 'center',
//     color: '#000080',
//     fontSize: 22,
//     fontWeight: 'bold',
//   },
//   label: {
//     color: 'rgba(0,0,0,0.7)',
//     fontSize: 15,
//     fontWeight: 'bold',
//     padding: 2,
//     marginLeft: 5,
//     alignSelf: 'flex-start',
//   },
//   inputContainer: {
//     width: 300,
//     height: 50,
//     borderWidth: 2,
//     borderColor: 'rgba(28,58,107,1)',
//     borderRadius: 15,
//     justifyContent: 'center',
//     paddingLeft: 15,
//     marginTop: 10,
//   },
//   input: {
//     fontSize: 15,
//     color: 'black',
//     flex: 1,
//   },
//   dateInputWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     flex: 1,
//   },
//   dateInputText: {
//     fontSize: 15,
//     color: 'black',
//   },
//   calendarIcon: {
//     marginRight: 10,
//   },
//   saveButton: {
//     width: 300,
//     height: 50,
//     backgroundColor: 'rgba(0,100,0,1)',
//     borderRadius: 15,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   dropdownContainer: {
//     width: 300,
//     marginTop: 10,
//   },
//   dropdown: {
//     borderWidth: 2,
//     borderColor: 'rgba(28,58,107,1)',
//     borderRadius: 15,
//     height: 50,
//     justifyContent: 'center',
//     paddingLeft: 15,
//   },
//   dropdownMenu: {
//     borderWidth: 2,
//     borderColor: 'rgba(28,58,107,1)',
//     borderRadius: 15,
//     marginTop: 5,
//   },
// });

// export default ArrangeSessionScreen;

// .....................................................................................
// .....................................................................................

// import {ip_adress} from './IP-config';
// import React, {useState, useEffect} from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   ScrollView,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import {SelectList} from 'react-native-dropdown-select-list';
// import CustomGradient from './components/CustomGradient';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const ArrangeSessionScreen = ({navigation}) => {
//   const [sessionName, setSessionName] = useState('');
//   const [date, setDate] = useState(new Date());
//   const [time, setTime] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [showTimePicker, setShowTimePicker] = useState(false);
//   const [venue, setVenue] = useState('Jinan Sports Complex');
//   const [selectedPlayers, setSelectedPlayers] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [players, setPlayers] = useState([]);
//   const [shots, setShots] = useState([]);
//   const [selectedShot, setSelectedShot] = useState('');
//   const [coachId, setCoachId] = useState(null);

//   // Fetch players and shots on component mount
//   useEffect(() => {
//     const checkAuthAndLoadData = async () => {
//       try {
//         const id = await AsyncStorage.getItem('user_id');
//         if (!id) {
//           Alert.alert('Session Expired', 'Please login again');
//           navigation.replace('SignIn');
//           return;
//         }
//         setCoachId(id);

//         // Load players
//         const playersResponse = await fetch(
//           `${ip_adress}/api/coach/get_all_players?coach_id=${id}`,
//         );
//         const playersData = await playersResponse.json();
//         if (playersResponse.ok) {
//           setPlayers(
//             playersData.players.map(p => ({
//               key: p.id.toString(),
//               value: p.name,
//             })),
//           );
//         }

//         // Load shots
//         const shotsResponse = await fetch(
//           `${ip_adress}/api/coach/get_all_shots`,
//         );
//         const shotsData = await shotsResponse.json();
//         if (shotsResponse.ok && shotsData.length > 0) {
//           setShots(shotsData);
//           setSelectedShot(shotsData[0]?.id.toString() || '');
//         }
//       } catch (error) {
//         Alert.alert('Error', 'Failed to load data');
//         navigation.goBack();
//       }
//     };

//     const unsubscribe = navigation.addListener('focus', checkAuthAndLoadData);
//     checkAuthAndLoadData();
//     return unsubscribe;
//   }, [navigation]);

//   const formatDate = date => {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     return `${year}/${month}/${day}`;
//   };

//   const formatTime = date => {
//     const hours = String(date.getHours()).padStart(2, '0');
//     const minutes = String(date.getMinutes()).padStart(2, '0');
//     return `${hours}:${minutes}`;
//   };

//   const handleDateChange = (event, selectedDate) => {
//     setShowDatePicker(false);
//     if (selectedDate) setDate(selectedDate);
//   };

//   const handleTimeChange = (event, selectedTime) => {
//     setShowTimePicker(false);
//     if (selectedTime) setTime(selectedTime);
//   };

//   const handleSave = async () => {
//     if (
//       !sessionName ||
//       !venue ||
//       selectedPlayers.length === 0 ||
//       !selectedShot
//     ) {
//       Alert.alert('Error', 'Please fill all required fields');
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const sessionData = {
//         name: sessionName,
//         coach_id: parseInt(coachId),
//         shot_id: parseInt(selectedShot),
//         venue,
//         date: formatDate(date).replace(/\//g, '-'),
//         session_from: `${formatTime(time)}:00`,
//         session_to: `${time.getHours() + 1}:${formatTime(time).slice(3)}:00`,
//       };

//       // Create session
//       const sessionResponse = await fetch(
//         `${ip_adress}/api/coach/arrange_session`,
//         {
//           method: 'POST',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify(sessionData),
//         },
//       );

//       const sessionResult = await sessionResponse.json();
//       if (!sessionResponse.ok)
//         throw new Error(sessionResult.error || 'Session creation failed');

//       // Add players and shots
//       const addPlayersResponse = await fetch(
//         `${ip_adress}/api/coach/add_players_in_session/${sessionResult.session_id}`,
//         {
//           method: 'POST',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             player_ids: selectedPlayers.map(Number),
//             shot_id: parseInt(selectedShot),
//           }),
//         },
//       );

//       if (!addPlayersResponse.ok)
//         throw new Error('Failed to add players and shots');

//       Alert.alert('Success', 'Session created successfully');
//       navigation.navigate('CoachDashboard');
//     } catch (error) {
//       Alert.alert('Error', error.message || 'Operation failed');
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   return (
//     <ScrollView contentContainerStyle={styles.scrollContainer}>
//       <View style={styles.container}>
//         <CustomGradient style={styles.gradientBackground} />

//         <View style={styles.header}>
//           <TouchableOpacity
//             style={styles.backButtonContainer}
//             onPress={() => navigation.goBack()}>
//             <Text style={styles.backButton}>{'< Back'}</Text>
//           </TouchableOpacity>
//           <Text style={styles.title}>Arrange Session</Text>
//         </View>

//         <View style={{padding: 40}}>
//           <Text style={styles.label}>Session Name</Text>
//           <View style={styles.inputContainer}>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter Session Name"
//               placeholderTextColor="rgba(0,0,0,0.7)"
//               value={sessionName}
//               onChangeText={setSessionName}
//             />
//           </View>

//           <Text style={styles.label}>Shot Type</Text>
//           <View style={styles.dropdownContainer}>
//             <SelectList
//               setSelected={setSelectedShot}
//               data={shots.map(shot => ({
//                 key: shot.id.toString(),
//                 value: shot.name,
//               }))}
//               save="key"
//               search={false}
//               boxStyles={styles.dropdown}
//               dropdownStyles={styles.dropdownMenu}
//               defaultOption={{
//                 key: shots[0]?.id.toString(),
//                 value: shots[0]?.name,
//               }}
//             />
//           </View>

//           <Text style={styles.label}>Date</Text>
//           <TouchableOpacity
//             style={styles.inputContainer}
//             onPress={() => setShowDatePicker(true)}>
//             <View style={styles.dateInputWrapper}>
//               <Text style={styles.dateInputText}>{formatDate(date)}</Text>
//               <MaterialIcons
//                 name="calendar-today"
//                 size={24}
//                 color="#000080"
//                 style={styles.calendarIcon}
//               />
//             </View>
//           </TouchableOpacity>

//           {showDatePicker && (
//             <DateTimePicker
//               value={date}
//               mode="date"
//               display="default"
//               onChange={handleDateChange}
//             />
//           )}

//           <Text style={styles.label}>Time</Text>
//           <TouchableOpacity
//             style={styles.inputContainer}
//             onPress={() => setShowTimePicker(true)}>
//             <View style={styles.dateInputWrapper}>
//               <Text style={styles.dateInputText}>{formatTime(time)}</Text>
//               <MaterialIcons
//                 name="access-time"
//                 size={24}
//                 color="#000080"
//                 style={styles.calendarIcon}
//               />
//             </View>
//           </TouchableOpacity>

//           {showTimePicker && (
//             <DateTimePicker
//               value={time}
//               mode="time"
//               display="default"
//               onChange={handleTimeChange}
//             />
//           )}

//           <Text style={styles.label}>Venue</Text>
//           <View style={styles.inputContainer}>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter Venue"
//               placeholderTextColor="rgba(0,0,0,0.7)"
//               value={venue}
//               onChangeText={setVenue}
//             />
//           </View>

//           <Text style={styles.label}>Players</Text>
//           <View style={styles.dropdownContainer}>
//             <SelectList
//               setSelected={setSelectedPlayers}
//               data={players}
//               save="key"
//               search={false}
//               boxStyles={styles.dropdown}
//               dropdownStyles={styles.dropdownMenu}
//               placeholder="Select Players"
//               multiple={true}
//             />
//           </View>

//           <TouchableOpacity
//             style={styles.saveButton}
//             onPress={handleSave}
//             disabled={isLoading}>
//             {isLoading ? (
//               <ActivityIndicator size="small" color="white" />
//             ) : (
//               <Text style={styles.buttonText}>Save Session</Text>
//             )}
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// // Keep your existing StyleSheet unchanged
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     paddingTop: 100,
//     position: 'relative',
//   },
//   gradientBackground: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 30,
//     backgroundColor: '#E6F2E6',
//     padding: 30,
//     borderBottomWidth: 1,
//     borderBottomColor: '#DFF4DF',
//     width: '100%',
//     position: 'absolute',
//     top: 0,
//     zIndex: 1,
//   },
//   backButtonContainer: {
//     position: 'absolute',
//     left: 10,
//     top: 10,
//   },
//   backButton: {
//     color: '#000080',
//     fontSize: 13,
//     fontWeight: '600',
//     marginTop: 25,
//   },
//   title: {
//     flex: 1,
//     textAlign: 'center',
//     color: '#000080',
//     fontSize: 22,
//     fontWeight: 'bold',
//   },
//   label: {
//     color: 'rgba(0,0,0,0.7)',
//     fontSize: 15,
//     fontWeight: 'bold',
//     padding: 2,
//     marginLeft: 5,
//     alignSelf: 'flex-start',
//   },
//   inputContainer: {
//     width: 300,
//     height: 50,
//     borderWidth: 2,
//     borderColor: 'rgba(28,58,107,1)',
//     borderRadius: 15,
//     justifyContent: 'center',
//     paddingLeft: 15,
//     marginTop: 10,
//   },
//   input: {
//     fontSize: 15,
//     color: 'black',
//     flex: 1,
//   },
//   dateInputWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     flex: 1,
//   },
//   dateInputText: {
//     fontSize: 15,
//     color: 'black',
//   },
//   calendarIcon: {
//     marginRight: 10,
//   },
//   saveButton: {
//     width: 300,
//     height: 50,
//     backgroundColor: 'rgba(0,100,0,1)',
//     borderRadius: 15,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   cancelButton: {
//     width: 300,
//     height: 50,
//     backgroundColor: 'rgba(0,100,0,1)',
//     borderRadius: 15,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 9,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   dropdownContainer: {
//     width: 300,
//     marginTop: 10,
//   },
//   dropdown: {
//     borderWidth: 2,
//     borderColor: 'rgba(28,58,107,1)',
//     borderRadius: 15,
//     height: 50,
//     justifyContent: 'center',
//     paddingLeft: 15,
//   },
//   dropdownMenu: {
//     borderWidth: 2,
//     borderColor: 'rgba(28,58,107,1)',
//     borderRadius: 15,
//     marginTop: 5,
//   },
//   dropdownItem: {
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: 'black',
//   },
//   dropdownText: {
//     fontSize: 14,
//     color: '#000',
//   },
//   arrowIconContainer: {
//     position: 'absolute',
//     right: 10,
//     top: 12,
//   },
//   arrowIcon: {
//     fontSize: 16,
//     color: 'rgba(28,58,107,1)',
//   },
// });

// export default ArrangeSessionScreen;
