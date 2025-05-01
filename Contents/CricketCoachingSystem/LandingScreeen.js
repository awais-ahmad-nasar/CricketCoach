// import React from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   ImageBackground,
// } from 'react-native';

// const LandingScreen = ({navigation}) => {
//   return (
//     <View style={styles.container}>
//       {/* Main Content */}
//       <View style={styles.mainContent}>
//         {/* Title */}
//         <Text style={styles.title}>Welcome to Cricket Coach</Text>
//         {/* Subtitle */}
//         <Text style={styles.subtitle}>AI Powered Cricket Coaching</Text>

//         {/* Image Section */}
//         <View style={styles.imageContainer}>
//           <ImageBackground
//             source={require('../CricketCoachingSystem/images/LandingScreen.png')}
//             style={styles.imageBackground}
//             resizeMode="cover"
//           />
//         </View>

//         {/* Sign In Button */}
//         <TouchableOpacity
//           style={styles.signInButton}
//           onPress={() => navigation.navigate('SignIn')}>
//           <Text style={styles.signInText}>Sign in</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#90C290',
//     position: 'relative',
//   },
//   mainContent: {
//     flex: 1,
//     justifyContent: 'center',
//     position: 'relative',
//   },
//   title: {
//     fontSize: 29,
//     fontWeight: 'bold',
//     color: 'rgba(28,58,107,1)', // Dark blue color
//     textAlign: 'center', // Center-aligned text
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'rgba(0,0,0,0.7)', // Semi-transparent black
//     textAlign: 'center',
//     marginBottom: 50,
//   },
//   imageContainer: {
//     width: 340,
//     height: 290,
//     marginBottom: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   imageBackground: {
//     width: '100%',
//     height: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   signInButton: {
//     width: 327,
//     height: 48,
//     backgroundColor: 'rgba(0,100,0,1)', // Dark green color
//     justifyContent: 'center',
//     alignItems: 'center',
//     alignSelf: 'center',
//     borderRadius: 15,
//   },
//   signInText: {
//     fontSize: 15,
//     fontWeight: 'bold',
//     color: '#FFFFFF', // White text
//   },
// });

// export default LandingScreen;

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import CustomGradient from './components/CustomGradient';

const LandingScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* Custom Gradient Background */}
      <CustomGradient style={styles.gradientBackground} />

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Title */}
        <Text style={styles.title}>Welcome to Cricket Coach</Text>
        {/* Subtitle */}
        <Text style={styles.subtitle}>AI Powered Cricket Coaching</Text>

        {/* Image Section */}
        <View style={styles.imageContainer}>
          <ImageBackground
            source={require('../CricketCoachingSystem/images/LandingScreen.png')}
            style={styles.imageBackground}
            resizeMode="cover"
          />
        </View>

        {/* Sign In Button */}
        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.signInText}>Sign in</Text>
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
    ...StyleSheet.absoluteFillObject, // Makes it cover the whole screen
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
  },
  title: {
    fontSize: 29,
    fontWeight: 'bold',
    color: 'rgba(28,58,107,1)', // Dark blue color
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.7)', // Semi-transparent black
    textAlign: 'center',
    marginBottom: 50,
  },
  imageContainer: {
    width: 340,
    height: 290,
    marginBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInButton: {
    width: 327,
    height: 48,
    backgroundColor: 'rgba(0,100,0,1)', // Dark green color
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 15,
  },
  signInText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text
  },
});

export default LandingScreen;
