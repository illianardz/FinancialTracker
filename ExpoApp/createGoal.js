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
         setQuestion(1);
         setTitle('');
         setProgress('');
         setTotal('');
         setTargetDate('');
    } else {
      console.log('Please fill in all fields.');
    }
  };

  //move to the next question
  const nextQuestion = () => {
    if (question === 5) {
      finishGoal();
      setQuestion(1);
    } else if (question < 5) {
      setQuestion(question + 1);
    }
  };

  //go to the previous question
  const prevQuestion = () => {
    if (question > 1) {
      setQuestion(question - 1);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.createContainer}>
      <Text style={styles.createHeader}>Goal Setup</Text>

      {/* Goal enter */}
      {question === 1 && (
        <View style={styles.questionContainer}>
          <Text style={styles.label}>What is your goal?</Text>
          <TextInput
            style={styles.goalInput}
            placeholder="Enter goal title"
            value={title}
            onChangeText={setTitle}
          />
        </View>
      )}

      {/*Goal Amount*/}
      {question === 2 && (
        <View style={styles.questionContainer}>
          <Text style={styles.label}>What is your goal amount (in Dollars)?</Text>
          <TextInput
            style={styles.goalInput}
            placeholder="Enter goal amount"
            keyboardType="numeric"
            value={total}
            onChangeText={setTotal}
          />
        </View>
      )}

      {/*Total currently*/}
      {question === 3 && (
        <View style={styles.questionContainer}>
          <Text style={styles.label}>Total currently saved (in Dollars): </Text>
          <TextInput
            style={styles.goalInput}
            placeholder="Enter current savings"
            keyboardType="numeric"
            value={progress}
            onChangeText={setProgress}
          />
        </View>
      )}

      {/*Target Time Frame */}
      {question === 4 && (
        <View style={styles.questionContainer}>
          <Text style={styles.label}>Target time frame (in months):</Text>
          <TextInput
            style={styles.goalInput}
            placeholder="Enter target time frame in months"
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
          <Text style={styles.summaryText}>Total: ${total}</Text>
          <Text style={styles.summaryText}>Progress: ${progress}</Text>
          <Text style={styles.summaryText}>Target Time Frame: {targetDate} months</Text>
        </View>
      )}

      {/* Navigation buttons */}
      <View style={styles.navButtons}>
        {question > 1 && (
          <TouchableOpacity onPress={prevQuestion} style={styles.createButton}>
            <Text style={styles.createButtonText}>Previous</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={nextQuestion} style={[styles.createButton, styles.nextButton]}>
          <Text style={styles.createButtonText}>
            {question === 5 ? 'Finish' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
