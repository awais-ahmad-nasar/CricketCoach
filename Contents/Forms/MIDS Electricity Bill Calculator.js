import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {RadioButton} from 'react-native-paper'; // Import RadioButton from React Native Paper

const ElectricityBillCalculator = () => {
  const [units, setUnits] = useState('');
  const [meterType, setMeterType] = useState('Household'); // Default to Household
  const [bill, setBill] = useState(null);

  const calculateBill = () => {
    const unitCount = parseFloat(units);
    if (isNaN(unitCount) || unitCount < 0) {
      alert('Please enter a valid number of units.');
      return;
    }

    let totalBill = 0;

    if (meterType === 'Household') {
      if (unitCount <= 100) {
        totalBill = unitCount * 2.5;
      } else {
        totalBill = 100 * 2.5 + (unitCount - 100) * 5;
      }
    } else if (meterType === 'Commercial') {
      if (unitCount <= 100) {
        totalBill = unitCount * 3;
      } else {
        totalBill = 100 * 3 + (unitCount - 100) * 10;
      }
    }

    setBill(totalBill.toFixed(2)); // Set the bill to 2 decimal points
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Electricity Bill Calculator</Text>

      {/* Input for Units */}
      <TextInput
        style={styles.input}
        placeholder="Enter Units Consumed"
        keyboardType="numeric"
        placeholderTextColor={'black'}
        value={units}
        onChangeText={setUnits}
      />

      {/* Meter Type Selection using RadioButton */}
      <View style={styles.radioGroup}>
        <Text style={styles.radioGroupLabel}>Select Meter Type:</Text>
        <View style={styles.radioRow}>
          <RadioButton
            value="Household"
            status={meterType === 'Household' ? 'checked' : 'unchecked'}
            onPress={() => setMeterType('Household')}
          />
          <Text style={styles.radioLabel}>Household</Text>
        </View>
        <View style={styles.radioRow}>
          <RadioButton
            value="Commercial"
            status={meterType === 'Commercial' ? 'checked' : 'unchecked'}
            onPress={() => setMeterType('Commercial')}
          />
          <Text style={styles.radioLabel}>Commercial</Text>
        </View>
      </View>

      {/* Calculate Button */}
      <TouchableOpacity style={styles.calculateButton} onPress={calculateBill}>
        <Text style={styles.calculateText}>Calculate</Text>
      </TouchableOpacity>

      {/* Display Result */}
      {bill !== null && (
        <Text style={styles.result}>Payable Amount: Rs. {bill}</Text>
      )}
    </View>
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
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  radioGroup: {
    marginBottom: 20,
  },
  radioGroupLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioLabel: {
    fontSize: 16,
    marginLeft: 8,
  },
  calculateButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  calculateText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ElectricityBillCalculator;
