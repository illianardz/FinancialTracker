import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';

export default function CreateGoal() {
  // Defines questions and answers
  const questions = [
    {
      questionText: 'Set a new goal!',
      answerOptions: [{ answerText: 'Click start to continue' }],
    },
    {
      questionText: 'Is your goal short-term or long-term?',
      answerOptions: [
        { answerText: 'Short-term', type: 'multiplechoice' },
        { answerText: 'Long-term', type: 'multiplechoice' },
      ],
    },
    {
      questionText: 'What is your goal?',
      answerOptions: [
        { answerText: 'Vacation', type: 'multiplechoice' },
        { answerText: 'Debt Repayment', type: 'multiplechoice' },
        { answerText: 'Emergency Fund', type: 'multiplechoice' },
        { answerText: 'Other', type: 'textInput1' },
      ],
    },
    {
      questionText: 'Target Amount in dollars?',
      answerOptions: [
        { answerText: 'Target amount: ', type: 'textInput2' }
      ],
    },
    {
      questionText: 'Target time frame in months?',
      answerOptions: [
        { answerText: 'Target time frame: ', type: 'textInput3' }
      ]
    }
  ];

  // State variables to manage progress and user responses
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [surveyComplete, setSurveyComplete] = useState(false);
  const [selectAnswer, setSelectAnswer] = useState({});
  const[goalAmount, setGoalAmount] = useState('');
  const[timeFrame, setTimeFrame] = useState('');
  const[goalDesc, setGoalDesc] = useState('');

  //send answer outputs to goal tracker
  const goalCreate = () => {
    const newGoal = {
      title: answers[2] || 'New Goal',
      progress: 0,
      total: parseInt(answers[3]) || 10000,
    };

    addGoal(newGoal);

    navigation.goBack();
  };

  // Handle input change based on question type
  const handleAnswerChange = (text, questionIndex) => {
    const newAnswers = { ...answers, [questionIndex]: text };
    setAnswers(newAnswers);
  };

  // Handle multiple button selection
  const handleMultSelect = (answerText, questionIndex, optionIndex) => {
    handleAnswerChange(answerText, questionIndex);
    setSelectAnswer((prev) => ({ ...prev, [questionIndex]: optionIndex }));
  };

  // Move to the next question or complete the survey
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setSurveyComplete(true);
      goalCreate();
    }
  };

  // Move to the previous question
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1); // decrement question index
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Create Your Goal</Text>
      
      {surveyComplete ? (
        // Display summary if the survey is complete
        <View style={styles.summary}>
          <Text style={styles.title}>Goal set!</Text>
          <Text style={styles.summaryCaption}>Here is a summary of your responses: </Text>
          {questions.map((question, index) => (
            index > 0 && (
            <View key={index}>
              <Text style={styles.questionText}>{question.questionText}</Text>
              <Text style={styles.answers}> {answers[index] || 'No answer'}</Text> {/*Display answer or no answer*/}
            </View>
          )))}
        </View>
      ) : (
        // Display current question and options
        <View style={styles.slide}>
          <Text style={styles.questionText}>{questions[currentQuestion].questionText}</Text>
          <View style={styles.answerSection}>
            {questions[currentQuestion].answerOptions.map((option, index) => {
              const isSelected = selectAnswer[currentQuestion] === index; 
              // Change text color based on selection
              const textColor = isSelected ? 'purple' : 'green'; 
              //if question is text input 1
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
                //if question type is text input 2
              } else if (option.type === 'textInput2') {
                return (
                  <View key={index} style={styles.inputContainer}>
                    <Text style={styles.labelText}>Amount of money(in dollars):</Text>
                    <TextInput
                      style={styles.textInput}
                      onChangeText={(text) => handleAnswerChange(text, currentQuestion)}
                    />
                  </View>
                );
                //if question type is multiple choice
              } else if (option.type === 'multiplechoice') {
                return (
                  <View style={styles.multOption} key={index}>
                    <TouchableOpacity
                      style={styles.multCircle}
                      onPress={() => handleMultSelect(option.answerText, currentQuestion, index)}
                    > 
                    {/*if choice is selected, it will be underlined*/}
                      {isSelected && <View style={styles.selectedCircle} />}
                    </TouchableOpacity>
                    <Text style={[styles.multText, { color: textColor }]}>{option.answerText}</Text>
                  </View>
                );
                //if question is text input 3
              } else if (option.type === 'textInput3') {
                return (
                  <View key={index} style={styles.inputContainer}>
                    <Text style={styles.labelText}>Select a time frame(in months):</Text>
                    <TextInput
                      style={styles.textInput}
                      onChangeText={(text) => handleAnswerChange(text, currentQuestion)}
                    />
                  </View>
                );
              }
              return null; 
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
                {currentQuestion === 0 ? 'Click start to Continue!' : currentQuestion === questions.length - 1 ? 'Confirm' : 'Next'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

// Define styles for components
const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: '#B098A4',
    padding: 45,
  },
  answers:{
    fontSize: 18,
    textAlign: 'center'
  },
  summaryCaption: {
    fontSize: 24,
    textAlign: 'center',
  },
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
    fontSize: 30,
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
    height: 60,
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
    borderWidth: 2, 
    fontSize: 18,
    padding: 10,
  },
  multOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'center', 
  },
  multCircle: {
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
  multText: {
    fontSize: 18,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
    marginBottom: 10,
  },
  labelText: {
    marginRight: 10, 
    fontSize: 18,
  },
  goalCreation: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center'
  }
});
