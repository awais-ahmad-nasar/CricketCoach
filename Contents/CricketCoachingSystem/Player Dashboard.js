import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import CustomGradient from './components/CustomGradient';

const PlayerDashboard = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* Custom Gradient Background */}
      <CustomGradient style={styles.gradientBackground} />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('LandingScreen')}
          style={styles.backButtonContainer}
          activeOpacity={0.5}>
          <Text style={styles.backButton}>{'< Back'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Player Dashboard</Text>
      </View>

      <View style={styles.menu}>
        {/* View Joined Session Button */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('ViewJoinedSession')}>
          <View style={styles.buttonContent}>
            <Image
              source={require('../CricketCoachingSystem/images/joinedSession.png')}
              style={styles.buttonImage}
            />
            <Text style={styles.menuText}>View Joined Session</Text>
          </View>
          <Text style={styles.dropdownIcon}>⋮</Text>
        </TouchableOpacity>

        {/* Performance Button */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('PlayerPerformanceScreen')}>
          <View style={styles.buttonContent}>
            <Image
              source={require('../CricketCoachingSystem/images/performance.png')}
              style={styles.buttonImage}
            />
            <Text style={styles.menuText}>Performance</Text>
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
    marginTop: 220,
    padding: 60,
  },
  menuItem: {
    backgroundColor: '#90C292',
    borderRadius: 10,
    padding: 25,
    marginBottom: 50,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    position: 'relative', // For dropdown icon positioning
  },
  buttonContent: {
    alignItems: 'center', // Center image and text vertically
  },
  menuText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000080',
    marginTop: 10, // Add space between image and text
  },
  dropdownIcon: {
    fontSize: 25,
    color: '#002D62',
    position: 'absolute', // Position the icon absolutely
    right: 30, // Move the icon to the right corner
    top: 34, // Move the icon to the top corner
  },
  buttonImage: {
    width: 30,
    height: 30,
  },
});

export default PlayerDashboard;
