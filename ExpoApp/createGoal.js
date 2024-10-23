import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';

export default function CreateGoal() {
  const questions = [
    {
      questionText: 'Set a new goal!',
      answerOptions: [
        { answerText: 'Click next to continue'}
      ]
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
  const [selectAnswer, setSelectAnswer] = useState(null);

  // Handle input change based on question type
  const handleAnswerChange = (text, questionIndex) => {
    const newAnswers = { ...answers, [questionIndex]: text };
    setAnswers(newAnswers);
  };

  const handleRadioSelect = (answerText, questionIndex, optionIndex) => {
    handleAnswerChange(answerText, questionIndex);
    setSelectAnswer(optionIndex);
  }

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
          <Text style={styles.title}> Goal set!</Text>
          <Text>Here is a summary of your responses:</Text>
          {questions.map((question, index) => (
            <View key={index}>
              <Text style={styles.questionText}>{question.questionText}</Text>
              <Text>{answers[index] || 'No answer'}</Text>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.slide}>
          <Text style={styles.questionText}>{questions[currentQuestion].questionText}</Text>
          <View style={styles.answerSection}>
            {questions[currentQuestion].answerOptions.map((option, index) => {
              const isSelected = selectAnswer === index;
              const textColor = isSelected ? 'purple' : 'green';
              if (option.type === 'textInput1') {
                return (
                  <TextInput
                    key={index}
                    style={styles.textInput}
                    placeholder="Other:"
                    onChangeText={(text) => handleAnswerChange(text, currentQuestion)}
                  />
                );
              } else if (option.type === 'textInput2') {
                return (
                  <TextInput
                    key={index}
                    style={styles.textInput}
                    placeholder="Amount of money:"
                    onChangeText={(text) => handleAnswerChange(text, currentQuestion)}
                  />
                );
              } else if (option.type === 'radio') {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleAnswerChange(option.answerText, currentQuestion)}
                  >
                    <Text>{option.answerText}</Text>
                  </TouchableOpacity>
                );
              } else if (option.type === 'dropdown') {
                return (
                  <TextInput
                    key={index}
                    style={styles.textInput}
                    placeholder="Select a time frame (0-12 months):"
                    onChangeText={(text) => handleAnswerChange(text, currentQuestion)}
                  />
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
                {currentQuestion === questions.length - 1 ? 'Confirm' : 'Next'}
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
  },
  summary: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  questionText: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
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
});
