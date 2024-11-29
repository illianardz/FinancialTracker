import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import styles from './styles';

export default function CreateGoal({ navigation }) {
  const [title, setTitle] = useState('');
  const [progress, setProgress] = useState('');
  const [total, setTotal] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [question, setQuestion] = useState(1);

  const finishGoal = () => {
    if (title && progress && total && targetDate) {
      const newGoal = {
        title,
        progress: parseInt(progress) || 0,
        total: parseInt(total) || 0,
        targetDate,
      };

      // Pass the new goal to TrackGoals and navigate back
      navigation.navigate('TrackGoals', { newGoal });
    } else {
      console.log('Please fill in all fields.');
    }
  };

  const nextQuestion = () => {
    if (question === 5) {
      finishGoal();
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
      <Text style={styles.header}>Goal Setup</Text>

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
          <Text style={styles.label}>Total currently saved (in Dollars):</Text>
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
            placeholder="Enter target time frame in months"
            value={targetDate}
            onChangeText={setTargetDate}
          />
        </View>
      )}

      {question === 5 && (
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryCaption}>Goal Summary:</Text>
          <Text style={styles.summaryText}>Title: {title}</Text>
          <Text style={styles.summaryText}>Total: ${total}</Text>
          <Text style={styles.summaryText}>Progress: ${progress}</Text>
          <Text style={styles.summaryText}>Target Time Frame: {targetDate} months</Text>
        </View>
      )}

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
