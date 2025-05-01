import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PieChart} from 'react-native-chart-kit'; // Import PieChart
import {ip_adress} from './IP-config';

const ShotDetailScreen = ({route, navigation}) => {
  const {shotName} = route.params;
  const [coachId, setCoachId] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Set navigation header title
  useEffect(() => {
    navigation.setOptions({
      title: `${shotName} Sessions`,
      headerStyle: {backgroundColor: '#E0F7E0'},
      headerTintColor: '#000',
      headerTitleStyle: {fontWeight: 'bold', fontSize: 20},
    });
  }, [navigation, shotName]);

  // Fetch coachId from AsyncStorage
  useEffect(() => {
    const getCoachId = async () => {
      try {
        const id = await AsyncStorage.getItem('user_id');
        if (id) {
          setCoachId(id);
          console.log('Coach ID:', id);
        } else {
          throw new Error('User not authenticated');
        }
      } catch (err) {
        console.error('Error getting user ID:', err);
        setError('Failed to load user data');
        Alert.alert('Error', 'Failed to load user data');
        navigation.goBack();
      }
    };
    getCoachId();
  }, [navigation]);

  // Fetch shot details, memoized with useCallback
  const fetchShotDetails = useCallback(async () => {
    if (!coachId || !shotName) return;

    try {
      setLoading(true);
      setError(null);
      const url = `${ip_adress}/coach/get_shotbyshot_detail/${coachId}?shot_name=${encodeURIComponent(
        shotName,
      )}`;
      console.log('Fetching from URL:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Response: ${errorText}`,
        );
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`Expected JSON, got: ${text}`);
      }

      const data = await response.json();
      console.log('Parsed data:', data);

      if (data.value) {
        setSessions(data.sessions || []);
      } else {
        throw new Error(data.message || 'No session data returned');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError(`Failed to fetch shot details: ${err.message}`);
      Alert.alert('Error', `Failed to fetch shot details: ${err.message}`);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [coachId, shotName]);

  // Fetch data when coachId, shotName, or fetchShotDetails changes
  useEffect(() => {
    if (coachId && shotName) {
      fetchShotDetails();
    }
  }, [coachId, shotName, fetchShotDetails]);

  // Test backend connectivity on mount
  useEffect(() => {
    const testBackend = async () => {
      try {
        const response = await fetch(`${ip_adress}/health`);
        const data = await response.json();
        console.log('Health Check Response:', data);
      } catch (err) {
        console.error('Health Check Error:', err);
        Alert.alert(
          'Connectivity Issue',
          'Cannot reach the backend server. Please check your network or server status.',
        );
      }
    };
    testBackend();
  }, []);

  // Handle refresh button press
  const handleRefresh = () => {
    setRefreshing(true);
    setSessions([]);
    fetchShotDetails();
  };

  // Render each session card
  const renderSession = ({item}) => {
    const accuracy = parseFloat(item.accuracy);
    const chartData = [
      {
        name: 'Accuracy',
        value: accuracy,
        color: '#32CD32', // Green for accuracy
        legendFontColor: '#7F7F7F',
        legendFontSize: 0, // Hide legend
      },
      {
        name: 'Remaining',
        value: 100 - accuracy,
        color: '#FF4500', // Red for remaining
        legendFontColor: '#7F7F7F',
        legendFontSize: 0, // Hide legend
      },
    ];

    return (
      <View style={styles.sessionCard}>
        <Text style={styles.sessionType}>{item.session_type}</Text>
        <Text style={styles.sessionDetail}>Date: {item.date}</Text>
        <Text style={styles.sessionDetail}>
          Time: {item.start_time} - {item.end_time}
        </Text>
        <Text style={styles.sessionDetail}>Venue: {item.venue}</Text>
        <Text style={styles.sessionDetail}>Player: {item.player_name}</Text>
        <View style={styles.chartContainer}>
          <View style={styles.pieChartWrapper}>
            <PieChart
              data={chartData}
              width={60}
              height={60}
              chartConfig={{
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="value"
              backgroundColor="transparent"
              paddingLeft="0"
              absolute
              hasLegend={false}
            />
            <View style={styles.chartOverlay}>
              <Text style={styles.accuracyText}>{`${Math.round(
                accuracy,
              )}%`}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.viewMoreButton}
          onPress={() => {
            console.log(`View more for session ${item.id}`);
          }}>
          <Text style={styles.viewMoreText}>View More</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      {sessions.length === 0 ? (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>
            No sessions available for this shot.
          </Text>
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={handleRefresh}
            disabled={refreshing}>
            <Text style={styles.refreshButtonText}>
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={sessions}
          renderItem={renderSession}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7E0',
    padding: 16,
  },
  sessionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sessionType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  sessionDetail: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  chartContainer: {
    alignItems: 'flex-end',
    marginVertical: 10,
  },
  pieChartWrapper: {
    position: 'relative',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartOverlay: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  accuracyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  viewMoreButton: {
    alignSelf: 'flex-end',
  },
  viewMoreText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E90FF',
  },
  loadingText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    color: '#000',
    marginTop: 20,
  },
  errorText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    color: '#FF0000',
    marginTop: 20,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 18,
    color: '#000',
    marginBottom: 20,
  },
  refreshButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  refreshButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default ShotDetailScreen;

// import React, {useState, useEffect, useCallback} from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   Alert,
//   StyleSheet,
//   TouchableOpacity,
//   Dimensions,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {PieChart} from 'react-native-chart-kit';
// import {ip_adress} from './IP-config';

// const ShotDetailScreen = ({route, navigation}) => {
//   const {shotName, playerId} = route.params; // Added playerId from navigation params
//   const [coachId, setCoachId] = useState(null);
//   const [sessions, setSessions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [refreshing, setRefreshing] = useState(false);

//   // Set navigation header title
//   useEffect(() => {
//     navigation.setOptions({
//       title: `${shotName} Sessions`,
//       headerStyle: {backgroundColor: '#E0F7E0'},
//       headerTintColor: '#000',
//       headerTitleStyle: {fontWeight: 'bold', fontSize: 20},
//     });
//   }, [navigation, shotName]);

//   // Fetch coachId from AsyncStorage
//   useEffect(() => {
//     const getCoachId = async () => {
//       try {
//         const id = await AsyncStorage.getItem('user_id');
//         if (id) {
//           setCoachId(id);
//           console.log('Coach ID:', id);
//         } else {
//           throw new Error('User not authenticated');
//         }
//       } catch (err) {
//         console.error('Error getting user ID:', err);
//         setError('Failed to load user data');
//         Alert.alert('Error', 'Failed to load user data');
//         navigation.goBack();
//       }
//     };
//     getCoachId();
//   }, [navigation]);

//   // Fetch shot details for the player, memoized with useCallback
//   const fetchShotDetails = useCallback(async () => {
//     if (!coachId || !shotName || !playerId) return;

//     try {
//       setLoading(true);
//       setError(null);
//       const url = `${ip_adress}/coach/get_shotbyshot_detail/${coachId}/${playerId}?shot_name=${encodeURIComponent(
//         shotName,
//       )}`;
//       console.log('Fetching from URL:', url);

//       const response = await fetch(url, {
//         method: 'GET',
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(
//           `HTTP error! Status: ${response.status}, Response: ${errorText}`,
//         );
//       }

//       const contentType = response.headers.get('content-type');
//       if (!contentType || !contentType.includes('application/json')) {
//         const text = await response.text();
//         throw new Error(`Expected JSON, got: ${text}`);
//       }

//       const data = await response.json();
//       console.log('Parsed data:', data);

//       if (data.value) {
//         setSessions(data.sessions || []);
//       } else {
//         throw new Error(data.message || 'No session data returned');
//       }
//     } catch (err) {
//       console.error('Fetch error:', err);
//       setError(`Failed to fetch shot details: ${err.message}`);
//       Alert.alert('Error', `Failed to fetch shot details: ${err.message}`);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   }, [coachId, shotName, playerId]);

//   // Fetch data when coachId, shotName, playerId, or fetchShotDetails changes
//   useEffect(() => {
//     if (coachId && shotName && playerId) {
//       fetchShotDetails();
//     }
//   }, [coachId, shotName, playerId, fetchShotDetails]);

//   // Test backend connectivity on mount
//   useEffect(() => {
//     const testBackend = async () => {
//       try {
//         const response = await fetch(`${ip_adress}/health`);
//         const data = await response.json();
//         console.log('Health Check Response:', data);
//       } catch (err) {
//         console.error('Health Check Error:', err);
//         Alert.alert(
//           'Connectivity Issue',
//           'Cannot reach the backend server. Please check your network or server status.',
//         );
//       }
//     };
//     testBackend();
//   }, []);

//   // Handle refresh button press
//   const handleRefresh = () => {
//     setRefreshing(true);
//     setSessions([]);
//     fetchShotDetails();
//   };

//   // Render each session card
//   const renderSession = ({item}) => {
//     const accuracy = parseFloat(item.accuracy);
//     const chartData = [
//       {
//         name: 'Accuracy',
//         value: accuracy,
//         color: '#32CD32',
//         legendFontColor: '#7F7F7F',
//         legendFontSize: 0,
//       },
//       {
//         name: 'Remaining',
//         value: 100 - accuracy,
//         color: '#FF4500',
//         legendFontColor: '#7F7F7F',
//         legendFontSize: 0,
//       },
//     ];

//     return (
//       <View style={styles.sessionCard}>
//         <Text style={styles.sessionType}>{item.session_type}</Text>
//         <Text style={styles.sessionDetail}>Date: {item.date}</Text>
//         <Text style={styles.sessionDetail}>
//           Time: {item.start_time} - {item.end_time}
//         </Text>
//         <Text style={styles.sessionDetail}>Venue: {item.venue}</Text>
//         <Text style={styles.sessionDetail}>Player: {item.player_name}</Text>
//         <View style={styles.chartContainer}>
//           <View style={styles.pieChartWrapper}>
//             <PieChart
//               data={chartData}
//               width={60}
//               height={60}
//               chartConfig={{
//                 color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//               }}
//               accessor="value"
//               backgroundColor="transparent"
//               paddingLeft="0"
//               absolute
//               hasLegend={false}
//             />
//             <View style={styles.chartOverlay}>
//               <Text style={styles.accuracyText}>{`${Math.round(
//                 accuracy,
//               )}%`}</Text>
//             </View>
//           </View>
//         </View>
//         <TouchableOpacity
//           style={styles.viewMoreButton}
//           onPress={() => {
//             console.log(`View more for session ${item.id}`);
//           }}>
//           <Text style={styles.viewMoreText}>View More</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   if (loading) {
//     return <Text style={styles.loadingText}>Loading...</Text>;
//   }

//   if (error) {
//     return <Text style={styles.errorText}>{error}</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       {sessions.length === 0 ? (
//         <View style={styles.noDataContainer}>
//           <Text style={styles.noDataText}>
//             No sessions available for this shot and player.
//           </Text>
//           <TouchableOpacity
//             style={styles.refreshButton}
//             onPress={handleRefresh}
//             disabled={refreshing}>
//             <Text style={styles.refreshButtonText}>
//               {refreshing ? 'Refreshing...' : 'Refresh'}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       ) : (
//         <FlatList
//           data={sessions}
//           renderItem={renderSession}
//           keyExtractor={item => item.id.toString()}
//           contentContainerStyle={styles.listContainer}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#E0F7E0',
//     padding: 16,
//   },
//   sessionCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 15,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   sessionType: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#000',
//     marginBottom: 8,
//   },
//   sessionDetail: {
//     fontSize: 14,
//     color: '#333',
//     marginBottom: 5,
//   },
//   chartContainer: {
//     alignItems: 'flex-end',
//     marginVertical: 10,
//   },
//   pieChartWrapper: {
//     position: 'relative',
//     width: 60,
//     height: 60,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   chartOverlay: {
//     position: 'absolute',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   accuracyText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   viewMoreButton: {
//     alignSelf: 'flex-end',
//   },
//   viewMoreText: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#1E90FF',
//   },
//   loadingText: {
//     flex: 1,
//     textAlign: 'center',
//     fontSize: 18,
//     color: '#000',
//     marginTop: 20,
//   },
//   errorText: {
//     flex: 1,
//     textAlign: 'center',
//     fontSize: 18,
//     color: '#FF0000',
//     marginTop: 20,
//   },
//   noDataContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   noDataText: {
//     fontSize: 18,
//     color: '#000',
//     marginBottom: 20,
//   },
//   refreshButton: {
//     backgroundColor: '#1E90FF',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//   },
//   refreshButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   listContainer: {
//     paddingBottom: 20,
//   },
// });

// export default ShotDetailScreen;
