import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';

const usersArray = [
  {
    name: 'Awais Ahmad',
    email: 'awaisbiit4415@gmail.com',
    gender: 'Male',
    password: '1234',
  },
  {name: 'Jane', email: 'jane@example.com', gender: 'Female', password: '5678'},
];

export const SignInScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [inputStyle, setInputStyle] = useState(styles.input);

  const handleLogin = () => {
    const user = usersArray.find(
      u => u.email === username && u.password === password,
    );
    if (user) {
      navigation.navigate('Home', {user});
    } else {
      alert('Invalid email or password'); // Show an alert on failed login
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={inputStyle}
        placeholder="Email"
        onChangeText={setUsername}
        color="black"
        placeholderTextColor={'black'}
      />
      <TextInput
        style={inputStyle}
        color="black"
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        placeholderTextColor={'black'}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.link}
        onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.linkText}>New User?Click for Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export const SignUpScreen = ({navigation}) => {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    gender: '',
    password: '',
    confirmPassword: '',
  });

  const handleSignUp = () => {
    if (newUser.password === newUser.confirmPassword) {
      usersArray.push({
        name: newUser.name,
        email: newUser.email,
        gender: newUser.gender,
        password: newUser.password,
      });
      navigation.navigate('SignIn');
    } else {
      alert('Passwords do not match!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        color="black"
        placeholder="Name"
        placeholderTextColor={'black'}
        onChangeText={text => setNewUser({...newUser, name: text})}
      />
      <TextInput
        style={styles.input}
        color="black"
        placeholder="Email"
        placeholderTextColor={'black'}
        onChangeText={text => setNewUser({...newUser, email: text})}
      />
      <TextInput
        style={styles.input}
        color="black"
        placeholder="Gender"
        placeholderTextColor={'black'}
        onChangeText={text => setNewUser({...newUser, gender: text})}
      />
      <TextInput
        style={styles.input}
        color="black"
        placeholderTextColor={'black'}
        placeholder="Password"
        secureTextEntry
        onChangeText={text => setNewUser({...newUser, password: text})}
      />
      <TextInput
        style={styles.input}
        color="black"
        placeholderTextColor={'black'}
        placeholder="Confirm Password"
        secureTextEntry
        onChangeText={text => setNewUser({...newUser, confirmPassword: text})}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export const HomeScreen = ({route, navigation}) => {
  const {user} = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>User Details:</Text>
      <FlatList
        data={[user]}
        renderItem={({item}) => (
          <View>
            <Text>Name: {item.name}</Text>
            <Text>Email: {item.email}</Text>
            <Text>Gender: {item.gender}</Text>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  link: {
    alignItems: 'center',
    marginTop: 10,
    textDecorationStyle: 'underline',
  },
  linkText: {
    color: 'blue',
    textDecorationStyle: 'underline',
  },
});
