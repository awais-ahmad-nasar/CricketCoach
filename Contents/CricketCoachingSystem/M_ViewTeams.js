// import {ip_adress} from './IP-config';
// import React, {useState, useEffect} from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   FlatList,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import CustomGradient from './components/CustomGradient';

// const ViewTeamsScreen = ({navigation}) => {
//   const [teams, setTeams] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch teams from the API
//   const fetchTeams = async () => {
//     try {
//       const response = await fetch(ip_adress + '/api/admin/view_teams');
//       const data = await response.json();
//       console.log('API Response:', data); // Log the response
//       if (response.ok) {
//         setTeams(data.teams);
//       } else {
//         console.error(data.message || 'Failed to fetch teams');
//       }
//     } catch (error) {
//       console.error('Error fetching teams:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTeams();
//   }, []);

//   // Handle Delete Button Press
//   const handleDelete = teamId => {
//     Alert.alert(
//       'Delete Team',
//       'Are you sure you want to delete this team and all its associated players and coaches?',
//       [
//         {
//           text: 'Cancel',
//           style: 'cancel',
//         },
//         {
//           text: 'Delete',
//           onPress: async () => {
//             try {
//               const response = await fetch(
//                 `${ip_adress}/api/admin/DeleteTeam/${teamId}`,
//                 {
//                   method: 'DELETE',
//                   headers: {
//                     'Content-Type': 'application/json',
//                     // Add authorization header if needed
//                     // 'Authorization': `Bearer ${token}`
//                   },
//                 },
//               );

//               const result = await response.json();

//               if (!response.ok) {
//                 throw new Error(result.error || 'Failed to delete team');
//               }

//               // Refresh the list after successful deletion
//               fetchTeams();
//               Alert.alert('Success', result.message);
//             } catch (error) {
//               console.error('Delete error:', error);
//               Alert.alert('Error', error.message || 'Failed to delete team');
//             }
//           },
//           style: 'destructive',
//         },
//       ],
//       {cancelable: true},
//     );
//   };

//   // Handle Update Button Press
//   const handleUpdate = teamId => {
//     console.log('Update team with ID:', teamId);
//     // Navigate to the update screen or implement update logic
//     navigation.navigate('UpdateTeamScreen', {teamId}); // Replace with your update screen
//   };

//   // Local images with fallback for missing ones
//   const localImages = {
//     'Lahore Qalandars': require('../CricketCoachingSystem/images/Lahore.png'),
//     'Karachi Kings': require('../CricketCoachingSystem/images/KarachiKings.png'),
//     'Peshawar Zalmi': require('../CricketCoachingSystem/images/PeshawarZalmi.png'),
//     'Islamabad United': require('../CricketCoachingSystem/images/Islamabad.png'),
//     'Quetta Gladiators': require('../CricketCoachingSystem/images/Quetta.png'),
//   };

//   const renderTeam = ({item}) => (
//     <View style={styles.card}>
//       <Image
//         source={
//           localImages[item.team_name] ||
//           require('../CricketCoachingSystem/images/Islamabad.png')
//         }
//         style={styles.logo}
//       />
//       <View style={styles.info}>
//         {/* Remove numberOfLines and ellipsizeMode */}
//         <Text style={styles.teamName}>{item.team_name}</Text>
//         <Text style={styles.detail}>Players: {item.player_count}</Text>
//         <Text style={styles.detail}>
//           Coach: {item.coach_name || 'No Coach Assigned'}
//         </Text>
//       </View>
//       {/* Move buttons to bottom-right corner */}
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity
//           style={[styles.button, styles.deleteButton]}
//           onPress={() => handleDelete(item.team_id)}>
//           <Text style={styles.buttonText}>Delete</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.button, styles.updateButton]}
//           onPress={() => handleUpdate(item.team_id)}>
//           <Text style={styles.buttonText}>Update</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   if (loading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <CustomGradient style={styles.gradientBackground} />

//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backButtonContainer}
//           activeOpacity={0.5}
//           onPress={() => navigation.goBack('TeamScreen')}>
//           <Text style={styles.backButton}>{'< Back'}</Text>
//         </TouchableOpacity>
//         <Text style={styles.title}>View Teams</Text>
//       </View>

//       <FlatList
//         data={teams}
//         renderItem={renderTeam}
//         keyExtractor={(item, index) => index.toString()}
//         contentContainerStyle={[styles.list, {paddingBottom: 80}]}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     position: 'relative',
//   },
//   gradientBackground: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#E6F2E6',
//     padding: 30,
//     borderBottomWidth: 1,
//     borderBottomColor: '#DFF4DF',
//     width: '100%',
//     position: 'absolute',
//     top: 0,
//     zIndex: 10, // Ensure the header stays on top
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
//   list: {
//     padding: 20,
//     marginTop: 100, // Add margin to offset the header height
//   },

//   card: {
//     flexDirection: 'row',
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 20,
//     marginBottom: 20,
//     alignItems: 'flex-start', // Change from 'center'
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     elevation: 5,
//     minHeight: 120, // Add minimum height for button space
//   },

//   logo: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     marginRight: 15,
//     borderWidth: 1,
//     borderColor: 'rgba(28,58,107,1)',
//   },
//   info: {
//     flex: 1,
//     marginRight: 10,
//     marginBottom: 30, // Space for buttons
//   },
//   teamName: {
//     fontSize: 18, // Restore original size
//     fontWeight: 'bold',
//     color: '#000',
//     marginBottom: 5,
//   },
//   detail: {
//     fontSize: 14, // Restore original size
//     color: '#555',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     position: 'absolute',
//     bottom: 10,
//     right: 10,
//     gap: 8,
//   },
//   button: {
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 5,
//   },
//   deleteButton: {
//     backgroundColor: '#FF4444',
//   },
//   updateButton: {
//     backgroundColor: '#33B5E5',
//   },
//   buttonText: {
//     color: '#FFF',
//     fontSize: 10, // Increased from 8
//     fontWeight: '600',
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default ViewTeamsScreen;

// ....................... Above is Delete but Below With Archieve Button ................

// import {ip_adress} from './IP-config';
// import React, {useState, useEffect} from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   FlatList,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import CustomGradient from './components/CustomGradient';

// const ViewTeamsScreen = ({navigation}) => {
//   const [teams, setTeams] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchTeams = async () => {
//     try {
//       const response = await fetch(ip_adress + '/api/admin/view_teams');
//       const data = await response.json();
//       if (response.ok) {
//         setTeams(data.teams);
//       } else {
//         console.error(data.message || 'Failed to fetch teams');
//       }
//     } catch (error) {
//       console.error('Error fetching teams:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTeams();
//   }, []);

//   const handleArchive = (teamId, currentStatus) => {
//     const normalizedStatus = currentStatus?.toLowerCase() || 'active';

//     Alert.alert(
//       normalizedStatus === 'active' ? 'Archive Team' : 'Unarchive Team',
//       normalizedStatus === 'active'
//         ? 'Are you sure you want to archive this team?'
//         : 'Are you sure you want to unarchive this team?',
//       [
//         {text: 'Cancel', style: 'cancel'},
//         {
//           text: 'Confirm',
//           onPress: async () => {
//             try {
//               const response = await fetch(
//                 `${ip_adress}/api/admin/archive_team/${teamId}`,
//                 {method: 'PUT'},
//               );
//               const result = await response.json();

//               if (!response.ok)
//                 throw new Error(result.error || 'Failed to update status');
//               fetchTeams(); // Refresh list
//               Alert.alert('Success', result.message);
//             } catch (error) {
//               Alert.alert('Error', error.message || 'Operation failed');
//             }
//           },
//         },
//       ],
//       {cancelable: true},
//     );
//   };

//   const handleUpdate = teamId => {
//     navigation.navigate('UpdateTeamScreen', {teamId});
//   };

//   const localImages = {
//     'Lahore Qalandars': require('../CricketCoachingSystem/images/Lahore.png'),
//     'Karachi Kings': require('../CricketCoachingSystem/images/KarachiKings.png'),
//     'Peshawar Zalmi': require('../CricketCoachingSystem/images/PeshawarZalmi.png'),
//     'Islamabad United': require('../CricketCoachingSystem/images/Islamabad.png'),
//     'Quetta Gladiators': require('../CricketCoachingSystem/images/Quetta.png'),
//   };

//   const renderTeam = ({item}) => {
//     const normalizedStatus = item.status?.toLowerCase() || 'active';

//     return (
//       <View style={styles.card}>
//         <Image
//           source={
//             localImages[item.team_name] ||
//             require('../CricketCoachingSystem/images/Islamabad.png')
//           }
//           style={styles.logo}
//         />
//         <View style={styles.info}>
//           <Text style={styles.teamName}>{item.team_name}</Text>
//           <Text style={styles.detail}>Players: {item.player_count}</Text>
//           <Text style={styles.detail}>
//             Coach: {item.coach_name || 'No Coach'}
//           </Text>
//           <Text style={styles.detail}>Status: {item.status}</Text>
//         </View>
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={[
//               styles.button,
//               normalizedStatus === 'active'
//                 ? styles.archiveButton
//                 : styles.unarchiveButton,
//             ]}
//             onPress={() => handleArchive(item.team_id, item.status)}>
//             <Text style={styles.buttonText}>
//               {normalizedStatus === 'active' ? 'Archive' : 'Unarchive'}
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.button, styles.updateButton]}
//             onPress={() => handleUpdate(item.team_id)}>
//             <Text style={styles.buttonText}>Update</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   };

//   if (loading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <CustomGradient style={styles.gradientBackground} />

//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backButtonContainer}
//           activeOpacity={0.5}
//           onPress={() => navigation.goBack('TeamScreen')}>
//           <Text style={styles.backButton}>{'< Back'}</Text>
//         </TouchableOpacity>
//         <Text style={styles.title}>View Teams</Text>
//       </View>

//       <FlatList
//         data={teams}
//         renderItem={renderTeam}
//         keyExtractor={item => item.team_id.toString()}
//         contentContainerStyle={[styles.list, {paddingBottom: 80}]}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     position: 'relative',
//   },
//   gradientBackground: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#E6F2E6',
//     padding: 30,
//     borderBottomWidth: 1,
//     borderBottomColor: '#DFF4DF',
//     width: '100%',
//     position: 'absolute',
//     top: 0,
//     zIndex: 10,
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
//   list: {
//     padding: 20,
//     marginTop: 100,
//   },
//   card: {
//     flexDirection: 'row',
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 20,
//     marginBottom: 20,
//     alignItems: 'flex-start',
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     elevation: 5,
//     minHeight: 120,
//   },
//   logo: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     marginRight: 15,
//     borderWidth: 1,
//     borderColor: 'rgba(28,58,107,1)',
//   },
//   info: {
//     flex: 1,
//     marginRight: 10,
//     marginBottom: 30,
//   },
//   teamName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#000',
//     marginBottom: 5,
//   },
//   detail: {
//     fontSize: 14,
//     color: '#555',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     position: 'absolute',
//     bottom: 10,
//     right: 10,
//     gap: 8,
//   },
//   button: {
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 5,
//   },
//   updateButton: {
//     backgroundColor: '#33B5E5',
//   },
//   buttonText: {
//     color: '#FFF',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   archiveButton: {
//     backgroundColor: '#FFA500',
//   },
//   unarchiveButton: {
//     backgroundColor: '#33B5E5',
//   },
// });

// export default ViewTeamsScreen;

// ........... updated version of above code ..........
// import {ip_adress} from './IP-config';
// import React, {useState, useEffect} from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   FlatList,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import CustomGradient from './components/CustomGradient';

// const ViewTeamsScreen = ({navigation}) => {
//   const [teams, setTeams] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchTeams = async () => {
//     try {
//       const response = await fetch(ip_adress + '/api/admin/view_teams');
//       const data = await response.json();
//       if (response.ok) {
//         setTeams(data.teams);
//       } else {
//         console.error(data.message || 'Failed to fetch teams');
//       }
//     } catch (error) {
//       console.error('Error fetching teams:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTeams();
//   }, []);

//   const handleArchive = (teamId, currentStatus) => {
//     const normalizedStatus = currentStatus?.toLowerCase() || 'active';

//     Alert.alert(
//       normalizedStatus === 'active' ? 'Archive Team' : 'Unarchive Team',
//       normalizedStatus === 'active'
//         ? 'Are you sure you want to archive this team?'
//         : 'Are you sure you want to unarchive this team?',
//       [
//         {text: 'Cancel', style: 'cancel'},
//         {
//           text: 'Confirm',
//           onPress: async () => {
//             try {
//               const response = await fetch(
//                 `${ip_adress}/api/admin/archive_team/${teamId}`,
//                 {method: 'PUT'},
//               );
//               const result = await response.json();

//               if (!response.ok)
//                 throw new Error(result.error || 'Failed to update status');
//               fetchTeams(); // Refresh list
//               Alert.alert('Success', result.message);
//             } catch (error) {
//               Alert.alert('Error', error.message || 'Operation failed');
//             }
//           },
//         },
//       ],
//       {cancelable: true},
//     );
//   };

//   const handleUpdate = teamId => {
//     navigation.navigate('UpdateTeamScreen', {teamId});
//   };

//   const localImages = {
//     'Lahore Qalandars': require('../CricketCoachingSystem/images/Lahore.png'),
//     'Karachi Kings': require('../CricketCoachingSystem/images/KarachiKings.png'),
//     'Peshawar Zalmi': require('../CricketCoachingSystem/images/PeshawarZalmi.png'),
//     'Islamabad United': require('../CricketCoachingSystem/images/Islamabad.png'),
//     'Quetta Gladiators': require('../CricketCoachingSystem/images/Quetta.png'),
//   };

//   const renderTeam = ({item}) => {
//     const normalizedStatus = item.status?.toLowerCase() || 'active';

//     return (
//       <View style={styles.card}>
//         <Image
//           source={
//             localImages[item.team_name] ||
//             require('../CricketCoachingSystem/images/Islamabad.png')
//           }
//           style={styles.logo}
//         />
//         <View style={styles.info}>
//           <Text style={styles.teamName}>{item.team_name}</Text>
//           <Text style={styles.detail}>Players: {item.player_count}</Text>
//           <Text style={styles.detail}>
//             Coach: {item.coach_name || 'No Coach'}
//           </Text>
//           <Text style={styles.detail}>Status: {item.status}</Text>
//         </View>
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={[
//               styles.button,
//               normalizedStatus === 'active'
//                 ? styles.archiveButton
//                 : styles.unarchiveButton,
//             ]}
//             onPress={() => handleArchive(item.team_id, item.status)}>
//             <Text style={styles.buttonText}>
//               {normalizedStatus === 'active' ? 'Archive' : 'Unarchive'}
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.button, styles.updateButton]}
//             onPress={() => handleUpdate(item.team_id)}>
//             <Text style={styles.buttonText}>Update</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   };

//   if (loading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <CustomGradient style={styles.gradientBackground} />

//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backButtonContainer}
//           activeOpacity={0.5}
//           onPress={() => navigation.goBack('TeamScreen')}>
//           <Text style={styles.backButton}>{'< Back'}</Text>
//         </TouchableOpacity>
//         <Text style={styles.title}>View Teams</Text>
//       </View>

//       <FlatList
//         data={teams}
//         renderItem={renderTeam}
//         keyExtractor={item => item.team_id.toString()}
//         contentContainerStyle={[styles.list, {paddingBottom: 80}]}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     position: 'relative',
//   },
//   gradientBackground: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#E6F2E6',
//     padding: 30,
//     borderBottomWidth: 1,
//     borderBottomColor: '#DFF4DF',
//     width: '100%',
//     position: 'absolute',
//     top: 0,
//     zIndex: 10,
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
//   list: {
//     padding: 20,
//     marginTop: 100,
//   },
//   card: {
//     flexDirection: 'row',
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 20,
//     marginBottom: 20,
//     alignItems: 'flex-start',
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     elevation: 5,
//     minHeight: 120,
//   },
//   logo: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     marginRight: 15,
//     borderWidth: 1,
//     borderColor: 'rgba(28,58,107,1)',
//   },
//   info: {
//     flex: 1,
//     marginRight: 10,
//     marginBottom: 30,
//   },
//   teamName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#000',
//     marginBottom: 5,
//   },
//   detail: {
//     fontSize: 14,
//     color: '#555',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     position: 'absolute',
//     bottom: 10,
//     right: 10,
//     gap: 8,
//   },
//   button: {
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 5,
//   },
//   updateButton: {
//     backgroundColor: '#33B5E5',
//   },
//   buttonText: {
//     color: '#FFF',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   archiveButton: {
//     backgroundColor: '#FFA500',
//   },
//   unarchiveButton: {
//     backgroundColor: '#33B5E5',
//   },
// });

// export default ViewTeamsScreen;

// .................. ANEEQ API .........................

import {ip_adress} from './IP-config';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import CustomGradient from './components/CustomGradient';

const ViewTeamsScreen = ({navigation}) => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTeams = async () => {
    try {
      const response = await fetch(`${ip_adress}/manager/view_teams`);
      const data = await response.json();

      if (response.ok) {
        setTeams(data.teams);
      } else {
        console.error(data.message || 'Failed to fetch teams');
      }
    } catch (error) {
      console.error('Error fetching teams:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleUpdate = teamId => {
    navigation.navigate('UpdateTeamScreen', {teamId});
  };

  const localImages = {
    'Lahore Qalandars': require('../CricketCoachingSystem/images/Lahore.png'),
    'Karachi Kings': require('../CricketCoachingSystem/images/KarachiKings.png'),
    'Peshawar Zalmi': require('../CricketCoachingSystem/images/PeshawarZalmi.png'),
    'Islamabad United': require('../CricketCoachingSystem/images/Islamabad.png'),
    'Quetta Gladiators': require('../CricketCoachingSystem/images/Quetta.png'),
  };

  // const renderTeam = ({item}) => {
  //   return (
  //     <View style={styles.card}>
  //       <Image
  //         source={
  //           localImages[item.team_name] ||
  //           require('../CricketCoachingSystem/images/Islamabad.png')
  //         }
  //         style={styles.logo}
  //       />
  //       <View style={styles.infoContainer}>
  //         <View style={styles.info}>
  //           <Text style={styles.teamName}>{item.team_name}</Text>
  //           <Text style={styles.detail}>Players: {item.player_count}</Text>
  //           <Text style={styles.detail}>
  //             Coach: {item.coach_name || 'No Coach Assigned'}
  //           </Text>
  //         </View>
  //         <TouchableOpacity
  //           style={[styles.button, styles.updateButton]}
  //           onPress={() => handleUpdate(item.team_id)}>
  //           <Text style={styles.buttonText}>Update</Text>
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //   );
  // };

  const renderTeam = ({item}) => {
    return (
      <View style={styles.card}>
        <Image
          source={
            localImages[item.team_name] ||
            require('../CricketCoachingSystem/images/Islamabad.png')
          }
          style={styles.logo}
        />
        <View style={styles.info}>
          <Text style={styles.teamName}>{item.team_name}</Text>
          <Text style={styles.detail}>Players: {item.player_count}</Text>
          <Text style={styles.detail}>
            Coach: {item.coach_name || 'No Coach Assigned'}
          </Text>
        </View>

        {/* **************** Update ButtonCode **************** */}
        {/* <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.updateButton]}
            onPress={() => handleUpdate(item.team_id)}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <CustomGradient style={styles.gradientBackground} />

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButtonContainer}
            activeOpacity={0.5}
            onPress={() => navigation.goBack('TeamScreen')}>
            <Text style={styles.backButton}>{'< Back'}</Text>
          </TouchableOpacity>
          <Text style={styles.title}>View Teams</Text>
        </View>

        <FlatList
          data={teams}
          renderItem={renderTeam}
          keyExtractor={item => item.team_id.toString()}
          contentContainerStyle={styles.listContent}
          ListFooterComponent={<View style={styles.footer} />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E6F2E6',
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F2E6',
    padding: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#DFF4DF',
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 10,
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
  listContent: {
    padding: 20,
    paddingTop: 100, // Space for header
    paddingBottom: 30, // Extra bottom padding
  },
  footer: {
    height: 30, // Additional space at the bottom
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    marginTop: 20,
    alignItems: 'center', // Changed from 'flex-start'
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    minHeight: 150,
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 1,
    borderColor: 'rgba(28,58,107,1)',
    backgroundColor: 'rgb(240, 242, 245)',
  },
  info: {
    flex: 1,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  teamName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  detail: {
    fontSize: 15,
    color: '#555',
    marginBottom: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 3,
    right: 15,
    gap: 8,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  updateButton: {
    backgroundColor: '#33B5E5',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ViewTeamsScreen;
// ........... Without Update,Archieve Button ............

// import {ip_adress} from './IP-config';
// import React, {useState, useEffect} from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   FlatList,
//   ActivityIndicator,
// } from 'react-native';
// import CustomGradient from './components/CustomGradient';

// const ViewTeamsScreen = ({navigation}) => {
//   const [teams, setTeams] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchTeams = async () => {
//     try {
//       const response = await fetch(ip_adress + '/api/admin/view_teams');
//       const data = await response.json();
//       if (response.ok) {
//         setTeams(data.teams);
//       } else {
//         console.error(data.message || 'Failed to fetch teams');
//       }
//     } catch (error) {
//       console.error('Error fetching teams:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTeams();
//   }, []);

//   const localImages = {
//     'Lahore Qalandars': require('../CricketCoachingSystem/images/Lahore.png'),
//     'Karachi Kings': require('../CricketCoachingSystem/images/KarachiKings.png'),
//     'Peshawar Zalmi': require('../CricketCoachingSystem/images/PeshawarZalmi.png'),
//     'Islamabad United': require('../CricketCoachingSystem/images/Islamabad.png'),
//     'Quetta Gladiators': require('../CricketCoachingSystem/images/Quetta.png'),
//   };

//   const renderTeam = ({item}) => {
//     return (
//       <View style={styles.card}>
//         <Image
//           source={
//             localImages[item.team_name] ||
//             require('../CricketCoachingSystem/images/Islamabad.png')
//           }
//           style={styles.logo}
//         />
//         <View style={styles.info}>
//           <Text style={styles.teamName}>{item.team_name}</Text>
//           <Text style={styles.detail}>Players: {item.player_count}</Text>
//           <Text style={styles.detail}>
//             Coach: {item.coach_name || 'No Coach'}
//           </Text>
//         </View>
//       </View>
//     );
//   };

//   if (loading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <CustomGradient style={styles.gradientBackground} />

//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backButtonContainer}
//           activeOpacity={0.5}
//           onPress={() => navigation.goBack('TeamScreen')}>
//           <Text style={styles.backButton}>{'< Back'}</Text>
//         </TouchableOpacity>
//         <Text style={styles.title}>View Teams</Text>
//       </View>

//       <FlatList
//         data={teams}
//         renderItem={renderTeam}
//         keyExtractor={item => item.team_id.toString()}
//         contentContainerStyle={[styles.list, {paddingBottom: 80}]}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     position: 'relative',
//   },
//   gradientBackground: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#E6F2E6',
//     padding: 30,
//     borderBottomWidth: 1,
//     borderBottomColor: '#DFF4DF',
//     width: '100%',
//     position: 'absolute',
//     top: 0,
//     zIndex: 10,
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
//   list: {
//     padding: 20,
//     marginTop: 100,
//   },
//   card: {
//     flexDirection: 'row',
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 20,
//     marginBottom: 20,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     elevation: 5,
//   },
//   logo: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     marginRight: 15,
//     borderWidth: 1,
//     borderColor: 'rgba(28,58,107,1)',
//   },
//   info: {
//     flex: 1,
//   },
//   teamName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#000',
//     marginBottom: 5,
//   },
//   detail: {
//     fontSize: 14,
//     color: '#555',
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default ViewTeamsScreen;
