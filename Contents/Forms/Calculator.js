import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

const Calculator = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [Answer, setAnswer] = useState('');

  const cal = (n1, n2, op) => {
    const number1 = parseInt(n1);
    const number2 = parseInt(n2);
    var result = 0;
    if (op == '+') {
      result = number1 + number2;
    } else if (op == '-') {
      result = number1 - number2;
    } else if (op === '*') {
      result = number1 * number2;
    } else if (op === '/') {
      result = number1 / number2;
    }
    setAnswer(result.toString());
  };

  return (
    <View style={styles.main}>
      <Text style={styles.text}>Calculator</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter Num1 here"
          value={num1}
          onChangeText={setNum1}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter Num2 here"
          value={num2}
          onChangeText={setNum2}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>

      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => cal(num1, num2, '+')}
          style={styles.button}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => cal(num1, num2, '-')}
          style={styles.button}>
          <Text style={styles.buttonText}>Subtract</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => cal(num1, num2, '*')}
          style={styles.button}>
          <Text style={styles.buttonText}>Multiply</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => cal(num1, num2, '/')}
          style={styles.button}>
          <Text style={styles.buttonText}>Division</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Answer"
          value={Answer}
          editable={false}
          style={styles.input}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'aqua',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    flex: 1,
  },
  text: {
    fontSize: 50,
    padding: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  inputContainer: {
    width: '90%',
    margin: 15,
    color: 'black',
  },
  input: {
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 2,
    fontSize: 18,
    padding: 20,
    fontWeight: 'bold',
  },
  button: {
    width: '40%',
    height: 70,
    borderRadius: 25,
    backgroundColor: '#E7E9E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default Calculator;
