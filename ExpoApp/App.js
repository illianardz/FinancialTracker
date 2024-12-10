import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { CurrentRenderContext, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateGoal from './createGoal'; 
import TrackGoals from './trackGoals';
import CustomPlan from './customPlan';
import styles from './styles';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  // State to manage buttons in the menu
  const [goalButtonPressed, setGoalButtonPressed] = useState(false);
  const [trackButtonPressed, setTrackButtonPressed] = useState(false);
  const [planButtonPressed, setPlanButtonPressed] = useState(false);

  return (
    <SafeAreaView style={styles.appContainer}>
      <View style={styles.appHeader}>
        <Text style={styles.appTitle}>Financial Tracker</Text>
      </View>
      <View style={styles.appButtonContainer}>
        <TouchableOpacity
          style={[styles.appButton, goalButtonPressed ? styles.appButtonPressed : null]}
          onPressIn={() => setGoalButtonPressed(true)}
          onPressOut={() => setGoalButtonPressed(false)}
          onPress={() => navigation.navigate('CreateGoal')}
        >
          <Text style={styles.appButtonText}>CREATE GOAL</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.appButton, trackButtonPressed ? styles.appButtonPressed : null]}
          onPressIn={() => setTrackButtonPressed(true)}
          onPressOut={() => setTrackButtonPressed(false)}
          onPress={() => navigation.navigate('TrackGoals')}
        >
          <Text style={styles.appButtonText}>TRACK GOALS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.appButton, planButtonPressed ? styles.appButtonPressed : null]}
          onPressIn={() => setPlanButtonPressed(true)}
          onPressOut={() => setPlanButtonPressed(false)}
          onPress={() => navigation.navigate('CustomPlan')}
        >
          <Text style={styles.appButtonText}>CUSTOM PLAN</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.appNavBar}>
        <Text style={styles.appNavText}>Home</Text>
        <Text style={styles.appNavText}>Diary</Text>
        <Text style={styles.appNavText}>Learn</Text>
        <Text style={styles.appNavText}>Plans</Text>
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreateGoal" component={CreateGoal} options={{title: 'Create Goals'}}/>
        <Stack.Screen name="TrackGoals" component={TrackGoals} options={{title: 'Track Goals'}} />
        <Stack.Screen name="CustomPlan" component={CustomPlan} options={{title: 'Custom Plan'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
