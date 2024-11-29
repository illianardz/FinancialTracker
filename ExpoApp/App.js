import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { CurrentRenderContext, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from './styles';
import CreateGoal from './createGoal'; 
import TrackGoals from './trackGoals';
import CustomPlan from './customPlan';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  // State to manage buttons in the menu
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
          onPress={() => navigation.navigate('CreateGoal')}
        >
          <Text style={styles.buttonText}>CREATE GOAL</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, trackButtonPressed ? styles.buttonPressed : null]}
          onPressIn={() => setTrackButtonPressed(true)}
          onPressOut={() => setTrackButtonPressed(false)}
          onPress={() => navigation.navigate('TrackGoals')}
        >
          <Text style={styles.buttonText}>TRACK GOALS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, planButtonPressed ? styles.buttonPressed : null]}
          onPressIn={() => setPlanButtonPressed(true)}
          onPressOut={() => setPlanButtonPressed(false)}
          onPress={() => navigation.navigate('CustomPlan')}
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

export default function App() {
  
  const [goals, setGoals] = useState([
    { title: 'Vacation', progress: 2100, total: 3000 },
    { title: 'Debt', progress: 985, total: 5000 },
    { title: 'Emergency', progress: 4000, total: 8000 },
  ]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="CreateGoal" options={{ title: 'Create Goals' }}>
          {props => <CreateGoal {...props} setGoals={setGoals} />}
        </Stack.Screen>
        <Stack.Screen
          name="TrackGoals" options={{ title: 'Track Goals' }}>
          {props => <TrackGoals {...props} goals={goals} setGoals={setGoals} />}
        </Stack.Screen>
        <Stack.Screen name="CustomPlan" component={CustomPlan} options={{ title: 'Custom Plan' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
