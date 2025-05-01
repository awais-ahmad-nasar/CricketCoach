// import React from 'react';
// import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
// import CustomGradient from './components/CustomGradient';

// const ManagerDashboard = ({navigation}) => {
//   return (
//     <View style={styles.container}>
//       {/* Custom Gradient Background */}
//       <CustomGradient style={styles.gradientBackground} />

//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backButtonContainer}
//           activeOpacity={0.5}
//           onPress={() => navigation.goBack('SignIn')}>
//           <Text style={styles.backButton}>{'< Back'}</Text>
//         </TouchableOpacity>
//         <Text style={styles.title}>Manager Dashboard</Text>
//       </View>

//       <View style={styles.menu}>
//         <TouchableOpacity
//           style={styles.menuItem}
//           onPress={() => navigation.navigate('CoachScreen')}>
//           <Text style={styles.menuText}>Coach</Text>
//           <Text style={styles.dropdownIcon}>⋮</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.menuItem}
//           onPress={() => navigation.navigate('TeamScreen')}>
//           <Text style={styles.menuText}>Team</Text>
//           <Text style={styles.dropdownIcon}>⋮</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.menuItem}
//           onPress={() => navigation.navigate('PlayerScreen')}>
//           <Text style={styles.menuText}>Player</Text>
//           <Text style={styles.dropdownIcon}>⋮</Text>
//         </TouchableOpacity>
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
//     backgroundColor: '#E6F2E6',
//     padding: 30,
//     borderBottomWidth: 1,
//     borderBottomColor: '#DFF4DF',
//     width: '100%',
//     position: 'absolute',
//     top: 0,
//     zIndex: 10,
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
//   menu: {
//     marginTop: 150,
//     padding: 40,
//   },
//   menuItem: {
//     backgroundColor: '#90C292',
//     borderRadius: 10,
//     padding: 40,
//     marginBottom: 35,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     elevation: 5,
//   },
//   menuText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#000080',
//   },
//   dropdownIcon: {
//     fontSize: 25,
//     color: '#002D62',
//     position: 'absolute', // Position the icon absolutely
//     right: 40, // Move the icon to the right corner
//     top: 34, // Move the icon to the top corner
//   },
// });

// export default ManagerDashboard;

// import React from 'react';
// import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
// import CustomGradient from './components/CustomGradient';

// const ManagerDashboard = ({navigation}) => {
//   return (
//     <View style={styles.container}>
//       {/* Custom Gradient Background */}
//       <CustomGradient style={styles.gradientBackground} />

//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backButtonContainer}
//           activeOpacity={0.5}
//           onPress={() => navigation.goBack('SignIn')}>
//           <Text style={styles.backButton}>{'< Back'}</Text>
//         </TouchableOpacity>
//         <Text style={styles.title}>Manager Dashboard</Text>
//       </View>

//       <View style={styles.menu}>
//         {/* Coach Button */}
//         <TouchableOpacity
//           style={styles.menuItem}
//           onPress={() => navigation.navigate('CoachScreen')}>
//           <Image
//             source={require('../CricketCoachingSystem/images/coach_logo.png')}
//             style={styles.menuImage}
//           />
//           <Text style={styles.menuText}>Coach</Text>
//           <Text style={styles.dropdownIcon}>⋮</Text>
//         </TouchableOpacity>

//         {/* Team Button */}
//         <TouchableOpacity
//           style={styles.menuItem}
//           onPress={() => navigation.navigate('TeamScreen')}>
//           <Image
//             source={require('../CricketCoachingSystem/images/Team.png')}
//             style={styles.menuImage}
//           />
//           <Text style={styles.menuText}>Team</Text>
//           <Text style={styles.dropdownIcon}>⋮</Text>
//         </TouchableOpacity>

//         {/* Player Button */}
//         <TouchableOpacity
//           style={styles.menuItem}
//           onPress={() => navigation.navigate('PlayerScreen')}>
//           <Image
//             source={require('../CricketCoachingSystem/images/User.png')}
//             style={styles.menuImage}
//           />
//           <Text style={styles.menuText}>Player</Text>
//           <Text style={styles.dropdownIcon}>⋮</Text>
//         </TouchableOpacity>
//       </View>
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
//   padding: 35,
//   borderBottomWidth: 1,
//   borderBottomColor: '#DFF4DF',
//   width: '100%',
//   position: 'absolute',
//   top: 0,
//   zIndex: 10,
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
// menu: {
//   marginTop: 150,
//   padding: 50,
// },
//   menuItem: {
//     backgroundColor: '#90C292',
//     borderRadius: 10,
//     padding: 40,
//     marginBottom: 35,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     elevation: 5,
//     flexDirection: 'row', // Align items horizontally
//     justifyContent: 'space-between', // Space between image and text
//   },
//   menuImage: {
//     width: 20, // Adjust the width of the image
//     height: 20, // Adjust the height of the image
//     marginRight: 10, // Add margin to separate image from text
//   },
//   menuText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#000080',
//     flex: 1, // Allow text to take remaining space
//   },
//   dropdownIcon: {
//     fontSize: 25,
//     color: '#002D62',
//   },
// });

// export default ManagerDashboard;

import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import CustomGradient from './components/CustomGradient';

const ManagerDashboard = ({navigation}) => {
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
        <Text style={styles.title}>Manager Dashboard</Text>
      </View>

      <View style={styles.menu}>
        {/* Coach Button */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('CoachScreen')}>
          <View style={styles.contentContainer}>
            <Image
              source={require('../CricketCoachingSystem/images/coach_logo.png')}
              style={styles.menuImage}
            />
            <Text style={styles.menuText}>Coach</Text>
          </View>
          <Text style={styles.dropdownIcon}>⋮</Text>
        </TouchableOpacity>

        {/* Team Button */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('TeamScreen')}>
          <View style={styles.contentContainer}>
            <Image
              source={require('../CricketCoachingSystem/images/Team.png')}
              style={styles.menuImage}
            />
            <Text style={styles.menuText}>Team</Text>
          </View>
          <Text style={styles.dropdownIcon}>⋮</Text>
        </TouchableOpacity>

        {/* Player Button */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('PlayerScreen')}>
          <View style={styles.contentContainer}>
            <Image
              source={require('../CricketCoachingSystem/images/player_logo.png')} // Should match actual file
              style={styles.menuImage}
            />
            <Text style={styles.menuText}>Player</Text>
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
    padding: 35,
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
    marginTop: 30,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: '#000080',
    fontSize: 22,
    fontWeight: 'bold',
  },
  menu: {
    marginTop: 160,
    padding: 50,
  },

  menuItem: {
    backgroundColor: '#90C292',
    borderRadius: 10,
    padding: 30,
    marginBottom: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
  },
  contentContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  menuImage: {
    width: 30,
    height: 30,
    marginBottom: 7,
  },
  menuText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000080',
  },
  dropdownIcon: {
    fontSize: 25,
    color: '#002D62',
    position: 'absolute',
    right: 35,
    top: '80%',
    marginTop: -12,
  },
});

export default ManagerDashboard;
