import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

const CotactAPi = () => {
  const [form, setForm] = useState({
    email: '',
    phone1: '',
    phone2: '',
    name: '',
    city: '',
  });
  const [gender, setGender] = useState('');

  const handleInputChange = (name, value) => {
    setForm({...form, [name]: value});
  };

  return (
    <View style={styles.container}>
      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Add</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Get By Email</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Update By Email</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Show All</Text>
        </TouchableOpacity>
      </View>

      {/* Image Capture */}
      <View style={styles.imageSection}>
        <View style={styles.imagePlaceholder}>
          <Text>Image</Text>
        </View>
        <TouchableOpacity style={styles.captureButton}>
          <Text style={styles.captureText}>Capture</Text>
        </TouchableOpacity>
      </View>

      {/* Input Fields */}
      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={form.email}
          onChangeText={text => handleInputChange('email', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone 1"
          value={form.phone1}
          onChangeText={text => handleInputChange('phone1', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone 2"
          value={form.phone2}
          onChangeText={text => handleInputChange('phone2', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={form.name}
          onChangeText={text => handleInputChange('name', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={form.city}
          onChangeText={text => handleInputChange('city', text)}
        />
      </View>

      {/* Gender Section */}
      <View style={styles.container}>
        <Text style={styles.label}>Gender:</Text>
        <View style={styles.radioGroup}>
          {/* Male Option */}
          <TouchableOpacity
            style={styles.radioOption}
            onPress={() => setGender('Male')}>
            <View style={styles.radioCircle}>
              {gender === 'Male' && <View style={styles.radioSelected} />}
            </View>
            <Text style={styles.radioLabel}>Male</Text>
          </TouchableOpacity>

          {/* Female Option */}
          <TouchableOpacity
            style={styles.radioOption}
            onPress={() => setGender('Female')}>
            <View style={styles.radioCircle}>
              {gender === 'Female' && <View style={styles.radioSelected} />}
            </View>
            <Text style={styles.radioLabel}>Female</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f9',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  imageSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  captureButton: {
    backgroundColor: '#28a745',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  captureText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  inputSection: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  genderSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  option: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  selected: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#007BFF',
    borderRadius: 5,
    backgroundColor: '#007BFF',
    color: '#fff',
  },
});

export default CotactAPi;
