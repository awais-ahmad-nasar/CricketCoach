// import React, {useState, useEffect} from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   TextInput,
//   ActivityIndicator,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import CustomGradient from './components/CustomGradient';
// import {ip_adress} from './IP-config';

// const SignInScreen = ({navigation}) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Load saved credentials when the component mounts
//   useEffect(() => {
//     const loadCredentials = async () => {
//       try {
//         const savedUsername = await AsyncStorage.getItem('username');
//         const savedPassword = await AsyncStorage.getItem('password');

//         if (savedUsername) setUsername(savedUsername);
//         if (savedPassword) setPassword(savedPassword);
//       } catch (error) {
//         console.error('Failed to load credentials', error);
//       }
//     };

//     loadCredentials();
//   }, []);

//   // Function to handle login
//   // const handleLogin = async () => {
//   //   if (!username.trim() || !password.trim()) {
//   //     Alert.alert('Error', 'Please enter both username and password');
//   //     return;
//   //   }

//   //   setLoading(true);

//   //   try {
//   //     const response = await fetch(`${ip_adress}/api/admin/login`, {
//   //       method: 'POST',
//   //       headers: {'Content-Type': 'application/json'},
//   //       body: JSON.stringify({username, password}),
//   //     });

//   //     // Check if response is JSON
//   //     const contentType = response.headers.get('content-type');
//   //     if (!contentType || !contentType.includes('application/json')) {
//   //       throw new Error('Server returned non-JSON response');
//   //     }

//   //     const responseData = await response.json();

//   //     if (!response.ok) {
//   //       throw new Error(responseData.message || 'Authentication failed');
//   //     }

//   //     // Save credentials to AsyncStorage
//   //     await AsyncStorage.setItem('username', username.trim());
//   //     await AsyncStorage.setItem('password', password.trim());

//   //     const role = responseData.role?.toLowerCase() || '';

//   //     const navigationMap = {
//   // admin: 'managerdashboard',
//   // player: 'Playerdashboard',
//   // coach: 'Coachdashboard',
//   //     };

//   //     if (navigationMap[role]) {
//   //       navigation.navigate(navigationMap[role]);
//   //     } else {
//   //       Alert.alert('Error', 'Unauthorized access role');
//   //     }
//   //   } catch (error) {
//   //     console.error('Login error:', error);
//   //     Alert.alert('Error', error.message || 'Network error');
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const handleLogin = async () => {
//     if (!username.trim() || !password.trim()) {
//       Alert.alert('Error', 'Please enter both username and password');
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch(`${ip_adress}/api/admin/login`, {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({username, password}),
//       });

//       const contentType = response.headers.get('content-type');
//       if (!contentType || !contentType.includes('application/json')) {
//         throw new Error('Server returned non-JSON response');
//       }

//       const responseData = await response.json();

//       if (!response.ok) {
//         throw new Error(responseData.message || 'Authentication failed');
//       }

//       // Store ALL necessary user data
//       await AsyncStorage.multiSet([
//         ['username', username.trim()],
//         ['password', password.trim()],
//         ['user_id', responseData.user_id.toString()], // Add this line
//         ['user_role', responseData.role.toLowerCase()],
//       ]);

//       // Validate role before navigation
//       const validRoles = {
//         admin: 'managerdashboard',
//         player: 'PlayerDashboard',
//         coach: 'Coachdashboard',
//       };

//       const targetRoute = validRoles[responseData.role.toLowerCase()];
//       if (!targetRoute) {
//         throw new Error('Unauthorized access role');
//       }

//       // Reset navigation stack completely
//       navigation.reset({
//         index: 0,
//         routes: [{name: targetRoute}],
//       });
//     } catch (error) {
//       console.error('Login error:', error);
//       Alert.alert('Error', error.message || 'Network error');
//       // Clear invalid credentials on error
//       await AsyncStorage.multiRemove(['username', 'password', 'user_id']);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}>
//       <ScrollView
//         contentContainerStyle={styles.scrollContainer}
//         keyboardShouldPersistTaps="handled">
//         <CustomGradient style={styles.gradientBackground} />

//         <Image
//           source={require('../CricketCoachingSystem/images/LandingScreen.png')}
//           style={styles.logo}
//         />

//         <Text style={styles.signInTitle}>Sign in</Text>

//         <View style={styles.inputContainer}>
//           <Image
//             source={require('../CricketCoachingSystem/images/User.png')}
//             style={styles.inputIcon}
//           />
//           <TextInput
//             placeholder="User Name"
//             style={styles.inputField}
//             placeholderTextColor="#1C3A6B"
//             value={username}
//             onChangeText={setUsername}
//             autoCapitalize="none"
//           />
//         </View>

//         <View style={styles.inputContainer}>
//           <Image
//             source={require('../CricketCoachingSystem/images/lockSignIn.png')}
//             style={styles.inputIcon}
//           />
//           <TextInput
//             placeholder="Password"
//             placeholderTextColor="#1C3A6B"
//             style={styles.inputField}
//             secureTextEntry={!passwordVisible}
//             value={password}
//             onChangeText={setPassword}
//             autoCapitalize="none"
//           />
//           <TouchableOpacity
//             onPress={() => setPasswordVisible(!passwordVisible)}
//             style={styles.eyeButton}>
//             <Image
//               source={require('../CricketCoachingSystem/images/ph_eye.png')}
//               style={styles.eyeIcon}
//             />
//           </TouchableOpacity>
//         </View>

//         <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
//           <Text style={styles.forgetPassword}>Forget Password ?</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.signInButton}
//           onPress={handleLogin}
//           disabled={loading}>
//           {loading ? (
//             <ActivityIndicator size="small" color="white" />
//           ) : (
//             <Text style={styles.signInButtonText}>Sign in</Text>
//           )}
//         </TouchableOpacity>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   gradientBackground: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   logo: {
//     width: 280,
//     height: 280,
//   },
//   signInTitle: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     color: '#1C3A6B',
//     marginBottom: 20,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: 320,
//     height: 50,
//     borderWidth: 2,
//     borderColor: '#1C3A6B',
//     borderRadius: 10,
//     marginBottom: 15,
//     paddingHorizontal: 10,
//     backgroundColor: '#90C290',
//   },
//   inputIcon: {
//     width: 24,
//     height: 24,
//     marginRight: 10,
//     tintColor: '#1C3A6B', // Optional: Add tint color to match the theme
//   },
//   inputField: {
//     flex: 1,
//     fontSize: 16,
//     color: 'black',
//   },
//   eyeButton: {
//     padding: 8,
//   },
//   eyeIcon: {
//     width: 24,
//     height: 24,
//     tintColor: '#1C3A6B',
//   },
//   forgetPassword: {
//     color: '#1C3A6B',
//     fontSize: 14,
//     fontWeight: 'bold',
//     alignSelf: 'flex-end',
//     marginRight: 30,
//     marginBottom: 20,
//   },
//   signInButton: {
//     width: 320,
//     height: 50,
//     backgroundColor: '#026400',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 10,
//   },
//   signInButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default SignInScreen;

// .................. ANEEQ API .........................
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomGradient from './components/CustomGradient';
import {ip_adress} from './IP-config';

const SignInScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load saved credentials when the component mounts
  useEffect(() => {
    const loadCredentials = async () => {
      try {
        const savedUsername = await AsyncStorage.getItem('username');
        const savedPassword = await AsyncStorage.getItem('password');

        if (savedUsername) setUsername(savedUsername);
        if (savedPassword) setPassword(savedPassword);
      } catch (error) {
        console.error('Failed to load credentials', error);
      }
    };

    loadCredentials();
  }, []);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${ip_adress}/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password}),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Authentication failed');
      }

      if (!responseData.value) {
        throw new Error(responseData.message || 'Login failed');
      }

      // Save credentials and user data
      await AsyncStorage.multiSet([
        ['username', username.trim()],
        ['password', password.trim()],
        ['user_id', responseData.id.toString()],
        ['user_role', responseData.role.toLowerCase()],
      ]);

      // Map backend roles to frontend routes
      const roleNavigationMap = {
        manager: 'managerdashboard',
        coach: 'Coachdashboard',
        player: 'Playerdashboard',
      };

      const targetRoute = roleNavigationMap[responseData.role.toLowerCase()];
      if (!targetRoute) {
        throw new Error('Unauthorized access role');
      }

      // Reset navigation stack completely
      navigation.reset({
        index: 0,
        routes: [{name: targetRoute}],
      });
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', error.message || 'Network error');
      // Clear invalid credentials on error
      await AsyncStorage.multiRemove([
        'username',
        'password',
        'user_id',
        'user_role',
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled">
        <CustomGradient style={styles.gradientBackground} />

        <Image
          source={require('../CricketCoachingSystem/images/LandingScreen.png')}
          style={styles.logo}
        />

        <Text style={styles.signInTitle}>Sign in</Text>

        <View style={styles.inputContainer}>
          <Image
            source={require('../CricketCoachingSystem/images/User.png')}
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="User Name"
            style={styles.inputField}
            placeholderTextColor="#1C3A6B"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Image
            source={require('../CricketCoachingSystem/images/lockSignIn.png')}
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#1C3A6B"
            style={styles.inputField}
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.eyeButton}>
            <Image
              source={require('../CricketCoachingSystem/images/ph_eye.png')}
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgetPassword}>Forget Password ?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signInButton}
          onPress={handleLogin}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.signInButtonText}>Sign in</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  logo: {
    width: 280,
    height: 280,
  },
  signInTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1C3A6B',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 320,
    height: 50,
    borderWidth: 2,
    borderColor: '#1C3A6B',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#90C290',
  },
  inputIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
    tintColor: '#1C3A6B',
  },
  inputField: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  eyeButton: {
    padding: 8,
  },
  eyeIcon: {
    width: 24,
    height: 24,
    tintColor: '#1C3A6B',
  },
  forgetPassword: {
    color: '#1C3A6B',
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    marginRight: 30,
    marginBottom: 20,
  },
  signInButton: {
    width: 320,
    height: 50,
    backgroundColor: '#026400',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  signInButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignInScreen;
