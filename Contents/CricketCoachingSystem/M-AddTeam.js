// import React, {useState, useEffect} from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   Image,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import {SelectList} from 'react-native-dropdown-select-list';
// import CustomGradient from './components/CustomGradient';
// import {Dialog, Button} from 'react-native-paper';
// import CustomMultiSelect from './components/CustomMultiSelect';
// import {ip_adress} from './IP-config';

// const AddTeamScreen = ({navigation, route}) => {
//   const {teamId, existingTeam} = route.params || {};
//   const [name, setName] = useState(existingTeam?.name || '');
//   const [coach, setCoach] = useState(existingTeam?.coach_id?.toString() || '');
//   const [coachOptions, setCoachOptions] = useState([]);
//   const [playerOptions, setPlayerOptions] = useState([]);
//   const [selectedPlayers, setSelectedPlayers] = useState(
//     existingTeam?.player_ids?.map(String) || [],
//   );
//   const [isLoading, setIsLoading] = useState(false);
//   const [teamLogo, setTeamLogo] = useState(null);
//   const [isSuccessPopupVisible, setIsSuccessPopupVisible] = useState(false);
//   const [existingTeamId, setExistingTeamId] = useState(null);

//   const localImages = {
//     'Lahore Qalandars': require('../CricketCoachingSystem/images/Lahore.png'),
//     'Karachi Kings': require('../CricketCoachingSystem/images/KarachiKings.png'),
//     'Peshawar Zalmi': require('../CricketCoachingSystem/images/PeshawarZalmi.png'),
//     'Islamabad United': require('../CricketCoachingSystem/images/Islamabad.png'),
//     'Quetta Gladiators': require('../CricketCoachingSystem/images/Quetta.png'),
//   };

//   // Check if team exists by name
//   useEffect(() => {
//     const checkTeamExists = async () => {
//       if (!name) return;

//       try {
//         const response = await fetch(
//           `${ip_adress}/api/admin/team_by_name?name=${encodeURIComponent(
//             name,
//           )}`,
//         );
//         const data = await response.json();

//         if (response.ok) {
//           setExistingTeamId(data.team_id || null);
//         } else {
//           setExistingTeamId(null);
//         }
//       } catch (error) {
//         console.error('Error checking team:', error);
//         setExistingTeamId(null);
//       }
//     };

//     const debounceTimer = setTimeout(checkTeamExists, 500);
//     return () => clearTimeout(debounceTimer);
//   }, [name]);

//   // Fetch available coaches and players with error handling
//   useEffect(() => {
//     const fetchAvailability = async () => {
//       try {
//         const params = new URLSearchParams();
//         if (existingTeamId) params.append('team_id', existingTeamId);

//         const [coachesRes, playersRes] = await Promise.all([
//           fetch(`${ip_adress}/api/admin/available_coaches?${params}`),
//           fetch(`${ip_adress}/api/admin/available_players?${params}`),
//         ]);

//         if (!coachesRes.ok) throw new Error('Failed to fetch coaches');
//         if (!playersRes.ok) throw new Error('Failed to fetch players');

//         const coachesData = await coachesRes.json();
//         const playersData = await playersRes.json();

//         setCoachOptions(
//           coachesData.coaches.map(c => ({
//             key: c.id.toString(),
//             value: c.name,
//             disabled: false,
//           })),
//         );

//         setPlayerOptions(
//           playersData.players.map(p => ({
//             key: p.id.toString(),
//             value: p.name,
//             disabled: false,
//           })),
//         );
//       } catch (error) {
//         Alert.alert('Error', error.message);
//       }
//     };

//     fetchAvailability();
//   }, [existingTeamId]);

//   const handleTeamNameChange = teamName => {
//     setName(teamName);
//     setTeamLogo(localImages[teamName] || null);
//     if (!teamName) {
//       setExistingTeamId(null);
//       setCoach('');
//       setSelectedPlayers([]);
//     }
//   };

//   const validateInputs = () => {
//     if (!name.trim()) {
//       Alert.alert('Error', 'Please enter a team name');
//       return false;
//     }
//     if (!coach) {
//       Alert.alert('Error', 'Please select a coach');
//       return false;
//     }
//     if (selectedPlayers.length === 0) {
//       Alert.alert('Error', 'Please select at least one player');
//       return false;
//     }
//     return true;
//   };

//   const handleSave = async () => {
//     if (!validateInputs()) return;

//     setIsLoading(true);
//     const payload = {
//       name: name.trim(),
//       coach_id: parseInt(coach),
//       player_ids: [...new Set(selectedPlayers)].map(Number), // Remove duplicates
//     };

//     try {
//       const url = existingTeamId
//         ? `${ip_adress}/api/admin/update_team/${existingTeamId}`
//         : `${ip_adress}/api/admin/add_team_with_coach_and_players`;

//       const method = existingTeamId ? 'PUT' : 'POST';

//       const response = await fetch(url, {
//         method,
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || 'Operation failed');
//       }

//       setIsSuccessPopupVisible(true);
//     } catch (error) {
//       Alert.alert('Error', error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handlePopupClose = () => {
//     setIsSuccessPopupVisible(false);
//     navigation.goBack();
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}>
//       <CustomGradient style={styles.gradientBackground} />

//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backButtonContainer}
//           activeOpacity={0.5}
//           onPress={() => navigation.goBack()}>
//           <Text style={styles.backButton}>{'<Back'}</Text>
//         </TouchableOpacity>
//         <Text style={styles.title}>
//           {existingTeamId ? 'Edit Team' : 'Add Team'}
//         </Text>
//       </View>

//       <View style={styles.content}>
//         {teamLogo && <Image source={teamLogo} style={styles.profileImage} />}

//         <Text style={styles.label}>Team Name</Text>
//         <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter Team Name"
//             placeholderTextColor="rgba(0,0,0,0.7)"
//             value={name}
//             onChangeText={handleTeamNameChange}
//             maxLength={50}
//           />
//         </View>

//         <Text style={styles.label}>Appoint Coach</Text>
//         <View style={{width: '100%', alignItems: 'center'}}>
//           <SelectList
//             setSelected={setCoach}
//             data={coachOptions}
//             save="key"
//             search={false}
//             placeholder="Select Coach"
//             boxStyles={styles.dropdown}
//             dropdownStyles={styles.dropdownMenu}
//             dropdownItemStyles={styles.dropdownItem}
//             dropdownTextStyles={styles.dropdownText}
//             defaultOption={coachOptions.find(o => o.key === coach)}
//           />
//         </View>

//         <Text style={styles.label}>Select Players</Text>
//         <View style={{width: '100%', alignItems: 'center'}}>
//           <CustomMultiSelect
//             items={playerOptions}
//             selectedItems={selectedPlayers}
//             onSelectedItemsChange={setSelectedPlayers}
//             placeholder="Select Players"
//             maxSelect={15}
//           />
//         </View>

//         <TouchableOpacity
//           style={styles.saveButton}
//           onPress={handleSave}
//           disabled={isLoading}>
//           <Text style={styles.buttonText}>
//             {isLoading ? 'Saving...' : 'Save'}
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.cancelButton}
//           onPress={() => navigation.goBack()}>
//           <Text style={styles.buttonText}>Cancel</Text>
//         </TouchableOpacity>
//       </View>

//       <Dialog visible={isSuccessPopupVisible} onDismiss={handlePopupClose}>
//         <Dialog.Title style={styles.popupTitle}>Success!</Dialog.Title>
//         <Dialog.Content>
//           <Text style={styles.popupText}>
//             Team {existingTeamId ? 'updated' : 'created'} successfully
//           </Text>
//         </Dialog.Content>
//         <Dialog.Actions>
//           <Button onPress={handlePopupClose} textColor="#000080">
//             OK
//           </Button>
//         </Dialog.Actions>
//       </Dialog>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   gradientBackground: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#E6F2E6',
//     padding: 30,
//     borderBottomWidth: 1,
//     borderBottomColor: '#DFF4DF',
//     width: '100%',
//   },
//   backButtonContainer: {
//     position: 'absolute',
//     left: 10,
//   },
//   backButton: {
//     color: '#000080',
//     fontSize: 13,
//     fontWeight: '600',
//   },
//   title: {
//     color: '#000080',
//     fontSize: 22,
//     fontWeight: 'bold',
//   },
//   content: {
//     flex: 1,
//     width: '100%',
//     paddingTop: 20,
//     alignItems: 'center',
//   },
//   profileImage: {
//     width: 150,
//     height: 150,
//     borderRadius: 75,
//     borderWidth: 2,
//     borderColor: 'rgba(28,58,107,1)',
//     marginTop: 20,
//   },
//   label: {
//     color: 'rgba(0,0,0,0.7)',
//     fontSize: 15,
//     fontWeight: 'bold',
//     padding: 10,
//     marginBottom: 8,
//     marginTop: 5,
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
//     color: 'rgba(0,0,0,0.7)',
//   },
//   // dropdown: {
//   //   borderWidth: 2,
//   //   borderColor: 'rgba(28,58,107,1)',
//   //   borderRadius: 15,
//   //   width: '83%',
//   // },
//   // dropdownMenu: {
//   //   position: 'absolute',
//   //   top: 50,
//   //   width: '82%',
//   //   backgroundColor: 'white',
//   //   borderColor: 'rgba(28,58,107,1)',
//   //   zIndex: 999,
//   // },
//   dropdown: {
//     borderWidth: 2,
//     borderColor: 'rgba(28,58,107,1)',
//     borderRadius: 15,
//     width: '83%',
//   },
//   dropdownMenu: {
//     position: 'absolute',
//     top: 50,
//     width: '82%',
//     backgroundColor: 'white',
//     borderColor: 'rgba(28,58,107,1)',
//     borderWidth: 1,
//     borderRadius: 15,
//     zIndex: 999,
//   },
//   dropdownItem: {
//     paddingVertical: 10,
//     borderBottomWidth: 1, // Add a divider between items
//     borderBottomColor: '#ccc', // Divider color
//   },
//   dropdownText: {
//     fontSize: 14,
//     color: '#000',
//     paddingHorizontal: 10,
//   },

//   saveButton: {
//     width: 300,
//     height: 50,
//     backgroundColor: 'rgba(0,100,0,1)',
//     borderRadius: 15,
//     justifyContent: 'center',
//     alignItems: 'center',

//     marginTop: 70,
//   },
//   cancelButton: {
//     width: 300,
//     height: 50,
//     backgroundColor: 'rgba(0,100,0,1)',
//     borderRadius: 15,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 13,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   popupTitle: {
//     color: '#000080',
//     fontWeight: 'bold',
//   },
//   popupText: {
//     fontSize: 16,
//     color: '#333',
//   },
// });

// export default AddTeamScreen;

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import CustomGradient from './components/CustomGradient';
import {Dialog, Button} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomMultiSelect from './components/CustomMultiSelect';
import {ip_adress} from './IP-config';

const AddTeamScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [coach, setCoach] = useState('');
  const [coachOptions, setCoachOptions] = useState([]);
  const [playerOptions, setPlayerOptions] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [teamLogo, setTeamLogo] = useState(null);
  // const [isSuccessPopupVisible, setIsSuccessPopupVisible] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const localImages = {
    'Lahore Qalandars': require('../CricketCoachingSystem/images/Lahore.png'),
    'Karachi Kings': require('../CricketCoachingSystem/images/KarachiKings.png'),
    'Peshawar Zalmi': require('../CricketCoachingSystem/images/PeshawarZalmi.png'),
    'Islamabad United': require('../CricketCoachingSystem/images/Islamabad.png'),
    'Quetta Gladiators': require('../CricketCoachingSystem/images/Quetta.png'),
  };

  // Fetch available coaches and players
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const [coachesRes, playersRes] = await Promise.all([
          fetch(`${ip_adress}/manager/appoint_coach`),
          fetch(`${ip_adress}/manager/assign_player`),
        ]);

        const coachesData = await coachesRes.json();
        const playersData = await playersRes.json();

        if (coachesData.value) {
          setCoachOptions(
            coachesData.coaches.map(c => ({
              key: c.id.toString(),
              value: c.name,
            })),
          );
        }

        if (playersData.value) {
          setPlayerOptions(
            playersData.players.map(p => ({
              key: p.id.toString(),
              value: p.name,
            })),
          );
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch available coaches and players');
      }
    };

    fetchAvailability();
  }, []);

  const handleTeamNameChange = teamName => {
    setName(teamName);
    setTeamLogo(localImages[teamName] || null);
  };

  const validateInputs = () => {
    const errors = [];
    if (!name.trim()) errors.push('Team name is required');
    if (!coach) errors.push('Please select a coach');
    if (selectedPlayers.length < 1) errors.push('At least one player required');
    if (selectedPlayers.length > 15) errors.push('Maximum 15 players allowed');

    if (errors.length > 0) {
      Alert.alert('Validation Error', errors.join('\n'));
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateInputs()) return;

    setIsLoading(true);

    const payload = {
      name: name.trim(),
      coach: coachOptions.find(c => c.key === coach)?.value,
      player: selectedPlayers
        .map(pId => playerOptions.find(p => p.key === pId)?.value)
        .filter(Boolean),
    };

    try {
      const response = await fetch(`${ip_adress}/manager/add_team`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to save team configuration');
      }

      setShowSuccessModal(true);
    } catch (error) {
      Alert.alert('Error', error.message);
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <CustomGradient style={styles.gradientBackground} />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButtonContainer}
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>{'< Back'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Create New Team</Text>
      </View>

      <View style={styles.content}>
        {teamLogo && <Image source={teamLogo} style={styles.profileImage} />}

        <Text style={styles.label}>Team Name</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Team Name"
            placeholderTextColor="rgba(0,0,0,0.7)"
            value={name}
            onChangeText={handleTeamNameChange}
            maxLength={50}
          />
        </View>

        <Text style={styles.label}>Appoint Coach</Text>
        <View style={{width: '100%', alignItems: 'center'}}>
          <SelectList
            setSelected={setCoach}
            data={coachOptions}
            save="key"
            search={false}
            placeholder="Select Coach"
            boxStyles={styles.dropdown}
            dropdownStyles={styles.dropdownMenu}
            dropdownItemStyles={styles.dropdownItem}
            dropdownTextStyles={styles.dropdownText}
          />
        </View>

        <Text style={styles.label}>Select Players (1-15)</Text>
        <View style={{width: '100%', alignItems: 'center'}}>
          <CustomMultiSelect
            items={playerOptions}
            selectedItems={selectedPlayers}
            onSelectedItemsChange={setSelectedPlayers}
            placeholder="Select Players"
            maxSelect={15}
          />
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          disabled={isLoading}>
          <Text style={styles.buttonText}>
            {isLoading ? 'Saving...' : 'Create Team'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* <Dialog visible={isSuccessPopupVisible} onDismiss={handlePopupClose}>
        <Dialog.Title style={styles.popupTitle}>Success!</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.popupText}>
            Team configuration saved successfully
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handlePopupClose} textColor="#000080">
            OK
          </Button>
        </Dialog.Actions>
      </Dialog> */}

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
                Team has been added successfully.
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E6F2E6',
    padding: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#DFF4DF',
    width: '100%',
  },
  backButtonContainer: {
    position: 'absolute',
    left: 10,
  },
  backButton: {
    color: '#000080',
    fontSize: 13,
    fontWeight: '600',
  },
  title: {
    color: '#000080',
    fontSize: 22,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    width: '100%',
    paddingTop: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: 'rgba(28,58,107,1)',
    marginTop: 20,
  },
  label: {
    color: 'rgba(0,0,0,0.7)',
    fontSize: 15,
    fontWeight: 'bold',
    padding: 10,
    marginBottom: 8,
    marginTop: 5,
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
    color: 'rgba(0,0,0,0.7)',
  },
  // dropdown: {
  //   borderWidth: 2,
  //   borderColor: 'rgba(28,58,107,1)',
  //   borderRadius: 15,
  //   width: '83%',
  // },
  // dropdownMenu: {
  //   position: 'absolute',
  //   top: 50,
  //   width: '82%',
  //   backgroundColor: 'white',
  //   borderColor: 'rgba(28,58,107,1)',
  //   zIndex: 999,
  // },

  dropdown: {
    borderWidth: 2,
    borderColor: 'rgba(28,58,107,1)',
    borderRadius: 15,
    width: '83%',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 50,
    width: '82%',
    backgroundColor: 'white',
    borderColor: 'rgba(28,58,107,1)',
    borderWidth: 1,
    borderRadius: 15,
    zIndex: 999,
  },
  dropdownItem: {
    paddingVertical: 10,
    borderBottomWidth: 1, // Add a divider between items
    borderBottomColor: '#ccc', // Divider color
  },
  dropdownText: {
    fontSize: 14,
    color: '#000',
    paddingHorizontal: 10,
  },

  saveButton: {
    width: 300,
    height: 50,
    backgroundColor: 'rgba(0,100,0,1)',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 70,
  },
  cancelButton: {
    width: 300,
    height: 50,
    backgroundColor: 'rgba(0,100,0,1)',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 13,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // popupTitle: {
  //   color: '#000080',
  //   fontWeight: 'bold',
  // },
  // popupText: {
  //   fontSize: 16,
  //   color: '#333',
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
});

export default AddTeamScreen;
