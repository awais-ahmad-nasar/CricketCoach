// import {ip_adress} from './IP-config';
// import React, {useState, useEffect, useRef} from 'react';
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

// const ViewPlayersScreen = ({navigation}) => {
//   const [players, setPlayers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const isMounted = useRef(true);

//   // Fetch players from the API
//   const fetchPlayers = async () => {
//     try {
//       const response = await fetch(
//         ip_adress + '/api/admin/view_players_with_team',
//       );
//       const data = await response.json();

//       if (response.ok) {
//         if (isMounted.current) {
//           setPlayers(data.players || []);
//         }
//       } else {
//         console.error(data.message || 'Failed to fetch players');
//       }
//     } catch (error) {
//       console.error('Error fetching players:', error);
//     } finally {
//       if (isMounted.current) {
//         setLoading(false);
//       }
//     }
//   };

//   useEffect(() => {
//     isMounted.current = true;
//     fetchPlayers();

//     return () => {
//       isMounted.current = false;
//     };
//   }, []);

//   const handleArchive = async (playerId, currentStatus) => {
//     if (!isMounted.current) return;

//     // Normalize status to lowercase
//     const normalizedStatus = currentStatus?.toLowerCase() || 'active';

//     Alert.alert(
//       normalizedStatus === 'active' ? 'Archive Player' : 'Unarchive Player',
//       normalizedStatus === 'active'
//         ? 'Are you sure you want to archive this player?'
//         : 'Are you sure you want to unarchive this player?',
//       [
//         {
//           text: 'Cancel',
//           style: 'cancel',
//         },
//         {
//           text: 'Confirm',
//           onPress: async () => {
//             try {
//               const response = await fetch(
//                 `${ip_adress}/api/admin/archive_player/${playerId}`,
//                 {
//                   method: 'PUT',
//                   headers: {
//                     'Content-Type': 'application/json',
//                   },
//                 },
//               );

//               const result = await response.json();

//               if (!response.ok) {
//                 throw new Error(
//                   result.error || 'Failed to update player status',
//                 );
//               }

//               if (isMounted.current) {
//                 setPlayers(prevPlayers =>
//                   prevPlayers.map(player =>
//                     player.id === playerId
//                       ? {...player, status: result.new_status}
//                       : player,
//                   ),
//                 );
//                 Alert.alert('Success', result.message);
//               }
//             } catch (error) {
//               if (isMounted.current) {
//                 Alert.alert(
//                   'Error',
//                   error.message || 'Failed to update player status',
//                 );
//               }
//             }
//           },
//           style: 'destructive',
//         },
//       ],
//       {cancelable: true},
//     );
//   };

//   // Handle Update Player
//   const handleUpdate = playerId => {
//     if (!isMounted.current) return;
//     navigation.navigate('UpdatePlayerScreen', {playerId});
//   };

//   // Render each player item
//   const renderPlayer = ({item}) => {
//     if (!item) return null;

//     // Normalize status to lowercase
//     const normalizedStatus = item.status?.toLowerCase() || 'active';

//     return (
//       <View style={styles.card}>
//         <Image
//           source={
//             item.logo ||
//             require('../CricketCoachingSystem/images/Islamabad.png')
//           }
//           style={styles.logo}
//         />
//         <View style={styles.info}>
//           <Text style={styles.playerName}>{item.name || 'N/A'}</Text>
//           <Text style={styles.detail}>Age: {item.age || 'N/A'}</Text>
//           <Text style={styles.detail}>
//             Experience: {item.experience || 'N/A'}
//           </Text>
//           <Text style={styles.detail}>Type: {item.type || 'N/A'}</Text>
//           <Text style={styles.detail}>
//             Team: {item.teams?.join(', ') || 'No Team Assigned'}
//           </Text>
//           <Text style={styles.detail}>Status: {item.status || 'N/A'}</Text>
//         </View>
//         {/* Buttons Container */}
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={[
//               styles.button,
//               normalizedStatus === 'active'
//                 ? styles.archiveButton
//                 : styles.unarchiveButton,
//             ]}
//             onPress={() => handleArchive(item.id, normalizedStatus)}>
//             <Text style={styles.buttonText}>
//               {normalizedStatus === 'active' ? 'Archive' : 'Unarchive'}
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.button, styles.updateButton]}
//             onPress={() => handleUpdate(item.id)}>
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
//           onPress={() => navigation.goBack('PlayerScreen')}>
//           <Text style={styles.backButton}>{'< Back'}</Text>
//         </TouchableOpacity>
//         <Text style={styles.title}>View Players</Text>
//       </View>

//       <FlatList
//         data={players}
//         renderItem={renderPlayer}
//         keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
//         contentContainerStyle={styles.list}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     position: 'relative',
//     paddingBottom: 1,
//   },
//   gradientBackground: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#E6F2E6',
//     padding: 35,
//     borderBottomWidth: 1,
//     borderBottomColor: '#DFF4DF',
//     width: '100%',
//     position: 'absolute',
//     top: 0,
//     zIndex: 990,
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
//     paddingBottom: 80,
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
//     minHeight: 150,
//   },
//   logo: {
//     width: 75,
//     height: 75,
//     borderRadius: 30,
//     marginRight: 15,
//     marginTop: 40,
//     borderWidth: 1,
//     borderColor: 'rgba(28,58,107,1)',
//   },
//   info: {
//     flex: 1,
//     marginRight: 10,
//     marginBottom: 40,
//   },
//   playerName: {
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

// export default ViewPlayersScreen;

//...............................*******...........................................
// import {ip_adress} from './IP-config';
// import React, {useState, useEffect, useRef} from 'react';
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

// const ViewPlayersScreen = ({navigation}) => {
//   const [players, setPlayers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const isMounted = useRef(true);

//   // Function to format DOB to YYYY/MM/DD
//   const formatDOB = dobString => {
//     if (!dobString) return 'N/A';

//     const date = new Date(dobString);
//     if (isNaN(date.getTime())) return 'N/A'; // Check if the date is invalid

//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
//     const day = String(date.getDate()).padStart(2, '0');

//     return `${year}/${month}/${day}`;
//   };

//   // Fetch players from the API
//   const fetchPlayers = async () => {
//     try {
//       const response = await fetch(
//         ip_adress + '/api/admin/view_players_with_team',
//       );
//       const data = await response.json();

//       if (response.ok) {
//         if (isMounted.current) {
//           setPlayers(data.players || []);
//         }
//       } else {
//         console.error(data.message || 'Failed to fetch players');
//       }
//     } catch (error) {
//       console.error('Error fetching players:', error);
//     } finally {
//       if (isMounted.current) {
//         setLoading(false);
//       }
//     }
//   };

//   useEffect(() => {
//     isMounted.current = true;
//     fetchPlayers();

//     return () => {
//       isMounted.current = false;
//     };
//   }, []);

//   const handleArchive = async (playerId, currentStatus) => {
//     if (!isMounted.current) return;

//     // Normalize status to lowercase
//     const normalizedStatus = currentStatus?.toLowerCase() || 'active';

//     Alert.alert(
//       normalizedStatus === 'active' ? 'Archive Player' : 'Unarchive Player',
//       normalizedStatus === 'active'
//         ? 'Are you sure you want to archive this player?'
//         : 'Are you sure you want to unarchive this player?',
//       [
//         {
//           text: 'Cancel',
//           style: 'cancel',
//         },
//         {
//           text: 'Confirm',
//           onPress: async () => {
//             try {
//               const response = await fetch(
//                 `${ip_adress}/api/admin/archive_player/${playerId}`,
//                 {
//                   method: 'PUT',
//                   headers: {
//                     'Content-Type': 'application/json',
//                   },
//                 },
//               );

//               const result = await response.json();

//               if (!response.ok) {
//                 throw new Error(
//                   result.error || 'Failed to update player status',
//                 );
//               }

//               if (isMounted.current) {
//                 setPlayers(prevPlayers =>
//                   prevPlayers.map(player =>
//                     player.id === playerId
//                       ? {...player, status: result.new_status}
//                       : player,
//                   ),
//                 );
//                 Alert.alert('Success', result.message);
//               }
//             } catch (error) {
//               if (isMounted.current) {
//                 Alert.alert(
//                   'Error',
//                   error.message || 'Failed to update player status',
//                 );
//               }
//             }
//           },
//           style: 'destructive',
//         },
//       ],
//       {cancelable: true},
//     );
//   };

//   // Handle Update Player
//   const handleUpdate = playerId => {
//     if (!isMounted.current) return;
//     navigation.navigate('UpdatePlayerScreen', {playerId});
//   };

//   // Render each player item
//   const renderPlayer = ({item}) => {
//     if (!item) return null;

//     // Normalize status to lowercase
//     const normalizedStatus = item.status?.toLowerCase() || 'active';

//     return (
//       <View style={styles.card}>
//         <Image
//           source={
//             item.logo ||
//             require('../CricketCoachingSystem/images/Islamabad.png')
//           }
//           style={styles.logo}
//         />
//         <View style={styles.info}>
//           <Text style={styles.playerName}>{item.name || 'N/A'}</Text>
//           <Text style={styles.detail}>
//             Date of Birth: {formatDOB(item.DOB)}
//           </Text>
//           <Text style={styles.detail}>
//             Experience: {item.experience || 'N/A'}
//           </Text>
//           <Text style={styles.detail}>Type: {item.type || 'N/A'}</Text>
//           <Text style={styles.detail}>
//             Team: {item.teams?.join(', ') || 'No Team Assigned'}
//           </Text>
//           <Text style={styles.detail}>Status: {item.status || 'N/A'}</Text>
//         </View>
//         {/* Buttons Container */}
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={[
//               styles.button,
//               normalizedStatus === 'active'
//                 ? styles.archiveButton
//                 : styles.unarchiveButton,
//             ]}
//             onPress={() => handleArchive(item.id, normalizedStatus)}>
//             <Text style={styles.buttonText}>
//               {normalizedStatus === 'active' ? 'Archive' : 'Unarchive'}
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.button, styles.updateButton]}
//             onPress={() => handleUpdate(item.id)}>
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
//           onPress={() => navigation.goBack('PlayerScreen')}>
//           <Text style={styles.backButton}>{'< Back'}</Text>
//         </TouchableOpacity>
//         <Text style={styles.title}>View Players</Text>
//       </View>

//       <FlatList
//         data={players}
//         renderItem={renderPlayer}
//         keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
//         contentContainerStyle={styles.list}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     position: 'relative',
//     paddingBottom: 1,
//   },
//   gradientBackground: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#E6F2E6',
//     padding: 35,
//     borderBottomWidth: 1,
//     borderBottomColor: '#DFF4DF',
//     width: '100%',
//     position: 'absolute',
//     top: 0,
//     zIndex: 990,
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
//     paddingBottom: 80,
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
//     minHeight: 150,
//   },
//   logo: {
//     width: 75,
//     height: 75,
//     borderRadius: 30,
//     marginRight: 15,
//     marginTop: 40,
//     borderWidth: 1,
//     borderColor: 'rgba(28,58,107,1)',
//   },
//   info: {
//     flex: 1,
//     marginRight: 10,
//     marginBottom: 40,
//   },
//   playerName: {
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

// export default ViewPlayersScreen;

// .................. ANEEQ API .........................

import {ip_adress} from './IP-config';
import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import CustomGradient from './components/CustomGradient';

const ViewPlayersScreen = ({navigation}) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(true);

  // Function to format DOB to YYYY/MM/DD
  const formatDOB = dobString => {
    if (!dobString) return 'N/A';

    const date = new Date(dobString);
    if (isNaN(date.getTime())) return 'N/A';

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}/${month}/${day}`;
  };

  // Fetch players from the API
  const fetchPlayers = async () => {
    try {
      const response = await fetch(`${ip_adress}/manager/view_players`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const text = await response.text();
        try {
          const data = JSON.parse(text);
          throw new Error(data.message || 'Failed to fetch players');
        } catch {
          throw new Error(text || 'Server error');
        }
      }

      const data = await response.json();

      if (!data.value) {
        throw new Error(data.message || 'No players data received');
      }

      const mappedPlayers = data.players.map(player => ({
        ...player,
        status: player.is_active === '1' ? 'Active' : 'Inactive',
        teamStatus:
          player.is_team_assigned === '1' ? 'Assigned' : 'Not Assigned',
        id: player.id.toString(),
        DOB: player.date_of_birth,
      }));

      if (isMounted.current) {
        setPlayers(mappedPlayers);
      }
    } catch (error) {
      console.error('Error fetching players:', error);
      Alert.alert('Error', error.message);
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    isMounted.current = true;
    fetchPlayers();

    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleArchive = async (playerId, currentStatus) => {
    if (!isMounted.current) return;

    const normalizedStatus = currentStatus?.toLowerCase() || 'active';

    Alert.alert(
      normalizedStatus === 'active' ? 'Archive Player' : 'Unarchive Player',
      normalizedStatus === 'active'
        ? 'Are you sure you want to archive this player?'
        : 'Are you sure you want to unarchive this player?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: async () => {
            try {
              const response = await fetch(
                `${ip_adress}/manager/update_player_status/${playerId}`,
                {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    is_active: normalizedStatus === 'active' ? '0' : '1',
                  }),
                },
              );

              const result = await response.json();

              if (!response.ok) {
                throw new Error(
                  result.error || 'Failed to update player status',
                );
              }

              if (isMounted.current) {
                setPlayers(prevPlayers =>
                  prevPlayers.map(player =>
                    player.id === playerId
                      ? {
                          ...player,
                          status:
                            normalizedStatus === 'active'
                              ? 'Inactive'
                              : 'Active',
                          is_active: normalizedStatus === 'active' ? '0' : '1',
                        }
                      : player,
                  ),
                );
                Alert.alert('Success', result.message);
              }
            } catch (error) {
              if (isMounted.current) {
                Alert.alert(
                  'Error',
                  error.message || 'Failed to update player status',
                );
              }
            }
          },
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );
  };

  // Render each player item
  const renderPlayer = ({item, index}) => {
    if (!item) return null;

    return (
      <View style={styles.card}>
        <Image
          source={
            item.logo ||
            require('../CricketCoachingSystem/images/player_logo.png')
          }
          style={styles.logo}
        />
        <View style={styles.info}>
          <Text style={styles.playerName}>{item.name || 'N/A'}</Text>
          <Text style={styles.detail}>
            Date of Birth: {formatDOB(item.DOB)}
          </Text>
          <Text style={styles.detail}>
            Experience: {item.experience || 'N/A'}
          </Text>
          <Text style={styles.detail}>Type: {item.type || 'N/A'}</Text>
          <Text
            style={[
              styles.detail,
              item.teamStatus === 'Assigned'
                ? styles.assignedStatus
                : styles.notAssignedStatus,
            ]}>
            Team: {item.teamStatus}
          </Text>
          <Text
            style={[
              styles.detail,
              item.status === 'Active'
                ? styles.activeStatus
                : styles.inactiveStatus,
            ]}>
            Status: {item.status}
          </Text>
        </View>

        {/* **************** Update Archieve Buttons Code **************** */}
        {/* <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              item.status === 'Active'
                ? styles.archiveButton
                : styles.unarchiveButton,
            ]}
            onPress={() => handleArchive(item.id, item.status)}>
            <Text style={styles.buttonText}>
              {item.status === 'Active' ? 'Archive' : 'Unarchive'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.updateButton]}
            onPress={() =>
              navigation.navigate('UpdatePlayerScreen', {playerId: item.id})
            }>
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

  //   return (
  //     <View style={styles.container}>
  //       <CustomGradient style={styles.gradientBackground} />

  //       <View style={styles.header}>
  //         <TouchableOpacity
  //           style={styles.backButtonContainer}
  //           activeOpacity={0.5}
  //           onPress={() => navigation.goBack('PlayerScreen')}>
  //           <Text style={styles.backButton}>{'< Back'}</Text>
  //         </TouchableOpacity>
  //         <Text style={styles.title}>View Players</Text>
  //       </View>

  //       <FlatList
  //         data={players}
  //         renderItem={renderPlayer}
  //         keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
  //         contentContainerStyle={styles.list}
  //       />
  //     </View>
  //   );
  // };

  return (
    <View style={styles.container}>
      <CustomGradient style={styles.gradientBackground} />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButtonContainer}
          activeOpacity={0.5}
          onPress={() => navigation.goBack('PlayerScreen')}>
          <Text style={styles.backButton}>{'< Back'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>View Players</Text>
      </View>

      <FlatList
        data={players}
        renderItem={renderPlayer}
        keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={<View style={styles.footer} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    paddingTop: 10,
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F2E6',
    padding: 35,
    borderBottomWidth: 1,
    borderBottomColor: '#DFF4DF',
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 990,
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
  list: {
    padding: 10,
    marginTop: 100,
    paddingBottom: 100,
  },
  listContent: {
    padding: 18,
    paddingTop: 100, // Space for header
    paddingBottom: 10, // Extra bottom padding
  },
  footer: {
    height: 30, // Additional space at the bottom
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    marginTop: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    // minHeight: 150,   // For Update/Archieve buttons
  },
  logo: {
    width: 75,
    height: 75,
    borderRadius: 30,
    marginRight: 15,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: 'rgba(28,58,107,1)',
    backgroundColor: 'rgb(194, 198, 205)',
  },
  info: {
    flex: 1,
    marginRight: 10,
    // marginBottom: 35,   // For Update/Archieve buttons
    marginBottom: 28,
  },
  playerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  detail: {
    fontSize: 15,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    right: 10,
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
  archiveButton: {
    backgroundColor: '#FFA500',
  },
  unarchiveButton: {
    backgroundColor: '#33B5E5',
  },

  activeStatus: {
    color: 'green',
    fontWeight: 'bold',
  },
  inactiveStatus: {
    color: 'red',
    fontWeight: 'bold',
  },
  // assignedStatus: {
  //   color: 'green',
  // },
  // notAssignedStatus: {
  //   color: 'orange',
  // },
});

export default ViewPlayersScreen;
// ......................FOR deleting player............................
// import {ip_adress} from './IP-config';
// import React, {useState, useEffect, useRef} from 'react';
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

// const ViewPlayersScreen = ({navigation}) => {
//   const [players, setPlayers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const isMounted = useRef(true); // Track mounted state

//   // Fetch players from the API
//   const fetchPlayers = async () => {
//     try {
//       const response = await fetch(
//         ip_adress + '/api/admin/view_players_with_team',
//       );
//       const data = await response.json();

//       if (response.ok) {
//         if (isMounted.current) {
//           setPlayers(data.players || []);
//         }
//       } else {
//         console.error(data.message || 'Failed to fetch players');
//       }
//     } catch (error) {
//       console.error('Error fetching players:', error);
//     } finally {
//       if (isMounted.current) {
//         setLoading(false);
//       }
//     }
//   };

//   useEffect(() => {
//     isMounted.current = true; // Set mounted to true
//     fetchPlayers();

//     return () => {
//       isMounted.current = false; // Cleanup on unmount
//     };
//   }, []);

//   const handleDelete = async playerId => {
//     if (!isMounted.current) return;

//     Alert.alert(
//       'Delete Player',
//       'Are you sure you want to delete this player?',
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
//                 `${ip_adress}/api/admin/DeletePlayer/${playerId}`,
//                 {
//                   method: 'DELETE',
//                   headers: {
//                     'Content-Type': 'application/json',
//                   },
//                 },
//               );

//               const result = await response.json();
//               console.log('Delete response:', result);

//               if (!response.ok) {
//                 throw new Error(result.error || 'Failed to delete player');
//               }

//               if (isMounted.current) {
//                 setPlayers(prevPlayers =>
//                   prevPlayers.filter(player => player.id !== playerId),
//                 );
//                 Alert.alert('Success', result.message);
//               }
//             } catch (error) {
//               if (isMounted.current) {
//                 console.error('Delete error:', error);
//                 Alert.alert(
//                   'Error',
//                   error.message || 'Failed to delete player',
//                 );
//               }
//             }
//           },
//           style: 'destructive',
//         },
//       ],
//       {cancelable: true},
//     );
//   };

//   // Handle Update Player
//   const handleUpdate = playerId => {
//     if (!isMounted.current) return; // Don't proceed if component is unmounted
//     navigation.navigate('UpdatePlayerScreen', {playerId});
//   };

//   // Render each player item
//   const renderPlayer = ({item}) => {
//     if (!item) return null;

//     return (
//       <View style={styles.card}>
//         <Image
//           source={
//             item.logo ||
//             require('../CricketCoachingSystem/images/Islamabad.png')
//           }
//           style={styles.logo}
//         />
//         <View style={styles.info}>
//           <Text style={styles.playerName}>{item.name || 'N/A'}</Text>
//           <Text style={styles.detail}>Age: {item.age || 'N/A'}</Text>
//           <Text style={styles.detail}>
//             Experience: {item.experience || 'N/A'}
//           </Text>
//           <Text style={styles.detail}>Type: {item.type || 'N/A'}</Text>
//           <Text style={styles.detail}>
//             Team: {item.teams?.join(', ') || 'No Team Assigned'}
//           </Text>
//           <Text style={styles.detail}>Status: {item.status || 'N/A'}</Text>
//         </View>
//         {/* Delete/Update Buttons */}
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={[styles.button, styles.deleteButton]}
//             onPress={() => handleDelete(item.id)}>
//             <Text style={styles.buttonText}>Delete</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.button, styles.updateButton]}
//             onPress={() => handleUpdate(item.id)}>
//             <Text style={styles.buttonText}>Update</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   };

//   // Show loading indicator while fetching data
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
//           onPress={() => navigation.goBack('PlayerScreen')}>
//           <Text style={styles.backButton}>{'< Back'}</Text>
//         </TouchableOpacity>
//         <Text style={styles.title}>View Players</Text>
//       </View>

//       <FlatList
//         data={players}
//         renderItem={renderPlayer}
//         keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
//         contentContainerStyle={styles.list}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     position: 'relative',
//     // zIndex: 999,
//     paddingBottom: 1,
//   },
//   gradientBackground: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#E6F2E6',
//     padding: 35,
//     borderBottomWidth: 1,
//     borderBottomColor: '#DFF4DF',
//     width: '100%',
//     position: 'absolute',
//     top: 0,
//     zIndex: 990,
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
//     paddingBottom: 80,
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
//     minHeight: 150,
//   },
//   logo: {
//     width: 75,
//     height: 75,
//     borderRadius: 30,
//     marginRight: 15,
//     marginTop: 40,
//     borderWidth: 1,
//     borderColor: 'rgba(28,58,107,1)',
//   },
//   info: {
//     flex: 1,
//     marginRight: 10,
//     marginBottom: 40,
//   },
//   playerName: {
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
//   deleteButton: {
//     backgroundColor: '#FF4444',
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
//     backgroundColor: '#FFA500', // Orange for archive
//   },
//   unarchiveButton: {
//     backgroundColor: '#33B5E5', // Blue for unarchive
//   },
// });

// export default ViewPlayersScreen;
