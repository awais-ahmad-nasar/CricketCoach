// import {ip_adress} from './IP-config';
// import React, {useState, useEffect, useCallback} from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
//   ActivityIndicator,
//   RefreshControl,
// } from 'react-native';
// import CustomGradient from './components/CustomGradient';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const ViewArrangedSessionsScreen = ({navigation}) => {
// const [sessions, setSessions] = useState([]);
// const [loading, setLoading] = useState(true);
// const [refreshing, setRefreshing] = useState(false);
// const [coachId, setCoachId] = useState(null);

// // Get coach ID from AsyncStorage
// useEffect(() => {
//   const getCoachId = async () => {
//     try {
//       const id = await AsyncStorage.getItem('user_id');
//       if (id) {
//         setCoachId(id);
//       } else {
//         Alert.alert('Error', 'User not authenticated');
//         navigation.goBack();
//       }
//     } catch (error) {
//       console.error('Error getting user ID:', error);
//       Alert.alert('Error', 'Failed to load user data');
//       navigation.goBack();
//     }
//   };
//   getCoachId();
// }, [navigation]);

// const fetchSessions = useCallback(async () => {
//   if (!coachId) return;

//   try {
//     setLoading(true);
//     const response = await fetch(
//       `${ip_adress}/coach/view_arranged_sessions/${coachId}`,
//     );
//     const data = await response.json();

//     if (!response.ok || !data.value) {
//       throw new Error(data.message || 'Failed to fetch sessions');
//     }

//     // Format the sessions data
//     const formatDate = dateStr => {
//       if (!dateStr || dateStr === 'N/A') return 'N/A';
//       try {
//         const dateObj = new Date(dateStr);
//         return dateObj.toLocaleDateString('en-GB', {
//           weekday: 'short',
//           day: '2-digit',
//           month: 'short',
//           year: 'numeric',
//         });
//       } catch (e) {
//         console.error('Error formatting date:', e);
//         return dateStr;
//       }
//     };

//     // Format the sessions data
//     const formattedSessions = data.sessions.map(session => {
//       // Format time to 12-hour format
//       const formatTime = timeStr => {
//         if (!timeStr || timeStr === 'N/A') return 'N/A';

//         try {
//           const [hours, minutes] = timeStr.split(':');
//           const hour = parseInt(hours, 10);
//           const ampm = hour >= 12 ? 'PM' : 'AM';
//           const formattedHour = hour % 12 || 12;
//           return `${formattedHour}:${minutes} ${ampm}`;
//         } catch (e) {
//           console.error('Error formatting time:', e);
//           return timeStr;
//         }
//       };

//       return {
//         id: session.id,
//         session_type: session.session_type,
//         date: formatDate(session.date), // 👈 correctly formatted date
//         time: `${formatTime(session.start_time)} - ${formatTime(
//           session.end_time,
//         )}`,
//         venue: session.venue,
//         player: session.player_name || 'N/A', // 👈 fixed player name
//         player_id: session.player_id,
//       };
//     });

//     setSessions(formattedSessions);
//   } catch (error) {
//     console.error('Fetch error:', error);
//     Alert.alert('Error', error.message || 'Failed to load sessions');
//   } finally {
//     setLoading(false);
//     setRefreshing(false);
//   }
// }, [coachId]);

// // Refresh control handler
// const onRefresh = useCallback(() => {
//   setRefreshing(true);
//   fetchSessions();
// }, [fetchSessions]);

// // Fetch sessions when coachId changes or screen focuses
// useEffect(() => {
//   const unsubscribe = navigation.addListener('focus', fetchSessions);
//   fetchSessions();
//   return unsubscribe;
// }, [fetchSessions, navigation]);

// if (loading && sessions.length === 0) {
//   return (
//     <View style={styles.loaderContainer}>
//       <CustomGradient style={styles.gradientBackground} />
//       <ActivityIndicator size="large" color="#000080" />
//     </View>
//   );
// }

//   return (
//     <ScrollView
//       contentContainerStyle={styles.scrollContainer}
//       refreshControl={
//         <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//       }>
//       <CustomGradient style={styles.gradientBackground} />

//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backButton}
//           onPress={() => navigation.goBack()}>
//           <MaterialIcons name="arrow-back" size={24} color="#000080" />
//         </TouchableOpacity>
//         <Text style={styles.title}>View Arranged Sessions</Text>
//       </View>

//       <View style={styles.contentContainer}>
//         {sessions.length === 0 ? (
//           <Text style={styles.emptyText}>No sessions arranged yet.</Text>
//         ) : (
//           sessions.map((session, index) => (
//             <TouchableOpacity
//               key={`session-${session.id || index}`}
//               style={styles.sessionCard}
//               onPress={() =>
//                 navigation.navigate('SessionDetails', {sessionId: session.id})
//               }>
//               <View style={styles.cardHeader}>
//                 <Text style={styles.cardTitle}>{session.session_type}</Text>
//               </View>

//               <View style={styles.detailRow}>
//                 <Text style={styles.detailLabel}>Date:</Text>
//                 <Text style={styles.detailValue}>{session.date}</Text>
//               </View>

//               <View style={styles.detailRow}>
//                 <Text style={styles.detailLabel}>Time:</Text>
//                 <Text style={styles.detailValue}>{session.time}</Text>
//               </View>

//               <View style={styles.detailRow}>
//                 <Text style={styles.detailLabel}>Venue:</Text>
//                 <Text style={styles.detailValue}>{session.venue}</Text>
//               </View>

//               <View style={styles.detailRow}>
//                 <Text style={styles.detailLabel}>Player:</Text>
//                 <Text style={styles.detailValue}>{session.player}</Text>
//               </View>
//             </TouchableOpacity>
//           ))
//         )}
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   scrollContainer: {
//     flexGrow: 1,
//     paddingBottom: 50,
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
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
//     paddingTop: 30,
//   },
//   backButton: {
//     marginRight: 15,
//   },
//   title: {
//     flex: 1,
//     color: '#000080',
//     fontSize: 22,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   contentContainer: {
//     padding: 20,
//   },
//   sessionCard: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 3,
//     borderLeftWidth: 4,
//     borderLeftColor: '#fff',
//   },
//   cardHeader: {
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//     paddingBottom: 10,
//     marginBottom: 15,
//   },
//   cardTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#000080',
//   },
//   detailRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   detailLabel: {
//     fontSize: 16,
//     color: '#666',
//     fontWeight: '500',
//   },
//   detailValue: {
//     fontSize: 16,
//     color: '#000',
//     fontWeight: '600',
//     maxWidth: '60%',
//     textAlign: 'right',
//   },
//   emptyText: {
//     fontSize: 16,
//     color: '#666',
//     textAlign: 'center',
//     marginTop: 40,
//   },
// });

// export default ViewArrangedSessionsScreen;

// import {ip_adress} from './IP-config';
// import React, {useState, useEffect, useCallback} from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
//   ActivityIndicator,
//   RefreshControl,
// } from 'react-native';
// import CustomGradient from './components/CustomGradient';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const ViewArrangedSessionsScreen = ({navigation}) => {
//   // ... [Keep all state and effect hooks same as original] ...
//   const [sessions, setSessions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [coachId, setCoachId] = useState(null);

//   // Get coach ID from AsyncStorage
//   useEffect(() => {
//     const getCoachId = async () => {
//       try {
//         const id = await AsyncStorage.getItem('user_id');
//         if (id) {
//           setCoachId(id);
//         } else {
//           Alert.alert('Error', 'User not authenticated');
//           navigation.goBack();
//         }
//       } catch (error) {
//         console.error('Error getting user ID:', error);
//         Alert.alert('Error', 'Failed to load user data');
//         navigation.goBack();
//       }
//     };
//     getCoachId();
//   }, [navigation]);

//   const fetchSessions = useCallback(async () => {
//     if (!coachId) return;

//     try {
//       setLoading(true);
//       const response = await fetch(
//         `${ip_adress}/coach/view_arranged_sessions/${coachId}`,
//       );
//       const data = await response.json();

//       if (!response.ok || !data.value) {
//         throw new Error(data.message || 'Failed to fetch sessions');
//       }

//       // Format the sessions data
//       const formatDate = dateStr => {
//         if (!dateStr || dateStr === 'N/A') return 'N/A';
//         try {
//           const dateObj = new Date(dateStr);
//           return dateObj.toLocaleDateString('en-GB', {
//             weekday: 'short',
//             day: '2-digit',
//             month: 'short',
//             year: 'numeric',
//           });
//         } catch (e) {
//           console.error('Error formatting date:', e);
//           return dateStr;
//         }
//       };

//       // Format the sessions data
//       const formattedSessions = data.sessions.map(session => {
//         // Format time to 12-hour format
//         const formatTime = timeStr => {
//           if (!timeStr || timeStr === 'N/A') return 'N/A';

//           try {
//             const [hours, minutes] = timeStr.split(':');
//             const hour = parseInt(hours, 10);
//             const ampm = hour >= 12 ? 'PM' : 'AM';
//             const formattedHour = hour % 12 || 12;
//             return `${formattedHour}:${minutes} ${ampm}`;
//           } catch (e) {
//             console.error('Error formatting time:', e);
//             return timeStr;
//           }
//         };

//         return {
//           id: session.id,
//           session_type: session.session_type,
//           date: formatDate(session.date), // 👈 correctly formatted date
//           time: `${formatTime(session.start_time)} - ${formatTime(
//             session.end_time,
//           )}`,
//           venue: session.venue,
//           player: session.player_name || 'N/A', // 👈 fixed player name
//           player_id: session.player_id,
//         };
//       });

//       setSessions(formattedSessions);
//     } catch (error) {
//       console.error('Fetch error:', error);
//       Alert.alert('Error', error.message || 'Failed to load sessions');
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   }, [coachId]);

//   // Refresh control handler
//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     fetchSessions();
//   }, [fetchSessions]);

//   // Fetch sessions when coachId changes or screen focuses
//   useEffect(() => {
//     const unsubscribe = navigation.addListener('focus', fetchSessions);
//     fetchSessions();
//     return unsubscribe;
//   }, [fetchSessions, navigation]);

//   if (loading && sessions.length === 0) {
//     return (
//       <View style={styles.loaderContainer}>
//         <CustomGradient style={styles.gradientBackground} />
//         <ActivityIndicator size="large" color="#000080" />
//       </View>
//     );
//   }

//   return (
//     <ScrollView
//       contentContainerStyle={styles.scrollContainer}
//       refreshControl={
//         <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//       }>
//       <CustomGradient style={styles.gradientBackground} />

//       {/* Updated Header */}
//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backButtonContainer}
//           onPress={() => navigation.goBack('Coachdashboard')}>
//           <Text style={styles.backButton}>{'< Back'}</Text>
//         </TouchableOpacity>
//         <Text style={styles.title}>View Arranged Sessions</Text>
//       </View>

//       <View style={styles.contentContainer}>
//         {sessions.length === 0 ? (
//           <Text style={styles.emptyText}>No sessions arranged yet.</Text>
//         ) : (
//           sessions.map((session, index) => (
//             <View key={`session-${session.id || index}`} style={styles.card}>
//               {/* Card Content */}
//               <View style={styles.cardContent}>
//                 <Text style={styles.sessionType}>{session.session_type}</Text>

//                 <View style={styles.detailRow}>
//                   <Text style={styles.detailLabel}>Date:</Text>
//                   <Text style={styles.detailValue}>{session.date}</Text>
//                 </View>

//                 <View style={styles.detailRow}>
//                   <Text style={styles.detailLabel}>Time:</Text>
//                   <Text style={styles.detailValue}>{session.time}</Text>
//                 </View>

//                 <View style={styles.detailRow}>
//                   <Text style={styles.detailLabel}>Venue:</Text>
//                   <Text style={styles.detailValue}>{session.venue}</Text>
//                 </View>

//                 <View style={styles.detailRow}>
//                   <Text style={styles.detailLabel}>Player:</Text>
//                   <Text style={styles.detailValue}>{session.player}</Text>
//                 </View>
//               </View>

//               {/* Action Buttons */}
//               <View style={styles.buttonContainer}>
//                 <TouchableOpacity
//                   style={[styles.actionButton, styles.recordButton]}
//                   onPress={() => handleRecordSession(session.id)}>
//                   <Text style={styles.buttonText}>Record Session</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   style={[styles.actionButton, styles.aiCoachButton]}
//                   onPress={() => navigation.navigate(session.id)}>
//                   <Text style={styles.buttonText}>AI Coach</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           ))
//         )}
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   scrollContainer: {
//     flexGrow: 1,
//     paddingBottom: 20,
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   gradientBackground: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   // Updated Header Styles
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#E6F2E6',
//     padding: 35,
//     borderBottomWidth: 1,
//     borderBottomColor: '#DFF4DF',
//   },
//   backButtonContainer: {
//     position: 'absolute',
//     left: 18,
//     zIndex: 1,
//   },
//   backButton: {
//     color: '#000080',
//     fontSize: 13,
//     fontWeight: '600',
//     top: 1,
//   },
//   title: {
//     flex: 1,
//     textAlign: 'center',
//     color: '#000080',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   contentContainer: {
//     padding: 16,
//     paddingTop: 80,
//   },
//   // Card Styles
//   card: {
//     backgroundColor: 'white',
//     borderRadius: 12,
//     padding: 14,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 3,
//   },
//   cardContent: {
//     marginBottom: 5,
//   },
//   sessionType: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#1C3A6B',
//     marginBottom: 12,
//   },
//   detailRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//   },
//   detailLabel: {
//     fontSize: 14,
//     color: '#555',
//     fontWeight: '500',
//   },
//   detailValue: {
//     fontSize: 14,
//     color: '#000',
//     fontWeight: '600',
//     maxWidth: '60%',
//     textAlign: 'right',
//   },
//   // Button Styles
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 12,
//   },
//   actionButton: {
//     flex: 1,
//     borderRadius: 8,
//     paddingVertical: 10,
//     alignItems: 'center',
//   },
//   recordButton: {
//     backgroundColor: '#4CAF50',
//     marginRight: 8,
//   },
//   aiCoachButton: {
//     backgroundColor: '#2196F3',
//     marginLeft: 8,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   emptyText: {
//     fontSize: 16,
//     color: '#666',
//     textAlign: 'center',
//     marginTop: 40,
//   },
// });

// export default ViewArrangedSessionsScreen;

import {ip_adress} from './IP-config';
import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import CustomGradient from './components/CustomGradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ViewArrangedSessionsScreen = ({navigation}) => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [coachId, setCoachId] = useState(null);

  // Get coach ID from AsyncStorage
  useEffect(() => {
    const getCoachId = async () => {
      try {
        const id = await AsyncStorage.getItem('user_id');
        if (id) {
          setCoachId(id);
        } else {
          Alert.alert('Error', 'User not authenticated');
          navigation.goBack();
        }
      } catch (error) {
        console.error('Error getting user ID:', error);
        Alert.alert('Error', 'Failed to load user data');
        navigation.goBack();
      }
    };
    getCoachId();
  }, [navigation]);

  const fetchSessions = useCallback(async () => {
    if (!coachId) return;

    try {
      setLoading(true);
      const response = await fetch(
        `${ip_adress}/coach/view_arranged_sessions/${coachId}`,
      );
      const data = await response.json();

      if (!response.ok || !data.value) {
        throw new Error(data.message || 'Failed to fetch sessions');
      }

      // Format the sessions data
      const formatDate = dateStr => {
        if (!dateStr || dateStr === 'N/A') return 'N/A';
        try {
          const dateObj = new Date(dateStr);
          return dateObj.toLocaleDateString('en-GB', {
            weekday: 'short',
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          });
        } catch (e) {
          console.error('Error formatting date:', e);
          return dateStr;
        }
      };

      // Format the sessions data
      const formattedSessions = data.sessions.map(session => {
        // Format time to 12-hour format
        const formatTime = timeStr => {
          if (!timeStr || timeStr === 'N/A') return 'N/A';

          try {
            const [hours, minutes] = timeStr.split(':');
            const hour = parseInt(hours, 10);
            const ampm = hour >= 12 ? 'PM' : 'AM';
            const formattedHour = hour % 12 || 12;
            return `${formattedHour}:${minutes} ${ampm}`;
          } catch (e) {
            console.error('Error formatting time:', e);
            return timeStr;
          }
        };

        return {
          id: session.id,
          session_type: session.session_type,
          date: formatDate(session.date),
          time: `${formatTime(session.start_time)} - ${formatTime(
            session.end_time,
          )}`,
          venue: session.venue,
          player: session.player_name || 'N/A',
          player_id: session.player_id,
        };
      });

      setSessions(formattedSessions);
    } catch (error) {
      console.error('Fetch error:', error);
      Alert.alert('Error', error.message || 'Failed to load sessions');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [coachId]);

  // Refresh control handler
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchSessions();
  }, [fetchSessions]);

  // Fetch sessions when coachId changes or screen focuses
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchSessions);
    fetchSessions();
    return unsubscribe;
  }, [fetchSessions, navigation]);

  if (loading && sessions.length === 0) {
    return (
      <View style={styles.loaderContainer}>
        <CustomGradient style={styles.gradientBackground} />
        <ActivityIndicator size="large" color="#000080" />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <CustomGradient style={styles.gradientBackground} />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButtonContainer}
          onPress={() => navigation.goBack('Coachdashboard')}>
          <Text style={styles.backButton}>{'< Back'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>View Arranged Sessions</Text>
      </View>

      <View style={styles.contentContainer}>
        {sessions.length === 0 ? (
          <Text style={styles.emptyText}>No sessions arranged yet.</Text>
        ) : (
          sessions.map((session, index) => (
            <View key={`session-${session.id || index}`} style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.sessionType}>{session.session_type}</Text>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Date:</Text>
                  <Text style={styles.detailValue}>{session.date}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Time:</Text>
                  <Text style={styles.detailValue}>{session.time}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Venue:</Text>
                  <Text style={styles.detailValue}>{session.venue}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Player:</Text>
                  <Text style={styles.detailValue}>{session.player}</Text>
                </View>
              </View>

              {/* Updated Action Buttons */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.recordButton]}
                  onPress={() =>
                    navigation.navigate('RecordSessionScreen', {
                      sessionId: session.id,
                    })
                  }>
                  <Text style={styles.buttonText}>Record Session</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionButton, styles.aiCoachButton]}
                  onPress={() =>
                    navigation.navigate('RecordSessionScreen', {
                      sessionId: session.id,
                      aiCoachMode: true,
                    })
                  }>
                  <Text style={styles.buttonText}>AI Coach</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  backButtonContainer: {
    position: 'absolute',
    left: 10,
    zIndex: 1,
  },
  backButton: {
    color: '#000080',
    fontSize: 13.3,
    fontWeight: '600',
    top: 0,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: '#000080',
    fontSize: 20,
    fontWeight: 'bold',
  },
  contentContainer: {
    padding: 16,
    paddingTop: 80,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardContent: {
    marginBottom: 5,
  },
  sessionType: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C3A6B',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
    maxWidth: '60%',
    textAlign: 'right',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  actionButton: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  recordButton: {
    backgroundColor: '#4CAF50',
    marginRight: 8,
  },
  aiCoachButton: {
    backgroundColor: '#2196F3',
    marginLeft: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 40,
  },
});

export default ViewArrangedSessionsScreen;
