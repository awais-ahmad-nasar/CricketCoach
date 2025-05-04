import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {PieChart} from 'react-native-gifted-charts';
import LinearGradient from 'react-native-linear-gradient';
import {ip_adress} from './IP-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width} = Dimensions.get('window');

const COLORS = {
  background: '#90C290', // Light green background
  text: '#1E3A8A', // Dark blue text
  green: '#28A745', // Green for pie chart
  red: '#DC3545', // Red for pie chart
  cardBackground: '#DFF4DF', // Card background
  headerBackground: '#FFFFFF', // White header background
};

const PlayerPerformanceScreen = () => {
  const navigation = useNavigation();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [playerId, setPlayerId] = useState(null); // Added playerId state

  // Get player ID from AsyncStorage
  useEffect(() => {
    const getPlayerId = async () => {
      try {
        const id = await AsyncStorage.getItem('user_id');
        if (id) {
          setPlayerId(id);
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
    getPlayerId();
  }, [navigation]);

  useEffect(() => {
    const fetchPlayerDetails = async () => {
      if (!playerId) return;

      try {
        const response = await fetch(
          `${ip_adress}/player/get_performance/${playerId}`, // Changed endpoint
        );
        const data = await response.json();

        if (data.value) {
          setPlayer(data.player);
        } else {
          Alert.alert('Error', data.message);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        Alert.alert('Error', 'Failed to fetch player details');
      } finally {
        setLoading(false);
      }
    };

    if (playerId) fetchPlayerDetails();
  }, [playerId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!player) {
    return (
      <View style={styles.errorContainer}>
        <Text>Player not found</Text>
      </View>
    );
  }

  const overallAccuracyData = [
    {value: player.overall_accuracy || 0, color: COLORS.green},
    {value: 100 - (player.overall_accuracy || 0), color: COLORS.red},
  ];

  const shotWiseData = Array.isArray(player.shot_wise_accuracy)
    ? player.shot_wise_accuracy.map(shot => ({
        name: shot.name,
        data: [
          {value: shot.accuracy || 0, color: COLORS.green},
          {value: 100 - (shot.accuracy || 0), color: COLORS.red},
        ],
      }))
    : [];

  // Navigation handler for shot-wise charts
  const handleShotPress = shotName => {
    // Navigate to a new screen with the shot name as a parameter
    // Replace 'ShotDetailScreen' with the actual screen name in your navigation stack
    navigation.navigate('ShotDetailScreen', {shotName});
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[COLORS.background, COLORS.background]}
        style={styles.gradientBackground}
      />
      <ScrollView contentContainerStyle={{paddingBottom: 20}}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Text style={styles.backButton}>{'< Back'}</Text>
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Performance</Text>
          </View>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.card}>
          <View style={styles.playerInfo}>
            <Image
              source={require('../CricketCoachingSystem/images/player_logo.png')}
              style={styles.playerImage}
            />
            <View style={styles.playerDetails}>
              <Text style={styles.detailText}>
                <Text style={styles.label}>Name: </Text>
                <Text style={styles.value}>{player.name.toUpperCase()}</Text>
              </Text>
              <Text style={styles.detailText}>
                <Text style={styles.label}>Team: </Text>
                <Text style={styles.value}>{player.team}</Text>
              </Text>
              <Text style={styles.detailText}>
                <Text style={styles.label}>Type: </Text>
                <Text style={styles.value}>{player.type}</Text>
              </Text>
              <Text style={styles.detailText}>
                <Text style={styles.label}>Experience: </Text>
                <Text style={styles.value}>{player.experience}</Text>
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>OVERALL ACCURACY</Text>
          <View style={styles.chartContainer}>
            <PieChart
              data={overallAccuracyData}
              donut
              radius={80}
              innerRadius={50}
              textColor="black"
              textSize={24}
              fontWeight="bold"
              showText
              text={`${overallAccuracyData[0].value}%`}
            />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>SHOT-WISE ACCURACY</Text>
          {shotWiseData.length > 0 ? (
            <View style={styles.gridContainer}>
              {shotWiseData.map((shot, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.gridItem}
                  onPress={() => handleShotPress(shot.name)}
                  activeOpacity={0.7}>
                  <PieChart
                    data={shot.data}
                    donut
                    radius={45}
                    innerRadius={30}
                    textColor="black"
                    textSize={16}
                    fontWeight="bold"
                    showText
                    text={`${shot.data[0].value}%`}
                  />
                  <Text style={styles.shotName}>{shot.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <Text style={styles.noDataText}>No shot-wise data available</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: COLORS.headerBackground,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    color: '#000080',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 20,
    bottom: 10,
  },
  backText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: 'bold',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    color: COLORS.text,
    fontWeight: 'bold',
    fontSize: 24,
  },
  headerSpacer: {
    width: 30,
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 15,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerImage: {
    width: 60,
    height: 60,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: COLORS.text,
  },
  playerDetails: {
    marginLeft: 15,
    flex: 1,
  },
  detailText: {
    color: COLORS.text,
    fontSize: 14,
    marginBottom: 6,
  },
  label: {
    fontWeight: 'bold',
    color: COLORS.text,
  },
  value: {
    fontWeight: 'normal',
    color: COLORS.text,
  },
  chartContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 9,
  },
  gridItem: {
    width: '50%', // 2 items per row
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative', // To position the shot name inside the chart
  },
  sectionTitle: {
    color: COLORS.text,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  shotName: {
    color: COLORS.text,
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute', // Position the text inside the chart
    top: '50%', // Center vertically
    left: 0,
    right: 0,
    marginTop: -6, // Adjust for font size (half of fontSize to center vertically)
  },
  noDataText: {
    color: COLORS.text,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PlayerPerformanceScreen;
