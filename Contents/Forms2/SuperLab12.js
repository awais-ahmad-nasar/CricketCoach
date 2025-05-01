import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Button, Checkbox, TextInput} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const SignUpScreen = ({navigation}) => {
  const [un, setUN] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      await AsyncStorage.setItem('username', un);
      await AsyncStorage.setItem('password', password);
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{flex: 1, padding: 20}}>
      <Text style={{fontSize: 50, textAlign: 'center', padding: 20}}>
        SignUp
      </Text>

      <TextInput
        style={styles.input}
        label="Username"
        placeholderTextColor={'black'}
        value={un}
        onChangeText={text => setUN(text)}
      />
      <TextInput
        style={styles.input}
        label="Password"
        secureTextEntry={true}
        placeholderTextColor={'black'}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        label="Confirm Password"
        secureTextEntry={true}
        placeholderTextColor={'black'}
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
      />
      <Button mode="contained" onPress={handleSignUp}>
        SIGNUP
      </Button>
    </View>
  );
};

const LoginScreen = ({navigation}) => {
  const [un, setUN] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const loadSavedCredentials = async () => {
      const savedStatus = await AsyncStorage.getItem('status');
      if (savedStatus === 'true') {
        const savedUsername = await AsyncStorage.getItem('username');
        const savedPassword = await AsyncStorage.getItem('password');
        if (savedUsername && savedPassword) {
          setUN(savedUsername);
          setPassword(savedPassword);
          setStatus(true);
        }
      }
    };
    loadSavedCredentials();
  }, []);

  const handleLogin = async () => {
    try {
      const savedUsername = await AsyncStorage.getItem('username');
      const savedPassword = await AsyncStorage.getItem('password');
      if (un === savedUsername && password === savedPassword) {
        await AsyncStorage.setItem('status', status.toString());
        navigation.navigate('Home');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{flex: 1, padding: 20}}>
      <Text style={{fontSize: 50, textAlign: 'center', padding: 20}}>
        Login
      </Text>

      <TextInput
        style={styles.input}
        label="Username"
        placeholderTextColor={'black'}
        value={un}
        onChangeText={text => setUN(text)}
      />
      <TextInput
        style={styles.input}
        label="Password"
        secureTextEntry={true}
        placeholderTextColor={'black'}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <View style={styles.footer1}>
        <Checkbox
          status={status ? 'checked' : 'unchecked'}
          onPress={() => setStatus(!status)}
        />
        <Text>Remember</Text>
      </View>
      <View style={styles.footer2}>
        <Button mode="contained" onPress={handleLogin}>
          Login
        </Button>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={{textDecorationLine: 'underline'}}>New User</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const HomeScreen = ({navigation}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleDelete = async () => {
    try {
      await AsyncStorage.clear();
      alert('All records deleted');
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={{flex: 1, padding: 20}}>
      <Text style={{fontSize: 50}}>Home Screen</Text>
      <Text style={{fontSize: 20, textAlign: 'center', padding: 12}}>
        Wellcome{' '}
      </Text>

      <TextInput
        style={styles.input}
        label="Old Password"
        placeholderTextColor={'black'}
        value={oldPassword}
        onChangeText={text => setOldPassword(text)}
      />
      <TextInput
        style={styles.input}
        label="New Password"
        secureTextEntry={true}
        placeholderTextColor={'black'}
        value={newPassword}
        onChangeText={text => setNewPassword(text)}
      />
      <TextInput
        style={styles.input}
        label="Confirm Password"
        secureTextEntry={true}
        placeholderTextColor={'black'}
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
      />
      <View style={styles.footer1}>
        <Button mode="contained" onPress={handleDelete}>
          Delete
        </Button>
        <Button mode="contained" onPress={handleLogout}>
          Logout
        </Button>
      </View>
    </View>
  );
};

const NavigationCode = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
    fontSize: 12,
  },
  footer1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  footer2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default NavigationCode;
