// import React, {useState} from 'react';
// import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
// import CustomGradient from './components/CustomGradient';

// const CoachScreen = ({navigation}) => {
//   const [showDropdown, setShowDropdown] = useState(false);

//   const toggleDropdown = () => {
//     setShowDropdown(!showDropdown);
//   };

//   return (
//     <View style={styles.container}>
//       {/* Custom Gradient Background */}
//       <CustomGradient style={styles.gradientBackground} />

//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backButtonContainer}
//           activeOpacity={0.5}>
//           onPress={() => navigation.goBack('managerdashboard')}
//           <Text style={styles.backButton}>{'<Back'}</Text>
//         </TouchableOpacity>
//         <Text style={styles.title}>Coach</Text>
//       </View>
//       <View style={styles.main}>
//         {/* Team Button */}
//         <TouchableOpacity
//           style={styles.teamButton}
//           onPress={toggleDropdown}
//           activeOpacity={0.8}>
//           <View style={styles.teamButtonContent}>
//             <Text style={styles.teamButtonText}>Coach</Text>
//             <Text style={styles.dropdownIcon}>⋮</Text>
//           </View>
//         </TouchableOpacity>

//         {/* Dropdown */}
//         {showDropdown && (
//           <View style={styles.dropdown}>
//             <TouchableOpacity
//               style={styles.dropdownButton}
//               onPress={() => navigation.navigate('AddCoacheScreen')}>
//               <Text style={styles.dropdownButtonText}>Add Coach</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.dropdownButton}
//               onPress={() => navigation.navigate('ViewCoachesScreen')}>
//               <Text style={styles.dropdownButtonText}>View Coaches</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
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
//     marginBottom: 50,
//     backgroundColor: '#E6F2E6',
//     padding: 30,
//     borderBottomWidth: 1,
//     borderBottomColor: '#DFF4DF',
//   },
//   main: {
//     paddingLeft: 30,
//     paddingRight: 30,
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
//   teamButton: {
//     backgroundColor: '#90C290',
//     borderRadius: 10,
//     padding: 20,
//     marginHorizontal: 20,
//     marginBottom: 40,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.3,
//     shadowRadius: 3,
//     elevation: 5,
//     marginTop: 50,
//     position: 'relative', // Added for absolute positioning of the icon
//   },
//   teamButtonContent: {
//     flexDirection: 'row',
//     justifyContent: 'center', // Center the Team text
//     alignItems: 'center',
//     padding: 10,
//   },
//   teamButtonText: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#002D62',
//     padding: 10,
//     borderRadius: 0,
//   },
//   dropdownIcon: {
//     fontSize: 25,
//     color: '#002D62',
//     position: 'absolute', // Position the icon absolutely
//     right: 20, // Move the icon to the right corner
//   },
//   dropdown: {
//     backgroundColor: '#DFF4DF',
//     borderRadius: 10,
//     padding: 10,
//     marginHorizontal: 20,
//     marginTop: 10,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.3,
//     shadowRadius: 3,
//     elevation: 5,
//   },
//   dropdownButton: {
//     margin: 15,
//     backgroundColor: '#90C290',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 10,
//   },
//   dropdownButtonText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#002D62',
//     textAlign: 'center',
//     padding: 20,
//     borderRadius: 30,
//   },
// });

// export default CoachScreen;

import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import CustomGradient from './components/CustomGradient';

const CoachScreen = ({navigation}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <View style={styles.container}>
      {/* Custom Gradient Background */}
      <CustomGradient style={styles.gradientBackground} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButtonContainer}
          activeOpacity={0.5}
          onPress={() => navigation.goBack('managerdashboard')}>
          <Text style={styles.backButton}>{'<Back'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Coach</Text>
      </View>
      <View style={styles.main}>
        {/* Coach Button */}
        <TouchableOpacity
          style={styles.teamButton}
          onPress={toggleDropdown}
          activeOpacity={0.8}>
          <View style={styles.centeredContent}>
            <Image
              source={require('../CricketCoachingSystem/images/player_logo.png')}
              style={styles.buttonImage}
            />
            <Text style={styles.teamButtonText}>Coach</Text>
          </View>
          <Text style={styles.dropdownIcon}>⋮</Text>
        </TouchableOpacity>

        {/* Dropdown */}
        {showDropdown && (
          <View style={styles.dropdown}>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => navigation.navigate('AddCoacheScreen')}>
              <View style={styles.centeredContent}>
                <Image
                  source={require('../CricketCoachingSystem/images/addCoach.png')}
                  style={styles.dropdownImage}
                />
                <Text style={styles.dropdownButtonText}>Add Coach</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => navigation.navigate('ViewCoachesScreen')}>
              <View style={styles.centeredContent}>
                <Image
                  source={require('../CricketCoachingSystem/images/viewCoach.png')}
                  style={styles.dropdownImage}
                />
                <Text style={styles.dropdownButtonText}>View Coaches</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
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
    marginBottom: 50,
    backgroundColor: '#E6F2E6',
    padding: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#DFF4DF',
  },
  main: {
    paddingLeft: 30,
    paddingRight: 30,
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
  teamButton: {
    backgroundColor: '#90C290',
    borderRadius: 10,
    padding: 30,
    marginHorizontal: 20,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    marginTop: 50,
    position: 'relative',
  },
  centeredContent: {
    alignItems: 'center', // Center content horizontally
  },
  teamButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#002D62',
    marginTop: 5, // Add spacing between image and text
  },
  buttonImage: {
    width: 32,
    height: 32,
  },
  dropdownImage: {
    width: 30,
    height: 30,
  },
  dropdownIcon: {
    fontSize: 25,
    color: '#002D62',
    position: 'absolute',
    right: 30,
    top: 40,
  },
  dropdown: {
    backgroundColor: '#DFF4DF',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 20,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  dropdownButton: {
    margin: 15,
    backgroundColor: '#90C290',
    borderRadius: 10,
    padding: 25,
    marginBottom: 10,
  },
  dropdownButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#002D62',
    marginTop: 10, // Add spacing between image and text
  },
});

export default CoachScreen;
