import {ip_adress} from './IP-config';
import React, {useState, useEffect, useRef, useCallback} from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

const CoachViewPlayersScreen = ({navigation}) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [coachId, setCoachId] = useState(null);
  const isMounted = useRef(true);

  // Function to format DOB to YYYY/MM/DD
  const formatDOB = dobString => {
    if (!dobString) return 'N/A';
    const date = new Date(dobString);
    if (isNaN(date.getTime())) return 'N/A';
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(
      2,
      '0',
    )}/${String(date.getDate()).padStart(2, '0')}`;
  };

  // Get coach ID from AsyncStorage
  useEffect(() => {
    const getCoachId = async () => {
      try {
        const id = await AsyncStorage.getItem('user_id');
        if (id) setCoachId(id);
      } catch (error) {
        console.error('Error getting coach ID:', error);
        Alert.alert('Error', 'Failed to load coach data');
      }
    };
    getCoachId();
  }, []);

  // Fetch team players with useCallback
  const fetchTeamPlayers = useCallback(async () => {
    if (!coachId) return;

    try {
      setLoading(true);
      const response = await fetch(
        `${ip_adress}/coach/view_team_players/${coachId}`,
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch team players');
      }

      const data = await response.json();

      if (!data.value) {
        throw new Error(data.message || 'No players found');
      }

      // Map players with proper status and ID
      // const mappedPlayers = data.players.map(player => ({
      //   ...player,
      //   status: player.is_active === '1' ? 'Active' : 'Inactive',
      //   id: player.id.toString(),
      //   DOB: player.date_of_birth,
      // }));
      // In CoachViewPlayersScreen, ensure id is passed as a number
      const mappedPlayers = data.players.map(player => ({
        ...player,
        status: player.is_active === '1' ? 'Active' : 'Inactive',
        id: player.id, // Keep as number for navigation
        DOB: player.date_of_birth,
      }));

      if (isMounted.current) setPlayers(mappedPlayers);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      if (isMounted.current) setLoading(false);
    }
  }, [coachId]);

  useEffect(() => {
    isMounted.current = true;
    if (coachId) fetchTeamPlayers();

    return () => {
      isMounted.current = false;
    };
  }, [coachId, fetchTeamPlayers]); // Include fetchTeam in dependencies

  // Render each player item
  const renderPlayer = ({item}) => (
    <View style={styles.card}>
      <Image
        source={require('../CricketCoachingSystem/images/player_logo.png')}
        style={styles.logo}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.playerName}>{item.name || 'N/A'}</Text>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Date of Birth:</Text>
          <Text style={styles.detailValue}>{formatDOB(item.DOB)}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Experience:</Text>
          <Text style={styles.detailValue}>{item.experience || 'N/A'}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Type:</Text>
          <Text style={styles.detailValue}>{item.type || 'N/A'}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Status:</Text>
          <Text
            style={[
              styles.detailValue,
              item.status === 'Active'
                ? styles.activeStatus
                : styles.inactiveStatus,
            ]}>
            {item.status}
          </Text>
        </View>

        {/* Performance Button */}
        {/* <TouchableOpacity
          style={styles.performanceButton}
          onPress={() =>
            navigation.navigate('PlayerPerformance', {playerId: item.id})
          }>
          <Text style={styles.performanceButtonText}>Performance</Text>
        </TouchableOpacity> */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.performanceButton}
            onPress={() =>
              navigation.navigate('PerformanceScreen', {playerId: item.id})
            }>
            <Text style={styles.performanceButtonText}>Performance</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <CustomGradient style={styles.gradientBackground} />
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomGradient style={styles.gradientBackground} />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButtonContainer}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>{'< Back'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Team Players</Text>
      </View>

      <FlatList
        data={players}
        renderItem={renderPlayer}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No players found in your team</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
    padding: 35,
    borderBottomWidth: 1,
    borderBottomColor: '#DFF4DF',
  },
  backButtonContainer: {
    position: 'absolute',
    left: 13,
    top: 40,
    zIndex: 1,
  },
  backButton: {
    color: '#000080',
    fontSize: 13.5,
    fontWeight: '600',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: '#000080',
    fontSize: 21,
    fontWeight: 'bold',
  },
  listContent: {
    padding: 16,
    paddingTop: 45,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 14,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    minHeight: 160, // Add minimum height for consistent cards
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#1C3A6B',
    top: 45,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  playerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C3A6B',
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 6,
  },
  detailLabel: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
    marginRight: 5,
  },
  detailValue: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
  },

  performanceButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 12,
  },
  performanceButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 20, // Increased horizontal padding
    alignSelf: 'center',
    right: 30,
  },
  activeStatus: {
    color: 'green',
  },
  inactiveStatus: {
    color: 'red',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});

export default CoachViewPlayersScreen;
