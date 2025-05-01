import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {ip_adress} from './IP-config';

const ViewManagersScreen = ({navigation}) => {
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch managers from the API
  const fetchManagers = async () => {
    try {
      const response = await fetch(ip_adress + '/api/admin/view_managers');
      const data = await response.json();
      if (response.ok) {
        setManagers(data.managers);
      } else {
        console.error(data.message || 'Failed to fetch managers');
      }
    } catch (error) {
      console.error('Error fetching managers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchManagers();
  }, []);

  // Local images for managers
  const localImages = {
    'Talal Waheed': require('../CricketCoachingSystem/images/Lahore.png'),
    // Add more mappings as needed
  };

  const renderManager = ({item}) => (
    <View style={styles.card}>
      <Image
        source={
          localImages[item.name] ||
          require('../CricketCoachingSystem/images/Islamabad.png')
        }
        style={styles.logo}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.detail}>Age: {item.age}</Text>
        <Text style={styles.detail}>Contact: {item.contact_no}</Text>
        <Text style={styles.detail}>Experience: {item.experience} years</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButtonContainer}
          activeOpacity={0.5}
          onPress={() => navigation.navigate('TeamScreen')}>
          <Text style={styles.backButton}>{'< Back'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>View Managers</Text>
      </View>
      <FlatList
        data={managers}
        renderItem={renderManager}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={[styles.list, {paddingBottom: 80}]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#90C290',
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
  list: {
    padding: 20,
    marginTop: 100,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 25,
    marginBottom: 50,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 1,
    borderColor: 'rgba(28,58,107,1)',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  detail: {
    fontSize: 14,
    color: '#555',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ViewManagersScreen;
