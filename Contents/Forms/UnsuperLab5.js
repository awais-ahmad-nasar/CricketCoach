import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Button, Checkbox, RadioButton} from 'react-native-paper';

const EmployeeForm = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [job, setJob] = useState('');
  const [qualification, setQualification] = useState('');
  const [gender, setGender] = useState('');
  const [isMarried, setIsMarried] = useState(false);
  const [salary, setSalary] = useState('');

  const calculateSalary = () => {
    let calculatedSalary = 0;

    if (job === 'senior' && qualification === 'MS' && isMarried) {
      calculatedSalary = 150000;
    } else if (job === 'senior' && qualification === 'MS' && !isMarried) {
      calculatedSalary = 120000;
    } else if (job === 'junior' && qualification === 'MS' && isMarried) {
      calculatedSalary = 100000;
    } else if (job === 'junior' && qualification === 'MS' && !isMarried) {
      calculatedSalary = 80000;
    } else if (job === 'senior' && qualification === 'BS' && isMarried) {
      calculatedSalary = 100000;
    } else if (job === 'senior' && qualification === 'BS' && !isMarried) {
      calculatedSalary = 80000;
    } else {
      calculatedSalary = 50000;
    }

    setSalary(calculatedSalary);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Employee Form</Text>

      {/* Name Input */}
      <TextInput
        placeholder="Enter Your Name"
        value={name}
        onChangeText={setName}
        style={styles.textInput}
        placeholderTextColor="black"
      />

      {/* Mobile Number Input */}
      <TextInput
        placeholder="Enter Mobile Number"
        value={mobile}
        onChangeText={setMobile}
        keyboardType="numeric"
        style={styles.textInput}
        placeholderTextColor="black"
      />

      {/* Job Selection */}
      <Text style={styles.label}>Select Job:</Text>
      <View style={styles.row}>
        <RadioButton
          value="junior"
          status={job === 'junior' ? 'checked' : 'unchecked'}
          onPress={() => setJob('junior')}
        />
        <Text style={styles.radioText}>Junior Lecturer</Text>
        <RadioButton
          value="senior"
          status={job === 'senior' ? 'checked' : 'unchecked'}
          onPress={() => setJob('senior')}
        />
        <Text style={styles.radioText}>Senior Lecturer</Text>
      </View>

      {/* Qualification Selection */}
      <Text style={styles.label}>Select Qualification:</Text>
      <View style={styles.row}>
        <Checkbox
          status={qualification === 'BS' ? 'checked' : 'unchecked'}
          onPress={() => setQualification('BS')}
        />
        <Text style={styles.radioText}>BS</Text>
        <Checkbox
          status={qualification === 'MS' ? 'checked' : 'unchecked'}
          onPress={() => setQualification('MS')}
        />
        <Text style={styles.radioText}>MS</Text>
      </View>

      {/* Gender Selection */}
      <Text style={styles.label}>Choose Gender:</Text>
      <View style={styles.row}>
        <RadioButton
          value="male"
          status={gender === 'male' ? 'checked' : 'unchecked'}
          onPress={() => setGender('male')}
        />
        <Text style={styles.radioText}>Male</Text>
        <RadioButton
          value="female"
          status={gender === 'female' ? 'checked' : 'unchecked'}
          onPress={() => setGender('female')}
        />
        <Text style={styles.radioText}>Female</Text>
      </View>

      {/* Marital Status */}
      <Text style={styles.label}>Marital Status:</Text>
      <View style={styles.row}>
        <RadioButton
          value="married"
          status={isMarried ? 'checked' : 'unchecked'}
          onPress={() => setIsMarried(true)}
        />
        <Text style={styles.radioText}>Married</Text>
        <RadioButton
          value="unmarried"
          status={!isMarried ? 'checked' : 'unchecked'}
          onPress={() => setIsMarried(false)}
        />
        <Text style={styles.radioText}>Unmarried</Text>
      </View>

      {/* Calculate Salary Button */}
      <Button mode="contained" onPress={calculateSalary} style={styles.button}>
        Calculate Salary
      </Button>

      {/* Display Salary */}
      {salary !== '' && (
        <Text style={styles.result}>Your Salary is: Rs {salary}</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'aqua',
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    color: 'red',
    backgroundColor: 'white',
  },
  label: {
    fontSize: 18,
    marginTop: 15,
    color: 'black',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  radioText: {
    fontSize: 18,
    marginRight: 20,
    color: 'black',
  },
  button: {
    marginTop: 20,
  },
  result: {
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
    color: 'green',
    fontWeight: 'bold',
  },
});

export default EmployeeForm;
