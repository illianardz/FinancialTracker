import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';

export default function App() {
  // State to manage button colors
  const [goalButtonPressed, setGoalButtonPressed] = useState(false);
  const [trackButtonPressed, setTrackButtonPressed] = useState(false);
  const [planButtonPressed, setPlanButtonPressed] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Financial Tracker</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, goalButtonPressed ? styles.buttonPressed : null]}
          onPressIn={() => setGoalButtonPressed(true)}
          onPressOut={() => setGoalButtonPressed(false)}
          onPress={() => alert('Create Goal')}
        >
          <Text style={styles.buttonText}>CREATE GOAL</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, trackButtonPressed ? styles.buttonPressed : null]}
          onPressIn={() => setTrackButtonPressed(true)}
          onPressOut={() => setTrackButtonPressed(false)}
          onPress={() => alert('Track Goals')}
        >
          <Text style={styles.buttonText}>TRACK GOALS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, planButtonPressed ? styles.buttonPressed : null]}
          onPressIn={() => setPlanButtonPressed(true)}
          onPressOut={() => setPlanButtonPressed(false)}
          onPress={() => alert('Custom Plan')}
        >
          <Text style={styles.buttonText}>CUSTOM PLAN</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.navBar}>
        <Text style={styles.navText}>Home</Text>
        <Text style={styles.navText}>Diary</Text>
        <Text style={styles.navText}>Learn</Text>
        <Text style={styles.navText}>Plans</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5EBEA',
  },
  header: {
    backgroundColor: '#B098A4',
    padding: 45,
  },
  title: {
    fontSize: 50,
    color: '#2C2C2C',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonContainer: {
    margin: 50,
    marginTop: 60,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#2C2C2C',
    padding: 35,
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#E5EBEA',
    fontSize: 25,
    fontWeight: 'bold',
  },
  buttonPressed: {
    backgroundColor: '#7B8C7C', // New color when pressed
  },
  navBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#45503B',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 40,
  },
  navText: {
    fontSize: 16,
    color: '#cfcfcf',
    fontWeight: 'bold',
  },
});



