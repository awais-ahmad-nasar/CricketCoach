import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

const RecordSessionScreen = ({navigation, route}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [sessionId, setSessionId] = useState(null);
  const [coachId, setCoachId] = useState(null);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const [userId, userRole] = await Promise.all([
          AsyncStorage.getItem('user_id'),
          AsyncStorage.getItem('user_role'),
        ]);

        if (!userId || userRole !== 'coach') {
          await AsyncStorage.multiRemove(['user_id', 'user_role']);
          navigation.replace('SignIn');
          return;
        }
        setCoachId(userId);
        setIsLoading(false);
      } catch (error) {
        console.error('Session verification failed:', error);
        navigation.replace('SignIn');
      }
    };

    const unsubscribe = navigation.addListener('focus', verifySession);
    verifySession();
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (route.params?.sessionId) {
      setSessionId(route.params.sessionId);
    }
  }, [route.params]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000080" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#90C299', '#DCEDC1']}
        style={styles.gradientBackground}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ViewArrangedSessions')}
          style={styles.backButtonContainer}
          activeOpacity={0.5}>
          <Text style={styles.backButton}>{'< Back'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Record Session</Text>
      </View>

      {/* Buttons */}
      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() =>
            navigation.navigate('VideoPreviewScreen', {
              sessionId,
              coachId,
              mode: 'gallery',
            })
          }>
          <View style={styles.buttonContent}>
            <Image
              source={require('../CricketCoachingSystem/images/uploadVideo.png')}
              style={styles.buttonImage}
            />
            <Text style={styles.menuText}>Upload Video</Text>
          </View>
          <Text style={styles.dropdownIcon}>⋮</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() =>
            navigation.navigate('RecordLiveScreen', {sessionId, coachId})
          }>
          <View style={styles.buttonContent}>
            <Image
              source={require('../CricketCoachingSystem/images/liveRecording.png')}
              style={styles.buttonImage}
            />
            <Text style={styles.menuText}>Live Recording</Text>
          </View>
          <Text style={styles.dropdownIcon}>⋮</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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
  menu: {
    marginTop: 170,
    padding: 50,
  },
  menuItem: {
    backgroundColor: '#90C292',
    borderRadius: 10,
    padding: 25,
    marginBottom: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    position: 'relative',
  },
  buttonContent: {
    alignItems: 'center',
  },
  buttonImage: {
    width: 30,
    height: 30,
  },
  menuText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000080',
    marginTop: 10,
  },
  dropdownIcon: {
    fontSize: 22,
    color: '#002D62',
    position: 'absolute',
    right: 30,
    top: 34,
  },
});

export default RecordSessionScreen;
