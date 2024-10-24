import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';

export default function CreateGoal() {
  const questions = [
    {
      questionText: 'Set a new goal!',
      answerOptions: [{ answerText: 'Click start to continue' }],
    },
    {
      questionText: 'Is your goal short-term or long-term?',
      answerOptions: [
        { answerText: 'Short-term', type: 'radio' },
        { answerText: 'Long-term', type: 'radio' },
      ],
    },
    {
      questionText: 'What is your goal?',
      answerOptions: [
        { answerText: 'Vacation', type: 'radio' },
        { answerText: 'Debt Repayment', type: 'radio' },
        { answerText: 'Emergency Fund', type: 'radio' },
        { answerText: 'Other', type: 'textInput1' },
      ],
    },
    {
      questionText: 'Goal Details',
      answerOptions: [
        { answerText: 'Target amount: ', type: 'textInput2' },
        { answerText: 'Target time frame: ', type: 'dropdown' },
      ],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [surveyComplete, setSurveyComplete] = useState(false);
  const [selectAnswer, setSelectAnswer] = useState({});

  // Handle input change based on question type
  const handleAnswerChange = (text, questionIndex) => {
    const newAnswers = { ...answers, [questionIndex]: text };
    setAnswers(newAnswers);
  };

  const handleRadioSelect = (answerText, questionIndex, optionIndex) => {
    handleAnswerChange(answerText, questionIndex);
    setSelectAnswer((prev) => ({ ...prev, [questionIndex]: optionIndex }));
  };

  // Move to the next question or complete the survey
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setSurveyComplete(true);
    }
  };

  // Move to the previous question
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {surveyComplete ? (
        <View style={styles.summary}>
          <Text style={styles.title}>Goal set!</Text>
          <Text>Here is a summary of your responses:</Text>
          {questions.map((question, index) => (
            index > 0 && (
            <View key={index}>
              <Text style={styles.questionText}>{question.questionText}</Text>
              <Text>{answers[index] || 'No answer'}</Text>
            </View>
          )))}
        </View>
      ) : (
        <View style={styles.slide}>
          <Text style={styles.questionText}>{questions[currentQuestion].questionText}</Text>
          <View style={styles.answerSection}>
            {questions[currentQuestion].answerOptions.map((option, index) => {
              const isSelected = selectAnswer[currentQuestion] === index; // Move this line inside the map function
              const textColor = isSelected ? 'purple' : 'green';

              if (option.type === 'textInput1') {
                return (
                  <View key={index} style={styles.inputContainer}>
                    <Text style={styles.labelText}>Other:</Text>
                    <TextInput 
                      style={styles.textInput}
                      onChangeText={(text) => handleAnswerChange(text, currentQuestion)} 
                    />
                  </View>
                );
              } else if (option.type === 'textInput2') {
                return (
                  <View key={index} style={styles.inputContainer}>
                    <Text style={styles.labelText}>Amount of money:</Text>
                    <TextInput
                      style={styles.textInput}
                      onChangeText={(text) => handleAnswerChange(text, currentQuestion)}
                    />
                  </View>
                );
              } else if (option.type === 'radio') {
                return (
                  <View style={styles.radioOption} key={index}>
                    <TouchableOpacity
                      style={styles.radioCircle}
                      onPress={() => handleRadioSelect(option.answerText, currentQuestion, index)}
                    >
                      {isSelected && <View style={styles.selectedCircle} />}
                    </TouchableOpacity>
                    <Text style={[styles.radioText, { color: textColor }]}>{option.answerText}</Text>
                  </View>
                );
              } else if (option.type === 'dropdown') {
                return (
                  <View key={index} style={styles.inputContainer}>
                    <Text style={styles.labelText}>Select a time frame:</Text>
                    <TextInput
                      style={styles.textInput}
                      onChangeText={(text) => handleAnswerChange(text, currentQuestion)}
                    />
                  </View>
                );
              }
              return null; // Return null if no matching type
            })}
          </View>
          <View style={styles.navigationButtons}>
            {currentQuestion > 0 && (
              <TouchableOpacity onPress={handlePrevious}>
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={handleNext}>
              <Text style={styles.buttonText}>
                {currentQuestion === 0 ? 'Start' : currentQuestion === questions.length - 1 ? 'Confirm' : 'Next'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E5EBEA',
    justifyContent: 'center',
  },
  summary: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  questionText: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  answerSection: {
    marginBottom: 20,
  },
  textInput: {
    height: 40,
    borderColor: '#2C2C2C',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonText: {
    color: '#2C2C2C',
    fontSize: 18,
    padding: 10,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'center', 
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2C2C2C',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10, 
  },
  selectedCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#2C2C2C',
  },
  radioText: {
    fontSize: 18,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Align label and input vertically
    marginBottom: 10,
  },
  labelText: {
    marginRight: 10, // Space between label and input
    fontSize: 16,
  },
});
