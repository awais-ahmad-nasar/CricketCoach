import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {RadioButton, Checkbox} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';

const SocialAppForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('Male');
  const [country, setCountry] = useState([
    {
      key: 1,
      value: 'Pakistan',
    },
    {
      key: 2,
      value: 'USA',
    },
    {
      key: 3,
      value: 'India',
    },
  ]);
  const [interests, setInterests] = useState({
    News: false,
    Sports: false,
    Politics: false,
    Cricket: false,
    Hockey: false,
    Football: false,
  });

  const handleSubmit = () => {
    const selectedInterests = Object.keys(interests).filter(
      key => interests[key],
    );
    alert(
      `Form submitted!\nName: ${name}\nEmail: ${email}\nGender: ${gender}\nCountry: ${country}\nInterests: ${selectedInterests.join(
        ', ',
      )}`,
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Social App Registration</Text>

      {/* Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        placeholderTextColor={'black'}
      />

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholderTextColor={'black'}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor={'black'}
      />

      {/* Gender Selection */}
      <Text style={styles.label}>Gender:</Text>
      <View style={styles.row}>
        <View style={styles.radioRow}>
          <RadioButton
            value="Male"
            status={gender === 'Male' ? 'checked' : 'unchecked'}
            onPress={() => setGender('Male')}
          />
          <Text style={styles.radioLabel}>Male</Text>
        </View>
        <View style={styles.radioRow}>
          <RadioButton
            value="Female"
            status={gender === 'Female' ? 'checked' : 'unchecked'}
            onPress={() => setGender('Female')}
          />
          <Text style={styles.radioLabel}>Female</Text>
        </View>
      </View>

      {/* Country Picker */}
      <Text style={styles.label}>Country:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={country}
          onValueChange={itemValue => setCountry(itemValue)}>
          <Picker.Item label="Pakistan" value="Pakistan" />
          <Picker.Item label="India" value="India" />
          <Picker.Item label="USA" value="USA" />
        </Picker>
      </View>

      {/* Interests */}

      <Text style={styles.label}>Your Interests:</Text>
      <View style={styles.interestRow}>
        <View style={styles.checkboxContainer}>
          <Checkbox
            status={interests.News ? 'checked' : 'unchecked'}
            onPress={() => setInterests({...interests, News: !interests.News})}
          />
          <Text>News</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <Checkbox
            status={interests.Sports ? 'checked' : 'unchecked'}
            onPress={() =>
              setInterests({...interests, Sports: !interests.Sports})
            }
          />
          <Text>Sports</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <Checkbox
            status={interests.Politics ? 'checked' : 'unchecked'}
            onPress={() =>
              setInterests({...interests, Politics: !interests.Politics})
            }
          />
          <Text>Politics</Text>
        </View>
      </View>

      <View style={styles.interestRow}>
        <View style={styles.checkboxContainer}>
          <Checkbox
            status={interests.Cricket ? 'checked' : 'unchecked'}
            onPress={() =>
              setInterests({...interests, Cricket: !interests.Cricket})
            }
          />
          <Text>Cricket</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <Checkbox
            status={interests.Hockey ? 'checked' : 'unchecked'}
            onPress={() =>
              setInterests({...interests, Hockey: !interests.Hockey})
            }
          />
          <Text>Hockey</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <Checkbox
            status={interests.Football ? 'checked' : 'unchecked'}
            onPress={() =>
              setInterests({...interests, Football: !interests.Football})
            }
          />
          <Text>Football</Text>
        </View>
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    color: 'black',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioLabel: {
    marginLeft: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 20,
    overflow: 'hidden', // Ensures the dropdown fits nicely
    color: 'black',
  },
  interestRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Distributes items evenly
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  submitText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default SocialAppForm;
