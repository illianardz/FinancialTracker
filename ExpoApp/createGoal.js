import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';

export default function CreateGoal({ route, navigation }) {
  const { addGoal = () => {}, existingGoals = [] } = route.params || {};

  const [title, setTitle] = useState('');
  const [progress, setProgress] = useState('');
  const [total, setTotal] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [question, setQuestion] = useState(1);

  // Handle adding the new goal
  const addingGoal = () => {
    if (title && progress && total && targetDate) {
      const newGoal = {
        title,
        progress: parseInt(progress) || 0,
        total: parseInt(total) || 0,
        targetDate,
      };
      addGoal(newGoal); 
      navigation.goBack(); 
    } else {
      console.log('Please fill in all fields.');
    }
  };

  const nextQuestion = () => {
    if (question === 5) {
      addingGoal(); 
      navigation.navigate('TrackGoals', { addGoal }); 
    } else if (question < 5) {
      setQuestion(question + 1);
    }
  };

  const prevQuestion = () => {
    if (question > 1) {
      setQuestion(question - 1);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Create New Goal</Text>

      {/* Question steps */}
      {question === 1 && (
        <View style={styles.questionContainer}>
          <Text style={styles.label}>What is your goal?</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter goal title"
            value={title}
            onChangeText={setTitle}
          />
        </View>
      )}

      {question === 2 && (
        <View style={styles.questionContainer}>
          <Text style={styles.label}>What is your goal amount (in Dollars)?</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter goal amount"
            keyboardType="numeric"
            value={total}
            onChangeText={setTotal}
          />
        </View>
      )}

      {question === 3 && (
        <View style={styles.questionContainer}>
          <Text style={styles.label}>Total currently saved (in Dollars): </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter current savings"
            keyboardType="numeric"
            value={progress}
            onChangeText={setProgress}
          />
        </View>
      )}

      {question === 4 && (
        <View style={styles.questionContainer}>
          <Text style={styles.label}>Target time frame (in months):</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter target date"
            value={targetDate}
            onChangeText={setTargetDate}
          />
        </View>
      )}

      {/* Summary Section */}
      {question === 5 && (
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryCaption}>Goal Summary:</Text>
          <Text style={styles.summaryText}>Title: {title}</Text>
          <Text style={styles.summaryText}>Total: {total}</Text>
          <Text style={styles.summaryText}>Progress: {progress}</Text>
          <Text style={styles.summaryText}>Target Time Frame: {targetDate}</Text>
        </View>
      )}

      {/* Navigation buttons */}
      <View style={styles.navButtons}>
        {question > 1 && (
          <TouchableOpacity onPress={prevQuestion} style={styles.button}>
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={nextQuestion} style={[styles.button, styles.nextButton]}>
          <Text style={styles.buttonText}>
            {question === 5 ? 'Finish' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: '#B098A4',
    padding: 45,
    color: 'white',
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#E5EBEA',
  },
  questionContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 50,
    width: '100%',
  },
  label: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 75,
    color: '#333',
  },
  input: {
    height: 60,
    borderColor: '#B098A4',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
    width: '90%',
    borderRadius: 10,
    fontSize: 18,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  summaryCaption: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 18,
    marginBottom: 5,
    textAlign: 'center',
    color: '#555',
  },
  button: {
    backgroundColor: '#B098A4',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    margin: 5,
    width: '40%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end', 
    marginTop: 20,
    width: '100%',
  },
  nextButton: {
    marginLeft: 'auto', 
  },
});
