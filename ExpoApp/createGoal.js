import React, { useState } from 'react';
import { Modal, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import styles from './styles';

export default function CreateGoal({ navigation }) {

  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [title, setTitle] = useState('');
  const [progress, setProgress] = useState('');
  const [total, setTotal] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [question, setQuestion] = useState(1);

  const formatCurrency = (amount) => {
    if (amount === '' || isNaN(Number(amount))) {
        return '';
    }
    return `$${parseInt(amount).toLocaleString()}`;
  };

  const showError = (error) => {
    setErrorMessage(error);
    setModalVisible(true);
  }

  const hideError = () => {
    setErrorMessage('');
    setModalVisible(false);
  }
  
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
      resetForm();
    } else {
      console.log("Please fill in all fields.");
      showError("Please fill in all fields.");
    }
  };

  const formReset = () => {
    setQuestion(1);
    setTitle('');
    setProgress('');
    setTotal('');
    setTargetDate('');
  };

  const validateQuestion = () => {
    if (question == 1){
      if(title == ''){
        showError("Please fill in a title.\n");
        return false;
      } else {
        return true;
      }
    } else if(question == 2){
      if(total == '' || isNaN(total) || Number(total) <= 0 ){
        showError("Please fill in a valid monetary amount.\n");
        return false;
      } else {
        return true;
      }
    } else if(question == 3){
      if(progress == '' || isNaN(progress) || Number(progress) < 0 || Number(progress) > Number(total)){
        showError("Please fill in a valid monetary amount.\n");
        return false;
      } else {
        return true;
      }
    } else if(question == 4){
      if(targetDate == '' || isNaN(targetDate) || Number(targetDate) <= 0 ){
        showError("Please fill in a valid Target Date.");
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  //move to the next question
  const nextQuestion = () => {
    if(validateQuestion()){
      if (question === 5) {
        finishGoal();
        formReset();
      } else if (question < 5) {
        setQuestion(question + 1);
      }
    }
  };

  const prevQuestion = () => {
    if (question > 1) {
      setQuestion(question - 1);
    }
  };

  const cancelGoalSetup = () => {
    // Example of simply going back
    navigation.goBack();
    // Or reset form and navigate
    resetForm();
  };

  const resetForm = () => {
    setQuestion(1);
    setTitle('');
    setProgress('');
    setTotal('');
    setTargetDate('');
  };

  return (
    <ScrollView contentContainerStyle={styles.createContainer}>
      <Text style={styles.createHeader}>Goal Setup</Text>
      {question === 1 && (
        <View style={styles.questionContainer}>
          <Text style={styles.description}>
Set your financial goals by choosing what you're saving for
and specify your target amount and the timeframe you aim to achieve it by. 
          </Text>
          <Text style={styles.description}>
            Our app will help you visualize your progress,
            ensuring you stay on track and motivated throughout your financial journey!
          </Text>
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
          <Text style={styles.summaryText}>Total: {formatCurrency(total)}</Text>
          <Text style={styles.summaryText}>Progress: {formatCurrency(progress)}</Text>
          <Text style={styles.summaryText}>Target Time Frame: {targetDate} months</Text>
        </View>
      )}

      {/* Navigation buttons */}
      <View style={styles.navButtons}>
        {question > 1 && (
          <TouchableOpacity 
            onPress={prevQuestion} 
            style={styles.createButton}
            >
            <Text style={styles.createButtonText}>Previous</Text>
          </TouchableOpacity>
        )}
        {question === 1 && (
          <TouchableOpacity 
            onPress={cancelGoalSetup} 
            style={styles.createButton}
            >
            <Text style={styles.createButtonText}>Cancel</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity 
          onPress={nextQuestion} 
          style={[styles.createButton, styles.nextButton]}
          >
          <Text style={styles.createButtonText}>
            {question === 5 ? 'Finish' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
      {/*Popups for error handling*/}

      <Modal 
        visible ={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={hideError}
      >
        <View style= {styles.errorOverlay}>
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errorMessage}
              <TouchableOpacity 
                onPress={hideError} 
                style = {styles.errorButton}
                >
                <Text style={styles.errorButtonText}> OK </Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
