import {ip_adress} from './IP-config';
import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  SafeAreaView,
  Alert,
} from 'react-native';
import CustomGradient from './components/CustomGradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CoachViewTeamScreen = ({navigation}) => {
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [coachId, setCoachId] = useState(null);

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

  const fetchTeam = useCallback(async () => {
    if (!coachId) return;

    try {
      setLoading(true);
      const response = await fetch(`${ip_adress}/coach/view_team/${coachId}`);
      const data = await response.json();

      if (!response.ok || !data.value) {
        throw new Error(data.message || 'Failed to fetch team details');
      }

      setTeam(data.team);
    } catch (error) {
      console.error('Fetch error:', error);
      Alert.alert('Error', error.message || 'Failed to load team details');
    } finally {
      setLoading(false);
    }
  }, [coachId]);

  useEffect(() => {
    if (coachId) {
      fetchTeam();
    }
  }, [coachId, fetchTeam]);

  const localImages = {
    'Lahore Qalandars': require('../CricketCoachingSystem/images/Lahore.png'),
    'Karachi Kings': require('../CricketCoachingSystem/images/KarachiKings.png'),
    'Peshawar Zalmi': require('../CricketCoachingSystem/images/PeshawarZalmi.png'),
    'Islamabad United': require('../CricketCoachingSystem/images/Islamabad.png'),
    'Quetta Gladiators': require('../CricketCoachingSystem/images/Quetta.png'),
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <CustomGradient style={styles.gradientBackground} />
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <CustomGradient style={styles.gradientBackground} />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButtonContainer}
            onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>{'< Back'}</Text>
          </TouchableOpacity>
          <Text style={styles.title}>View Team</Text>
        </View>

        {/* Main Content */}
        {team ? (
          <View style={styles.contentContainer}>
            {/* Team Card */}
            <View style={styles.card}>
              <Image
                source={
                  localImages[team.team_name] ||
                  require('../CricketCoachingSystem/images/Islamabad.png')
                }
                style={styles.logo}
              />
              <View style={styles.infoContainer}>
                <Text style={styles.teamName}>{team.team_name}</Text>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Number of Players:</Text>
                  <Text style={styles.detailValue}>
                    {team.number_of_players}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Coach:</Text>
                  <Text style={styles.detailValue}>{team.coach}</Text>
                </View>
              </View>
            </View>

            {/* View Players Button */}
            <TouchableOpacity
              style={styles.viewButton}
              onPress={() =>
                navigation.navigate('CoachViewPlayers', {teamId: team.id})
              }>
              <Text style={styles.buttonText}>View more</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.noTeamContainer}>
            <Text style={styles.noTeamText}>No team assigned yet</Text>
          </View>
        )}
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
    padding: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#DFF4DF',
  },
  backButtonContainer: {
    position: 'absolute',
    left: 18,
    top: 42,
    zIndex: 1,
  },
  backButton: {
    color: '#000080',
    fontSize: 14,
    fontWeight: '600',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: '#000080',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    padding: 150,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 30,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginRight: 20,
    borderWidth: 1,
    borderColor: '#1C3A6B',
  },
  infoContainer: {
    flex: 1,
  },
  teamName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C3A6B',
    marginBottom: 2,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 0,
  },
  detailLabel: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
    marginRight: 5,
  },
  detailValue: {
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
  },
  // viewButton: {
  //   backgroundColor: '#4CAF50',
  //   borderRadius: 8,
  //   paddingVertical: 12,
  //   marginTop: 30,
  //   marginHorizontal: 20,
  //   alignItems: 'center',
  // },
  // buttonText: {
  //   color: 'white',
  //   fontSize: 16,
  //   fontWeight: '600',
  // },
  viewButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10, // Reduced from 8
    paddingVertical: 8, // Reduced from 12
    paddingHorizontal: 16, // Added horizontal padding
    marginTop: 20, // Reduced from 30
    alignSelf: 'center', // Center the button
  },
  buttonText: {
    color: 'white',
    fontSize: 16, // Reduced from 16
    fontWeight: '600',
  },
  noTeamContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noTeamText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CoachViewTeamScreen;
