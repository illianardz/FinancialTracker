import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Financial Tracker</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => alert('Create Goal')}>
          <Text style={styles.buttonText}>CREATE GOAL</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => alert('Track Goals')}>
          <Text style={styles.buttonText}>TRACK GOALS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => alert('Custom Plan')}>
          <Text style={styles.buttonText}>CUSTOM PLAN</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.navBar}>
        <Text style={styles.navText}>Dashboard</Text>
        <Text style={styles.navText}>Diary</Text>
        <Text style={styles.navText}>Modules</Text>
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
    padding: 40,
  },
  title: {
    fontSize: 60,
    color: '#2C2C2C',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonContainer: {
    margin: 50,
    marginTop: 90,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#2C2C2C',
    padding: 40,
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#E5EBEA',
    fontSize: 30,
    fontWeight: 'bold',
  },
  navBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#45503B',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 30,
  },
  navText: {
    fontSize: 20,
    color: '#cfcfcf',
    fontWeight: 'bold',
  },
});


