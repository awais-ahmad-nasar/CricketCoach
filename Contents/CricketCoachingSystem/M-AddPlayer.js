// import {ip_adress} from './IP-config';
// import React, {useState} from 'react';
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
// import CustomGradient from './components/CustomGradient';

// const AddPlayerScreen = ({navigation}) => {
//   const [name, setName] = useState('');
//   const [age, setAge] = useState('');
//   const [experience, setExperience] = useState('');
//   const [contact, setContact] = useState('');
//   const [type, setType] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   // Handle form submission
//   const handleSave = async () => {
//     if (
//       !name ||
//       !age ||
//       !experience ||
//       !contact ||
//       !type ||
//       !username ||
//       !password
//     ) {
//       Alert.alert('Error', 'Please fill all fields');
//       return;
//     }

//     setIsLoading(true);

//     const playerData = {
//       name,
//       age: parseInt(age),
//       experience: parseInt(experience),
//       contact_no: contact,
//       type,
//       username,
//       password,
//     };

//     try {
//       const response = await fetch(ip_adress + '/api/admin/add_player', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(playerData),
//       });

//       const data = await response.json();

//       if (response.status === 201) {
//         Alert.alert('Success', data.message, [
//           {text: 'OK', onPress: () => navigation.goBack()},
//         ]);
//       } else {
//         Alert.alert('Error', data.error || 'Something went wrong');
//       }
//     } catch (error) {
//       console.error('Network Error:', error);
//       Alert.alert('Error', 'Network error or API failure');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.scrollContainer}>
//       <View style={styles.container}>
//         {/* Custom Gradient Background */}
//         <CustomGradient style={styles.gradientBackground} />

//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity
//             style={styles.backButtonContainer}
//             activeOpacity={0.5}
//             onPress={() => navigation.goBack('PlayerScreen')}>
//             <Text style={styles.backButton}>{'<Back'}</Text>
//           </TouchableOpacity>
//           <Text style={styles.title}>Add Player</Text>
//         </View>

//         {/* Form Inputs */}
//         <Text style={styles.label}>Name</Text>
//         <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter Name"
//             placeholderTextColor="rgba(0,0,0,0.7)"
//             value={name}
//             onChangeText={setName}
//           />
//         </View>

//         <Text style={styles.label}>Age</Text>
//         <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter Age"
//             placeholderTextColor="rgba(0,0,0,0.7)"
//             value={age}
//             onChangeText={setAge}
//             keyboardType="numeric"
//           />
//         </View>

//         <Text style={styles.label}>Experience</Text>
//         <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter Experience"
//             placeholderTextColor="rgba(0,0,0,0.7)"
//             value={experience}
//             onChangeText={setExperience}
//             keyboardType="numeric"
//           />
//         </View>

//         <Text style={styles.label}>Contact Number</Text>
//         <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter Contact Number"
//             placeholderTextColor="rgba(0,0,0,0.7)"
//             value={contact}
//             onChangeText={setContact}
//             keyboardType="phone-pad"
//           />
//         </View>

//         <Text style={styles.label}>Type</Text>
//         <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter Type"
//             placeholderTextColor="rgba(0,0,0,0.7)"
//             value={type}
//             onChangeText={setType}
//           />
//         </View>

//         <Text style={styles.label}>Username</Text>
//         <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter Username"
//             placeholderTextColor="rgba(0,0,0,0.7)"
//             value={username}
//             onChangeText={setUsername}
//           />
//         </View>

//         <Text style={styles.label}>Password</Text>
//         <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter Password"
//             placeholderTextColor="rgba(0,0,0,0.7)"
//             value={password}
//             secureTextEntry={true}
//             onChangeText={setPassword}
//           />
//         </View>

//         {/* Save and Cancel Buttons */}
//         <TouchableOpacity
//           style={styles.saveButton}
//           onPress={handleSave}
//           disabled={isLoading}>
//           {isLoading ? (
//             <ActivityIndicator size="small" color="white" />
//           ) : (
//             <Text style={styles.buttonText}>Save</Text>
//           )}
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.cancelButton}
//           onPress={() => navigation.goBack()}>
//           <Text style={styles.buttonText}>Cancel</Text>
//         </TouchableOpacity>
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
//     marginLeft: 34,
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
// });

// export default AddPlayerScreen;

//....................WITH RESPECT TO DOB............................
// import {ip_adress} from './IP-config';
// import React, {useState} from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   ScrollView,
//   Alert,
//   ActivityIndicator,
//   Modal,
// } from 'react-native';
// import {SelectList} from 'react-native-dropdown-select-list';
// import CustomGradient from './components/CustomGradient';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import DateTimePicker from '@react-native-community/datetimepicker';

// const AddPlayerScreen = ({navigation}) => {
//   const [name, setName] = useState('');
//   const [dateOfBirth, setDateOfBirth] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [experience, setExperience] = useState('');
//   const [contact, setContact] = useState('');
//   const [type, setType] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSuccessPopupVisible, setIsSuccessPopupVisible] = useState(false);

//   const battingTypeOptions = [
//     {key: 'Left-Hand Batsman', value: 'Left-Hand Batsman'},
//     {key: 'Right-Hand Batsman', value: 'Right-Hand Batsman'},
//   ];

//   const formatDate = date => {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     return `${year}/${month}/${day}`;
//   };

//   const handleDateChange = (event, selectedDate) => {
//     setShowDatePicker(false); // Hide the date picker
//     if (selectedDate) {
//       setDateOfBirth(selectedDate); // Update the selected date
//     }
//   };

//   const handleSave = async () => {
//     if (
//       !name ||
//       !dateOfBirth ||
//       !experience ||
//       !contact ||
//       !type ||
//       !username ||
//       !password
//     ) {
//       Alert.alert('Error', 'Please fill all fields');
//       return;
//     }

//     setIsLoading(true);

//     const playerData = {
//       name,
//       date_of_birth: formatDate(dateOfBirth), // Ensure this matches the backend format
//       experience: parseInt(experience),
//       contact_no: contact,
//       type,
//       username,
//       password,
//     };

//     try {
//       const response = await fetch(ip_adress + '/api/admin/add_player', {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify(playerData),
//       });

//       const data = await response.json();
//       if (response.status === 201) {
//         setIsSuccessPopupVisible(true); // Show success popup
//       } else if (response.status === 409) {
//         // Handle duplicate player case
//         Alert.alert('Error', 'Player already exists in the database');
//       } else {
//         Alert.alert('Error', data.error || 'Something went wrong');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Network error or API failure');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handlePopupClose = () => {
//     setIsSuccessPopupVisible(false);
//     navigation.goBack(); // Navigate back after closing the popup
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.scrollContainer}>
//       <View style={styles.container}>
//         <CustomGradient style={styles.gradientBackground} />

//         <View style={styles.header}>
//           <TouchableOpacity
//             style={styles.backButtonContainer}
//             onPress={() => navigation.goBack('PlayerScreen')}>
//             <Text style={styles.backButton}>{'<Back'}</Text>
//           </TouchableOpacity>
//           <Text style={styles.title}>Add Player</Text>
//         </View>

//         <Text style={styles.label}>Name</Text>
//         <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter Name"
//             placeholderTextColor="rgba(0,0,0,0.7)"
//             value={name}
//             onChangeText={setName}
//           />
//         </View>

//         <Text style={styles.label}>Date of Birth</Text>
//         <TouchableOpacity
//           style={styles.inputContainer}
//           onPress={() => setShowDatePicker(true)}>
//           <View style={styles.dateInputWrapper}>
//             <Text style={styles.dateInputText}>{formatDate(dateOfBirth)}</Text>
//             <MaterialIcons
//               name="calendar-today"
//               size={24}
//               color="#000080"
//               style={styles.calendarIcon}
//             />
//           </View>
//         </TouchableOpacity>

//         {showDatePicker && (
//           <DateTimePicker
//             value={dateOfBirth}
//             mode="date"
//             display="default"
//             onChange={handleDateChange}
//           />
//         )}

//         <Text style={styles.label}>Experience</Text>
//         <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="Years of Experience"
//             placeholderTextColor="rgba(0,0,0,0.7)"
//             value={experience}
//             onChangeText={setExperience}
//             keyboardType="numeric"
//           />
//         </View>

//         <Text style={styles.label}>Contact Number</Text>
//         <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="Phone Number"
//             placeholderTextColor="rgba(0,0,0,0.7)"
//             value={contact}
//             onChangeText={setContact}
//             keyboardType="phone-pad"
//           />
//         </View>

//         <Text style={styles.label}>Batting Type</Text>
//         <View style={styles.dropdownContainer}>
//           <SelectList
//             setSelected={setType}
//             data={battingTypeOptions}
//             save="key"
//             search={false}
//             boxStyles={styles.dropdown}
//             dropdownStyles={styles.dropdownMenu}
//             dropdownItemStyles={styles.dropdownItem}
//             dropdownTextStyles={styles.dropdownText}
//             arrowicon={
//               <View style={styles.arrowIconContainer}>
//                 <Text style={styles.arrowIcon}>▼</Text>
//               </View>
//             }
//           />
//         </View>

//         <Text style={styles.label}>Username</Text>
//         <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="Create Username"
//             placeholderTextColor="rgba(0,0,0,0.7)"
//             value={username}
//             onChangeText={setUsername}
//           />
//         </View>

//         <Text style={styles.label}>Password</Text>
//         <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="Create Password"
//             placeholderTextColor="rgba(0,0,0,0.7)"
//             value={password}
//             secureTextEntry={true}
//             onChangeText={setPassword}
//           />
//         </View>

//         <TouchableOpacity
//           style={styles.saveButton}
//           onPress={handleSave}
//           disabled={isLoading}>
//           {isLoading ? (
//             <ActivityIndicator size="small" color="white" />
//           ) : (
//             <Text style={styles.buttonText}>Save</Text>
//           )}
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.cancelButton}
//           onPress={() => navigation.goBack()}>
//           <Text style={styles.buttonText}>Cancel</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Success Popup */}
//       <Modal
//         visible={isSuccessPopupVisible}
//         transparent={true}
//         animationType="slide">
//         <View style={styles.modalContainer}>
//           <View style={styles.popupContainer}>
//             <Text style={styles.popupTitle}>Success!</Text>
//             <Text style={styles.popupText}>Player added successfully.</Text>
//             <TouchableOpacity
//               style={styles.popupButton}
//               onPress={handlePopupClose}>
//               <Text style={styles.popupButtonText}>OK</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
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
//     marginLeft: 34,
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
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   popupContainer: {
//     backgroundColor: 'white',
//     borderRadius: 15,
//     padding: 20,
//     alignItems: 'center',
//     width: '80%',
//   },
//   popupTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#000080',
//     marginBottom: 10,
//   },
//   popupText: {
//     fontSize: 16,
//     color: '#333',
//     marginBottom: 20,
//   },
//   popupButton: {
//     backgroundColor: '#000080',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//   },
//   popupButtonText: {
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

// export default AddPlayerScreen;

// .................. ANEEQ API .......................

import {ip_adress} from './IP-config';
import React, {useState} from 'react';
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
} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import CustomGradient from './components/CustomGradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddPlayerScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [experience, setExperience] = useState('');
  const [contact, setContact] = useState('');
  const [type, setType] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // const [isSuccessPopupVisible, setIsSuccessPopupVisible] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const battingTypeOptions = [
    {key: 'Left-Hand Batsman', value: 'Left-Hand Batsman'},
    {key: 'Right-Hand Batsman', value: 'Right-Hand Batsman'},
  ];

  const formatDate = date => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDateOfBirth(selectedDate);
    }
  };

  const validateInputs = () => {
    const errors = [];
    if (!name.trim()) errors.push('Name is required');
    if (!dateOfBirth) errors.push('Date of birth is required');
    if (!experience || isNaN(experience))
      errors.push('Valid experience is required');
    if (!contact) errors.push('Contact number is required');
    if (!type) errors.push('Batting type is required');
    if (!username.trim()) errors.push('Username is required');
    if (!password.trim()) errors.push('Password is required');

    if (errors.length > 0) {
      Alert.alert('Validation Error', errors.join('\n'));
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateInputs()) return;

    setIsLoading(true);

    const playerData = {
      name: name.trim(),
      date_of_birth: formatDate(dateOfBirth),
      experience: parseInt(experience),
      contact_no: contact.trim(),
      type: type,
      username: username.trim(),
      password: password.trim(),
      role: 'player', // Added role as per backend
    };

    try {
      const response = await fetch(ip_adress + '/manager/add_player', {
        // Updated endpoint
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(playerData),
      });

      const data = await response.json();
      if (response.status === 201) {
        setShowSuccessModal(true);
      } else if (response.status === 400) {
        // Handle duplicate player case
        Alert.alert('Error', data.message || 'Player already exists');
      } else {
        Alert.alert('Error', data.message || 'Something went wrong');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error - Please check your connection');
    } finally {
      setIsLoading(false);
    }
  };

  // const handlePopupClose = () => {
  //   setIsSuccessPopupVisible(false);
  //   navigation.goBack();
  // };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigation.navigate('managerdashboard');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <CustomGradient style={styles.gradientBackground} />

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButtonContainer}
            onPress={() => navigation.goBack('PlayerScreen')}>
            <Text style={styles.backButton}>{'<Back'}</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Add Player</Text>
        </View>

        <Text style={styles.label}>Name</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Name"
            placeholderTextColor="rgba(0,0,0,0.7)"
            value={name}
            onChangeText={setName}
            maxLength={50} // Matches DB schema
          />
        </View>

        <Text style={styles.label}>Date of Birth</Text>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => setShowDatePicker(true)}>
          <View style={styles.dateInputWrapper}>
            <Text style={styles.dateInputText}>{formatDate(dateOfBirth)}</Text>
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
            value={dateOfBirth}
            mode="date"
            display="default"
            onChange={handleDateChange}
            maximumDate={new Date()} // Prevent future dates
          />
        )}

        <Text style={styles.label}>Experience (Years)</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Years of Experience"
            placeholderTextColor="rgba(0,0,0,0.7)"
            value={experience}
            onChangeText={setExperience}
            keyboardType="numeric"
            maxLength={2} // Reasonable limit for years
          />
        </View>

        <Text style={styles.label}>Contact Number</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="rgba(0,0,0,0.7)"
            value={contact}
            onChangeText={setContact}
            keyboardType="phone-pad"
            maxLength={20} // Matches DB schema
          />
        </View>

        <Text style={styles.label}>Batting Type</Text>
        <View style={styles.dropdownContainer}>
          <SelectList
            setSelected={setType}
            data={battingTypeOptions}
            save="key"
            search={false}
            boxStyles={styles.dropdown}
            dropdownStyles={styles.dropdownMenu}
            dropdownItemStyles={styles.dropdownItem}
            dropdownTextStyles={styles.dropdownText}
            placeholder="Select Batting Type"
            arrowicon={
              <View style={styles.arrowIconContainer}>
                <Text style={styles.arrowIcon}>▼</Text>
              </View>
            }
          />
        </View>

        <Text style={styles.label}>Username</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Create Username"
            placeholderTextColor="rgba(0,0,0,0.7)"
            value={username}
            onChangeText={setUsername}
            maxLength={30} // Matches DB schema
            autoCapitalize="none"
          />
        </View>

        <Text style={styles.label}>Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Create Password"
            placeholderTextColor="rgba(0,0,0,0.7)"
            value={password}
            secureTextEntry={true}
            onChangeText={setPassword}
            maxLength={20} // Matches DB schema
          />
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.buttonText}>Save</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      {/* Success Popup */}
      {/* <Modal
        visible={isSuccessPopupVisible}
        transparent={true}
        animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.popupContainer}>
            <Text style={styles.popupTitle}>Success!</Text>
            <Text style={styles.popupText}>
              Player created and added to the Pool
            </Text>
            <TouchableOpacity
              style={styles.popupButton}
              onPress={handlePopupClose}>
              <Text style={styles.popupButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}

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
                Player has been added successfully.
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
    marginLeft: 34,
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
  cancelButton: {
    width: 300,
    height: 50,
    backgroundColor: 'rgba(0,100,0,1)',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 9,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // modalContainer: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: 'rgba(0,0,0,0.5)',
  // },
  // popupContainer: {
  //   backgroundColor: 'white',
  //   borderRadius: 15,
  //   padding: 20,
  //   alignItems: 'center',
  //   width: '80%',
  // },
  // popupTitle: {
  //   fontSize: 20,
  //   fontWeight: 'bold',
  //   color: '#000080',
  //   marginBottom: 10,
  // },
  // popupText: {
  //   fontSize: 16,
  //   color: '#333',
  //   marginBottom: 20,
  // },
  // popupButton: {
  //   backgroundColor: '#000080',
  //   paddingVertical: 10,
  //   paddingHorizontal: 20,
  //   borderRadius: 8,
  // },
  // popupButtonText: {
  //   color: 'white',
  //   fontSize: 16,
  //   fontWeight: 'bold',
  // },

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
  },
  dropdownItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  dropdownText: {
    fontSize: 14,
    color: '#000',
  },
  arrowIconContainer: {
    position: 'absolute',
    right: 10,
    top: 12,
  },
  arrowIcon: {
    fontSize: 16,
    color: 'rgba(28,58,107,1)',
  },
});

export default AddPlayerScreen;

//........................WRT AGE........................
// import {ip_adress} from './IP-config';
// import React, {useState} from 'react';
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

// const AddPlayerScreen = ({navigation}) => {
//   const [name, setName] = useState('');
//   const [age, setAge] = useState('');
//   const [experience, setExperience] = useState('');
//   const [contact, setContact] = useState('');
//   const [type, setType] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const battingTypeOptions = [
//     {key: 'Left-Hand Batsman', value: 'Left-Hand Batsman'},
//     {key: 'Right-Hand Batsman', value: 'Right-Hand Batsman'},
//   ];

//   const handleSave = async () => {
//     if (
//       !name ||
//       !age ||
//       !experience ||
//       !contact ||
//       !type ||
//       !username ||
//       !password
//     ) {
//       Alert.alert('Error', 'Please fill all fields');
//       return;
//     }

//     setIsLoading(true);

//     const playerData = {
//       name,
//       age: parseInt(age),
//       experience: parseInt(experience),
//       contact_no: contact,
//       type,
//       username,
//       password,
//     };

//     try {
//       const response = await fetch(ip_adress + '/api/admin/add_player', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(playerData),
//       });

//       const data = await response.json();

//       if (response.status === 201) {
//         Alert.alert('Success', data.message, [
//           {text: 'OK', onPress: () => navigation.goBack()},
//         ]);
//       } else {
//         Alert.alert('Error', data.error || 'Something went wrong');
//       }
//     } catch (error) {
//       console.error('Network Error:', error);
//       Alert.alert('Error', 'Network error or API failure');
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
//             activeOpacity={0.5}
//             onPress={() => navigation.goBack('PlayerScreen')}>
//             <Text style={styles.backButton}>{'<Back'}</Text>
//           </TouchableOpacity>
//           <Text style={styles.title}>Add Player</Text>
//         </View>

//         <Text style={styles.label}>Name</Text>
//         <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter Name"
//             placeholderTextColor="rgba(0,0,0,0.7)"
//             value={name}
//             onChangeText={setName}
//           />
//         </View>

//         <Text style={styles.label}>Age</Text>
//         <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter Age"
//             placeholderTextColor="rgba(0,0,0,0.7)"
//             value={age}
//             onChangeText={setAge}
//             keyboardType="numeric"
//           />
//         </View>

//         <Text style={styles.label}>Experience</Text>
//         <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter Experience"
//             placeholderTextColor="rgba(0,0,0,0.7)"
//             value={experience}
//             onChangeText={setExperience}
//             keyboardType="numeric"
//           />
//         </View>

//         <Text style={styles.label}>Contact Number</Text>
//         <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter Contact Number"
//             placeholderTextColor="rgba(0,0,0,0.7)"
//             value={contact}
//             onChangeText={setContact}
//             keyboardType="phone-pad"
//           />
//         </View>

//         <Text style={styles.label}>Type</Text>
//         <View style={styles.dropdownContainer}>
//           <SelectList
//             setSelected={setType}
//             data={battingTypeOptions}
//             save="key"
//             search={false}
//             boxStyles={styles.dropdown}
//             dropdownStyles={styles.dropdownMenu}
//             dropdownItemStyles={styles.dropdownItem}
//             dropdownTextStyles={styles.dropdownText}
//             arrowicon={
//               <View style={styles.arrowIconContainer}>
//                 <Text style={styles.arrowIcon}>▼</Text>
//               </View>
//             }
//           />
//         </View>

//         <Text style={styles.label}>Username</Text>
//         <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter Username"
//             placeholderTextColor="rgba(0,0,0,0.7)"
//             value={username}
//             onChangeText={setUsername}
//           />
//         </View>

//         <Text style={styles.label}>Password</Text>
//         <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter Password"
//             placeholderTextColor="rgba(0,0,0,0.7)"
//             value={password}
//             secureTextEntry={true}
//             onChangeText={setPassword}
//           />
//         </View>

//         <TouchableOpacity
//           style={styles.saveButton}
//           onPress={handleSave}
//           disabled={isLoading}>
//           {isLoading ? (
//             <ActivityIndicator size="small" color="white" />
//           ) : (
//             <Text style={styles.buttonText}>Save</Text>
//           )}
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.cancelButton}
//           onPress={() => navigation.goBack()}>
//           <Text style={styles.buttonText}>Cancel</Text>
//         </TouchableOpacity>
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
//     marginLeft: 34,
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
// });

// export default AddPlayerScreen;
