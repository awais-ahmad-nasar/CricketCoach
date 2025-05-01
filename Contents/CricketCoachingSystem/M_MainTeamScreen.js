// import React, {useState} from 'react';
// import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
// import CustomGradient from './components/CustomGradient';

// const TeamScreen = ({navigation}) => {
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
//         <Text style={styles.title}>Team</Text>
//       </View>
//       <View style={styles.main}>
//         {/* Team Button */}
//         <TouchableOpacity
//           style={styles.teamButton}
//           onPress={toggleDropdown}
//           activeOpacity={0.8}>
//           <View style={styles.teamButtonContent}>
//             <Image
//               source={require('../CricketCoachingSystem/images/Team.png')}
//               style={styles.buttonImage}
//             />
//             <Text style={styles.teamButtonText}>Team</Text>
//             <Text style={styles.dropdownIcon}>⋮</Text>
//           </View>
//         </TouchableOpacity>

//         {/* Dropdown */}
//         {showDropdown && (
//           <View style={styles.dropdown}>
//             <TouchableOpacity
//               style={styles.dropdownButton}
//               onPress={() => navigation.navigate('AddTeamScreen')}>
//               <Image
//                 source={require('../CricketCoachingSystem/images/addTeam.png')}
//                 style={styles.dropdownImage}
//               />
//               <Text style={styles.dropdownButtonText}>Add Team</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.dropdownButton}
//               onPress={() => navigation.navigate('ViewTeamsScreen')}>
//               <Image
//                 source={require('../CricketCoachingSystem/images/viewTeam.png')}
//                 style={styles.dropdownImage}
//               />
//               <Text style={styles.dropdownButtonText}>View Teams</Text>
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
//     fontSize: 25,
//     fontWeight: 'bold',
//   },
//   teamButton: {
//     backgroundColor: '#90C290',
//     borderRadius: 10,
//     padding: 35,
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
//   },
//   teamButtonText: {
//     fontSize: 19,
//     fontWeight: '600',
//     color: '#002D62',
//     padding: 10,
//     borderRadius: 0,
//   },
//   buttonImage: {
//     width: 30,
//     height: 30,
//     marginBottom: 10,
//   },
//   dropdownImage: {
//     width: 30,
//     height: 30,
//     marginBottom: 10,
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
//     fontSize: 17,
//     fontWeight: '600',
//     color: '#002D62',
//     textAlign: 'center',
//     padding: 20,
//     borderRadius: 30,
//   },
// });

// export default TeamScreen;

import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import CustomGradient from './components/CustomGradient';

const TeamScreen = ({navigation}) => {
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
        <Text style={styles.title}>Team</Text>
      </View>
      <View style={styles.main}>
        {/* Team Button */}
        <TouchableOpacity
          style={styles.teamButton}
          onPress={toggleDropdown}
          activeOpacity={0.8}>
          <View style={styles.centeredContent}>
            <Image
              source={require('../CricketCoachingSystem/images/Team.png')}
              style={styles.buttonImage}
            />
            <Text style={styles.teamButtonText}>Team</Text>
          </View>
          <Text style={styles.dropdownIcon}>⋮</Text>
        </TouchableOpacity>

        {/* Dropdown */}
        {showDropdown && (
          <View style={styles.dropdown}>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => navigation.navigate('AddTeamScreen')}>
              <View style={styles.centeredContent}>
                <Image
                  source={require('../CricketCoachingSystem/images/addTeam.png')}
                  style={styles.dropdownImage}
                />
                <Text style={styles.dropdownButtonText}>Add Team</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => navigation.navigate('ViewTeamsScreen')}>
              <View style={styles.centeredContent}>
                <Image
                  source={require('../CricketCoachingSystem/images/viewTeam.png')}
                  style={styles.dropdownImage}
                />
                <Text style={styles.dropdownButtonText}>View Teams</Text>
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
    fontSize: 25,
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
    fontSize: 19,
    fontWeight: '600',
    color: '#002D62',
    marginTop: 10, // Add spacing between image and text
  },
  buttonImage: {
    width: 25,
    height: 25,
  },
  dropdownImage: {
    width: 25,
    height: 25,
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

export default TeamScreen;
// ..................................................................

// import React, {useState} from 'react';
// import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

// const TeamScreen = ({navigation}) => {
//   const [showDropdown, setShowDropdown] = useState(false);

//   const toggleDropdown = () => {
//     setShowDropdown(!showDropdown);
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backButtonContainer}
//           activeOpacity={0.5}>
//           <Text style={styles.backButton}>{'<Back'}</Text>
//         </TouchableOpacity>
//         <Text style={styles.title}>Team</Text>
//       </View>
//       <View style={styles.main}>
//         {/* Team Button */}
//         <TouchableOpacity
//           style={styles.teamButton}
//           onPress={toggleDropdown}
//           activeOpacity={0.8}>
//           <View style={styles.teamButtonContent}>
//             <Text style={styles.teamButtonText}>Team</Text>
//             <Text style={styles.dropdownIcon}>⋮</Text>
//           </View>
//         </TouchableOpacity>

//         {/* Dropdown */}
//         {showDropdown && (
//           <View style={styles.dropdown}>
//             <TouchableOpacity
//               style={styles.dropdownButton}
//               onPress={() => navigation.navigate('AddTeamScreen')}>
//               <Text style={styles.dropdownButtonText}>Add Team</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.dropdownButton}
//               onPress={() => navigation.navigate('ViewTeamsScreen')}>
//               <Text style={styles.dropdownButtonText}>View Teams</Text>
//             </TouchableOpacity>
//           </View>
//         )}

//         <TouchableOpacity
//           style={styles.teamButton}
//           onPress={() => navigation.navigate('PlayerScreen')}
//           activeOpacity={0.8}>
//           <View style={styles.teamButtonContent}>
//             <Text style={styles.teamButtonText}>Go To Player Screen</Text>
//           </View>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#90C290',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 30,
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
//     fontSize: 12,
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
//   },
//   teamButtonText: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#002D62',
//     padding: 10,
//     borderRadius: 0,
//   },
//   dropdownIcon: {
//     fontSize: 20,
//     color: '#002D62',
//     position: 'absolute', // Position the icon absolutely
//     right: 10, // Move the icon to the right corner
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

// export default TeamScreen;

// ************************** TASK *********************************
// import React, {useState} from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView, // Import ScrollView
// } from 'react-native';

// const TeamScreen = ({navigation}) => {
//   const [showDropdown, setShowDropdown] = useState(false);

//   const toggleDropdown = () => {
//     setShowDropdown(!showDropdown);
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backButtonContainer}
//           activeOpacity={0.5}>
//           <Text style={styles.backButton}>{'<Back'}</Text>
//         </TouchableOpacity>
//         <Text style={styles.title}>Team</Text>
//       </View>

//       {/* Main Content (Scrollable) */}
//       <ScrollView contentContainerStyle={styles.main}>
//         {/* Team Button */}
//         <TouchableOpacity
//           style={styles.teamButton}
//           onPress={toggleDropdown}
//           activeOpacity={0.8}>
//           <View style={styles.teamButtonContent}>
//             <Text style={styles.teamButtonText}>Team</Text>
//             <Text style={styles.dropdownIcon}>⋮</Text>
//           </View>
//         </TouchableOpacity>

//         {/* Dropdown */}
//         {showDropdown && (
//           <View style={styles.dropdown}>
//             <TouchableOpacity
//               style={styles.dropdownButton}
//               onPress={() => navigation.navigate('AddTeamScreen')}>
//               <Text style={styles.dropdownButtonText}>Add Team</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.dropdownButton}
//               onPress={() => navigation.navigate('ViewTeamsScreen')}>
//               <Text style={styles.dropdownButtonText}>View Teams</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.dropdownButton}
//               onPress={() => navigation.navigate('ViewManagersScreen')}>
//               <Text style={styles.dropdownButtonText}>View Managers</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.dropdownButton}
//               onPress={() => navigation.navigate('ViewCoachesScreen')}>
//               <Text style={styles.dropdownButtonText}>View Coaches</Text>
//             </TouchableOpacity>
//           </View>
//         )}

//         {/* Go To Player Screen Button */}
//         <TouchableOpacity
//           style={styles.teamButton}
//           onPress={() => navigation.navigate('PlayerScreen')}
//           activeOpacity={0.8}>
//           <View style={styles.teamButtonContent}>
//             <Text style={styles.teamButtonText}>Go To Player Screen</Text>
//           </View>
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#90C290',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 30,
//     backgroundColor: '#E6F2E6',
//     padding: 30,
//     borderBottomWidth: 1,
//     borderBottomColor: '#DFF4DF',
//   },
//   main: {
//     paddingLeft: 30,
//     paddingRight: 30,
//     paddingBottom: 20, // Add padding at the bottom for better scrolling
//   },
//   backButtonContainer: {
//     position: 'absolute',
//     left: 10,
//     top: 10,
//   },
//   backButton: {
//     color: '#000080',
//     fontSize: 12,
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
//     position: 'relative',
//   },
//   teamButtonContent: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   teamButtonText: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#002D62',
//     padding: 10,
//     borderRadius: 0,
//   },
//   dropdownIcon: {
//     fontSize: 20,
//     color: '#002D62',
//     position: 'absolute',
//     right: 10,
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

// export default TeamScreen;
