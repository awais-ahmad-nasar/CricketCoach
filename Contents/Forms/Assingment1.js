import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import {RadioButton} from 'react-native-paper';

const questionsData = [
  {
    question: 'Who is the founder of Pakistan?',
    options: [
      'Allama Iqbal',
      'Liaquat Ali Khan',
      'Muhammad Ali Jinnah',
      'Zulfikar Ali Bhutto',
    ],
    answer: 'Muhammad Ali Jinnah',
  },
  {
    question: 'When did Pakistan gain independence?',
    options: ['1940', '1945', '1947', '1950'],
    answer: '1947',
  },
  {
    question: 'What is the national language of Pakistan?',
    options: ['Sindhi', 'Punjabi', 'Urdu', 'Pashto'],
    answer: 'Urdu',
  },
  {
    question: 'What is the capital of Pakistan?',
    options: ['Karachi', 'Lahore', 'Islamabad', 'Peshawar'],
    answer: 'Islamabad',
  },
  {
    question: 'Which is the national flower of Pakistan?',
    options: ['Rose', 'Tulip', 'Jasmine', 'Sunflower'],
    answer: 'Jasmine',
  },
  {
    question: 'In which year was the Lahore Resolution passed?',
    options: ['1929', '1935', '1940', '1946'],
    answer: '1940',
  },
  {
    question: 'Who was the first Prime Minister of Pakistan?',
    options: ['Liaquat Ali Khan', 'Ayub Khan', 'Benazir Bhutto', 'Zia-ul-Haq'],
    answer: 'Liaquat Ali Khan',
  },
  {
    question: 'What is the national sport of Pakistan?',
    options: ['Cricket', 'Hockey', 'Squash', 'Football'],
    answer: 'Field Hockey',
  },
  {
    question: 'Which is the longest river in Pakistan?',
    options: ['Chenab', 'Jhelum', 'Indus', 'Ravi'],
    answer: 'Indus',
  },
  {
    question: 'What is the currency of Pakistan?',
    options: ['Rupee', 'Dollar', 'Pound', 'Euro'],
    answer: 'Rupee',
  },
];

const QuizApp = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const currentQuestion = questionsData[currentQuestionIndex];

  const handleOptionSelect = option => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === currentQuestion.answer) {
      setScore(score + 10);
      setCorrectAnswers(correctAnswers + 1);
    }
    setSelectedOption('');
    if (currentQuestionIndex < questionsData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handleFinish = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption('');
    setScore(0);
    setCorrectAnswers(0);
    setShowSummary(false);
  };

  return (
    <>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Quiz</Text>
      </View>
      <View style={styles.container}>
        {!showSummary ? (
          <>
            <Text style={styles.questionContainer}>
              Question{currentQuestionIndex + 1}: {currentQuestion.question}
            </Text>

            <View style={styles.optionsContainer}>
              <Text style={styles.label}>Options:</Text>
              {currentQuestion.options.map((option, index) => (
                <View key={index} style={styles.option}>
                  <RadioButton
                    value={option}
                    status={selectedOption === option ? 'checked' : 'unchecked'}
                    onPress={() => handleOptionSelect(option)}
                  />
                  <Text>{option}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={handleNextQuestion}
              disabled={!selectedOption}>
              <Text style={styles.buttonText}>
                {currentQuestionIndex < questionsData.length - 1
                  ? 'Next Question'
                  : 'Finish'}
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.summary}>
            <Text style={styles.summaryHeading}>Summary</Text>
            <Text>Total Questions: {questionsData.length}</Text>
            <Text>Correct Answers: {correctAnswers}</Text>
            <Text>Score: {score}</Text>
            <Button title="Restart Quiz" onPress={handleFinish} />
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headingContainer: {
    width: '100%',
    backgroundColor: 'orange',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  questionContainer: {
    backgroundColor: '#d3d3d3',
    padding: 15,
    borderRadius: 5,
    fontSize: 20,
    marginBottom: 20,
  },
  optionsContainer: {
    backgroundColor: '#cce7ff',
    padding: 15,
    borderRadius: 2,
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 1,
    padding: 1,
    borderRadius: 20,
  },
  selectedOption: {
    backgroundColor: '#b3e5fc',
  },
  button: {
    backgroundColor: '#6a1b9a',
    padding: 15,
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  summary: {
    backgroundColor: '#d3f9d8',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  summaryHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default QuizApp;
