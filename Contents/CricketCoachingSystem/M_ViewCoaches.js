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
// import {ip_adress} from './IP-config';
// import CustomGradient from './components/CustomGradient';

// const ViewCoachesScreen = ({navigation}) => {
//   const [coaches, setCoaches] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const isMounted = useRef(true);

//   const fetchCoaches = async () => {
//     try {
//       const response = await fetch(ip_adress + '/api/admin/view_coaches');
//       const data = await response.json();
//       if (response.ok) {
//         if (isMounted.current) {
//           setCoaches(data.coaches || []);
//         }
//       } else {
//         console.error(data.message || 'Failed to fetch coaches');
//       }
//     } catch (error) {
//       console.error('Error fetching coaches:', error);
//     } finally {
//       if (isMounted.current) {
//         setLoading(false);
//       }
//     }
//   };

//   useEffect(() => {
//     isMounted.current = true;
//     fetchCoaches();
//     return () => {
//       isMounted.current = false;
//     };
//   }, []);

//   const handleArchive = async (coachId, currentStatus) => {
//     if (!isMounted.current) return;

//     const normalizedStatus = currentStatus?.toLowerCase() || 'active';

//     Alert.alert(
//       normalizedStatus === 'active' ? 'Archive Coach' : 'Unarchive Coach',
//       normalizedStatus === 'active'
//         ? 'Are you sure you want to archive this coach?'
//         : 'Are you sure you want to unarchive this coach?',
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
//                 `${ip_adress}/api/admin/archive_coach/${coachId}`,
//                 {method: 'PUT'},
//               );

//               const result = await response.json();
//               if (!response.ok)
//                 throw new Error(result.error || 'Failed to update status');

//               if (isMounted.current) {
//                 setCoaches(prev =>
//                   prev.map(coach =>
//                     coach.id === coachId
//                       ? {...coach, status: result.new_status}
//                       : coach,
//                   ),
//                 );
//                 Alert.alert('Success', result.message);
//               }
//             } catch (error) {
//               Alert.alert('Error', error.message || 'Operation failed');
//             }
//           },
//         },
//       ],
//       {cancelable: true},
//     );
//   };

//   const handleUpdate = coachId => {
//     navigation.navigate('UpdateCoachScreen', {coachId});
//   };

//   const renderCoach = ({item}) => {
//     const normalizedStatus = item.status?.toLowerCase() || 'active';

//     return (
//       <View style={styles.card}>
//         <Image
//           source={require('../CricketCoachingSystem/images/Islamabad.png')}
//           style={styles.logo}
//         />
//         <View style={styles.info}>
//           <Text style={styles.name}>{item.name}</Text>
//           <Text style={styles.detail}>Age: {item.age}</Text>
//           <Text style={styles.detail}>Contact: {item.contact_no}</Text>
//           <Text style={styles.detail}>Experience: {item.experience} years</Text>
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
//             onPress={() => handleArchive(item.id, item.status)}>
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
//           onPress={() => navigation.goBack('CoachScreen')}>
//           <Text style={styles.backButton}>{'< Back'}</Text>
//         </TouchableOpacity>
//         <Text style={styles.title}>View Coaches</Text>
//       </View>
//       <FlatList
//         data={coaches}
//         renderItem={renderCoach}
//         keyExtractor={item => item.id.toString()}
//         contentContainerStyle={[styles.list, {paddingBottom: 80}]}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   archiveButton: {
//     backgroundColor: '#FFA500',
//   },
//   unarchiveButton: {
//     backgroundColor: '#33B5E5',
//   },
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
//     padding: 25,
//     marginBottom: 20,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     elevation: 5,
//     minHeight: 150, // Add minimum height for button space
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
//   name: {
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
// });

// export default ViewCoachesScreen;
// .................................**********.....................................
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
// import {ip_adress} from './IP-config';
// import CustomGradient from './components/CustomGradient';

// const ViewCoachesScreen = ({navigation}) => {
//   const [coaches, setCoaches] = useState([]);
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

//   const fetchCoaches = async () => {
//     try {
//       const response = await fetch(ip_adress + '/api/admin/view_coaches');
//       const data = await response.json();
//       if (response.ok) {
//         if (isMounted.current) {
//           setCoaches(data.coaches || []);
//         }
//       } else {
//         console.error(data.message || 'Failed to fetch coaches');
//       }
//     } catch (error) {
//       console.error('Error fetching coaches:', error);
//     } finally {
//       if (isMounted.current) {
//         setLoading(false);
//       }
//     }
//   };

//   useEffect(() => {
//     isMounted.current = true;
//     fetchCoaches();
//     return () => {
//       isMounted.current = false;
//     };
//   }, []);

//   const handleArchive = async (coachId, currentStatus) => {
//     if (!isMounted.current) return;

//     const normalizedStatus = currentStatus?.toLowerCase() || 'active';

//     Alert.alert(
//       normalizedStatus === 'active' ? 'Archive Coach' : 'Unarchive Coach',
//       normalizedStatus === 'active'
//         ? 'Are you sure you want to archive this coach?'
//         : 'Are you sure you want to unarchive this coach?',
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
//                 `${ip_adress}/api/admin/archive_coach/${coachId}`,
//                 {method: 'PUT'},
//               );

//               const result = await response.json();
//               if (!response.ok)
//                 throw new Error(result.error || 'Failed to update status');

//               if (isMounted.current) {
//                 setCoaches(prev =>
//                   prev.map(coach =>
//                     coach.id === coachId
//                       ? {...coach, status: result.new_status}
//                       : coach,
//                   ),
//                 );
//                 Alert.alert('Success', result.message);
//               }
//             } catch (error) {
//               Alert.alert('Error', error.message || 'Operation failed');
//             }
//           },
//         },
//       ],
//       {cancelable: true},
//     );
//   };

//   const handleUpdate = coachId => {
//     navigation.navigate('UpdateCoachScreen', {coachId});
//   };

//   const renderCoach = ({item}) => {
//     const normalizedStatus = item.status?.toLowerCase() || 'active';

//     return (
//       <View style={styles.card}>
//         <Image
//           source={require('../CricketCoachingSystem/images/Islamabad.png')}
//           style={styles.logo}
//         />
//         <View style={styles.info}>
//           <Text style={styles.name}>{item.name}</Text>
//           <Text style={styles.detail}>
//             Date of Birth: {formatDOB(item.DOB)}
//           </Text>
//           <Text style={styles.detail}>Contact: {item.contact_no}</Text>
//           <Text style={styles.detail}>Experience: {item.experience} years</Text>
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
//             onPress={() => handleArchive(item.id, item.status)}>
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
//           onPress={() => navigation.goBack('CoachScreen')}>
//           <Text style={styles.backButton}>{'< Back'}</Text>
//         </TouchableOpacity>
//         <Text style={styles.title}>View Coaches</Text>
//       </View>
//       <FlatList
//         data={coaches}
//         renderItem={renderCoach}
//         keyExtractor={item => item.id.toString()}
//         contentContainerStyle={[styles.list, {paddingBottom: 80}]}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   archiveButton: {
//     backgroundColor: '#FFA500',
//   },
//   unarchiveButton: {
//     backgroundColor: '#33B5E5',
//   },
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
//     padding: 25,
//     marginBottom: 20,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     elevation: 5,
//     minHeight: 150, // Add minimum height for button space
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
//   name: {
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
// });

// export default ViewCoachesScreen;

// .................. ANEEQ API .........................
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
import {ip_adress} from './IP-config';
import CustomGradient from './components/CustomGradient';

const ViewCoachesScreen = ({navigation}) => {
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(true);

  const formatDOB = dobString => {
    if (!dobString) return 'N/A';
    const date = new Date(dobString);
    if (isNaN(date.getTime())) return 'N/A';
    return date.toLocaleDateString();
  };

  const fetchCoaches = async () => {
    try {
      const response = await fetch(`${ip_adress}/manager/view_coaches`);
      const data = await response.json();

      if (!response.ok || !data.value) {
        throw new Error(data.message || 'Failed to fetch coaches');
      }

      // Map the response data with proper status
      const mappedCoaches = data.coaches.map(coach => ({
        ...coach,
        status: coach.is_active === '1' ? 'Active' : 'Inactive',
        id: coach.id.toString(),
      }));

      if (isMounted.current) {
        setCoaches(mappedCoaches);
      }
    } catch (error) {
      console.error('Error fetching coaches:', error);
      Alert.alert('Error', error.message);
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    isMounted.current = true;
    fetchCoaches();
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleArchive = async (coachId, currentStatus) => {
    const isActive = currentStatus === 'Active';
    const newStatus = isActive ? '0' : '1';

    Alert.alert(
      isActive ? 'Archive Coach' : 'Unarchive Coach',
      isActive
        ? 'Are you sure you want to archive this coach?'
        : 'Are you sure you want to unarchive this coach?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Confirm',
          onPress: async () => {
            try {
              const response = await fetch(
                `${ip_adress}/manager/update_coach_status/${coachId}`,
                {
                  method: 'PUT',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({is_active: newStatus}),
                },
              );

              const result = await response.json();

              if (!response.ok || !result.value) {
                throw new Error(result.message || 'Failed to update status');
              }

              if (isMounted.current) {
                setCoaches(prevCoaches =>
                  prevCoaches.map(coach =>
                    coach.id === coachId
                      ? {
                          ...coach,
                          is_active: newStatus,
                          status: newStatus === '1' ? 'Active' : 'Inactive',
                        }
                      : coach,
                  ),
                );
                Alert.alert('Success', result.message);
              }
            } catch (error) {
              Alert.alert('Error', error.message || 'Operation failed');
            }
          },
        },
      ],
    );
  };

  const renderCoach = ({item}) => (
    <View style={styles.card}>
      <Image
        source={require('../CricketCoachingSystem/images/coach_logo.png')}
        style={styles.logo}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.detail}>DOB: {formatDOB(item.date_of_birth)}</Text>
        <Text style={styles.detail}>Contact: {item.contact_no}</Text>
        <Text style={styles.detail}>Experience: {item.experience} years</Text>
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
            navigation.navigate('UpdateCoachScreen', {coachId: item.id})
          }>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );

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
  //         <TouchableOpacity onPress={() => navigation.goBack()}>
  //           <Text style={styles.backButton}>{'< Back'}</Text>
  //         </TouchableOpacity>
  //         <Text style={styles.title}>View Coaches</Text>
  //       </View>
  //       <FlatList
  //         data={coaches}
  //         renderItem={renderCoach}
  //         keyExtractor={item => item.id}
  //         contentContainerStyle={styles.list}
  //         ListEmptyComponent={
  //           <Text style={styles.emptyText}>No coaches found</Text>
  //         }
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
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>{'< Back'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>View Coaches</Text>
      </View>

      <FlatList
        data={coaches}
        renderItem={renderCoach}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={<View style={styles.footer} />}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No coaches found</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  archiveButton: {
    backgroundColor: '#FFA500',
  },
  unarchiveButton: {
    backgroundColor: '#33B5E5',
  },
  container: {
    flex: 1,
    position: 'relative',
    paddingTop: 15,
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
    left: 0,
    bottom: 10,
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
  },
  listContent: {
    padding: 18,
    paddingTop: 100,
    paddingBottom: 30,
  },
  footer: {
    height: 30, // Additional space at the bottom
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 25,
    marginBottom: 30,
    alignItems: 'center',
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
    backgroundColor: 'rgb(194, 198, 205)',
  },
  info: {
    flex: 1,
    marginRight: 10,
    // marginBottom: 30,   // For Update/Archieve buttons
    marginBottom: 28,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  detail: {
    fontSize: 15,
    color: '#555',
  },
  activeStatus: {
    color: 'green',
    fontWeight: 'bold',
  },
  inactiveStatus: {
    color: 'red',
    fontWeight: 'bold',
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
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#555',
  },
});

export default ViewCoachesScreen;
//........................................................................

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
// import {ip_adress} from './IP-config'; // Make sure to import your IP configuration
// import CustomGradient from './components/CustomGradient';

// const ViewCoachesScreen = ({navigation}) => {
//   const [coaches, setCoaches] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const isMounted = useRef(true); // Track mounted state

//   // Fetch coaches from the API
//   const fetchCoaches = async () => {
//     try {
//       const response = await fetch(ip_adress + '/api/admin/view_coaches');
//       const data = await response.json();
//       if (response.ok) {
//         if (isMounted.current) {
//           setCoaches(data.coaches || []); // Assuming the API returns { "coaches": [...] }
//         }
//       } else {
//         console.error(data.message || 'Failed to fetch coaches');
//       }
//     } catch (error) {
//       console.error('Error fetching coaches:', error);
//     } finally {
//       if (isMounted.current) {
//         setLoading(false);
//       }
//     }
//   };

//   useEffect(() => {
//     isMounted.current = true; // Set mounted to true
//     fetchCoaches();

//     return () => {
//       isMounted.current = false; // Cleanup on unmount
//     };
//   }, []);

//   // Handle Delete Coach
//   const handleDelete = coachId => {
//     if (!isMounted.current) return; // Don't proceed if component is unmounted

//     Alert.alert(
//       'Delete Coach',
//       'Are you sure you want to delete this coach?',
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
//                 `${ip_adress}/api/admin/DeleteCoach/${coachId}`,
//                 {
//                   method: 'DELETE',
//                   headers: {
//                     'Content-Type': 'application/json',
//                   },
//                 },
//               );

//               const result = await response.json();

//               if (!response.ok) {
//                 throw new Error(result.error || 'Failed to delete coach');
//               }

//               if (isMounted.current) {
//                 setCoaches(prevCoaches =>
//                   prevCoaches.filter(coach => coach.id !== coachId),
//                 );
//                 Alert.alert('Success', result.message);
//               }
//             } catch (error) {
//               if (isMounted.current) {
//                 console.error('Delete error:', error);
//                 Alert.alert('Error', error.message || 'Failed to delete coach');
//               }
//             }
//           },
//           style: 'destructive',
//         },
//       ],
//       {cancelable: true},
//     );
//   };

//   // Handle Update Coach
//   const handleUpdate = coachId => {
//     if (!isMounted.current) return; // Don't proceed if component is unmounted
//     navigation.navigate('UpdateCoachScreen', {coachId});
//   };

//   // Render each coach card
//   const renderCoach = ({item}) => (
//     <View style={styles.card}>
//       <Image
//         source={
//           require('../CricketCoachingSystem/images/Islamabad.png') // Default fallback
//         }
//         style={styles.logo}
//       />
//       <View style={styles.info}>
//         <Text style={styles.name}>{item.name}</Text>
//         <Text style={styles.detail}>Age: {item.age}</Text>
//         <Text style={styles.detail}>Contact: {item.contact_no}</Text>
//         <Text style={styles.detail}>Experience: {item.experience} years</Text>
//       </View>
//       {/* Delete/Update Buttons */}
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity
//           style={[styles.button, styles.deleteButton]}
//           onPress={() => handleDelete(item.id)}>
//           <Text style={styles.buttonText}>Delete</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.button, styles.updateButton]}
//           onPress={() => handleUpdate(item.id)}>
//           <Text style={styles.buttonText}>Update</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   // Show a loading spinner while data is being fetched
//   if (loading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {/* Custom Gradient Background */}
//       <CustomGradient style={styles.gradientBackground} />

//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backButtonContainer}
//           activeOpacity={0.5}
//           onPress={() => navigation.goBack('CoachScreen')}>
//           <Text style={styles.backButton}>{'< Back'}</Text>
//         </TouchableOpacity>
//         <Text style={styles.title}>View Coaches</Text>
//       </View>

//       {/* List of Coaches */}
//       <FlatList
//         data={coaches}
//         renderItem={renderCoach}
//         keyExtractor={(item, index) => index.toString()}
//         contentContainerStyle={[styles.list, {paddingBottom: 80}]} // Add paddingBottom for better scrolling
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
// container: {
//   flex: 1,
//   position: 'relative',
// },
// gradientBackground: {
//   ...StyleSheet.absoluteFillObject,
// },
// header: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   backgroundColor: '#E6F2E6',
//   padding: 30,
//   borderBottomWidth: 1,
//   borderBottomColor: '#DFF4DF',
//   width: '100%',
//   position: 'absolute',
//   top: 0,
//   zIndex: 10, // Ensure the header stays on top
// },
// backButtonContainer: {
//   position: 'absolute',
//   left: 10,
//   top: 10,
// },
// backButton: {
//   color: '#000080',
//   fontSize: 13,
//   fontWeight: '600',
//   marginTop: 25,
// },
// title: {
//   flex: 1,
//   textAlign: 'center',
//   color: '#000080',
//   fontSize: 22,
//   fontWeight: 'bold',
// },
// list: {
//   padding: 20,
//   marginTop: 100, // Add margin to offset the header height
// },
// card: {
//   flexDirection: 'row',
//   backgroundColor: 'white',
//   borderRadius: 10,
//   padding: 25,
//   marginBottom: 20,
//   alignItems: 'center',
//   shadowColor: '#000',
//   shadowOffset: {width: 0, height: 2},
//   shadowOpacity: 0.2,
//   shadowRadius: 3,
//   elevation: 5,
//   minHeight: 150, // Add minimum height for button space
// },
// logo: {
//   width: 60,
//   height: 60,
//   borderRadius: 30,
//   marginRight: 15,
//   borderWidth: 1,
//   borderColor: 'rgba(28,58,107,1)',
// },
// info: {
//   flex: 1,
//   marginRight: 10,
//   marginBottom: 30, // Space for buttons
// },
// name: {
//   fontSize: 18,
//   fontWeight: 'bold',
//   color: '#000',
//   marginBottom: 5,
// },
// detail: {
//   fontSize: 14,
//   color: '#555',
// },
// buttonContainer: {
//   flexDirection: 'row',
//   position: 'absolute',
//   bottom: 10,
//   right: 10,
//   gap: 8,
// },
// button: {
//   paddingVertical: 6,
//   paddingHorizontal: 12,
//   borderRadius: 5,
// },
// deleteButton: {
//   backgroundColor: '#FF4444',
// },
// updateButton: {
//   backgroundColor: '#33B5E5',
// },
// buttonText: {
//   color: '#FFF',
//   fontSize: 14,
//   fontWeight: '600',
// },
// loaderContainer: {
//   flex: 1,
//   justifyContent: 'center',
//   alignItems: 'center',
// },
// });

// export default ViewCoachesScreen;
