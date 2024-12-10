import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import App from './App';
import styles from './styles';

export default function TrackGoals({ route, navigation }) {
  const [goals, setGoals] = useState([
    { title: 'Vacation', progress: 2100, total: 3000 },
    { title: 'Debt', progress: 985, total: 5000 },
    { title: 'Emergency', progress: 4000, total: 8000 },
  ]);

  const [isEditing, setIsEditing] = useState(false);

  // Handle new goals passed from the CreateGoal screen
  useEffect(() => {
    if (route.params?.newGoal) {
      setGoals((prevGoals) => [...prevGoals, route.params.newGoal]);
    }
  }, [route.params?.newGoal]);

  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  // Remove goal by index
  const removeGoal = (index) => {
    const updatedGoals = goals.filter((_, i) => i !== index);
    setGoals(updatedGoals);
  };

  // Update goal progress or total
  const updateProgress = (index, key, updatedValue) => {
    const updatedGoals = [...goals];
    updatedGoals[index] = { ...updatedGoals[index], [key]: updatedValue };
    setGoals(updatedGoals);
  };

  return (
    <ScrollView style={styles.trackContainer}>
      <Text style={styles.trackHeader}>Track Goals</Text>
      <View style={isEditing ? styles.goalsStacked : styles.goalsRow}>
        {goals.map((goal, index) => (
          <View key={index} style={isEditing ? styles.centeredGoalContainer : styles.goalContainer}>
            <Text style={styles.goalTitle}>{goal.title}:</Text>
            {isEditing ? (
              <>
                {/* Editing Goal Details */}
                <Text style={styles.editText}>Monetary Goal (in $): </Text>
                <TextInput
                  style={styles.trackInput}
                  placeholder= 'goal.total'
                  keyboardType="numeric"
                  value={Number(goal.total)}
                  onChangeText={(text) => updateProgress(index, 'total', parseInt(text) || 0)}
                />
                <Text style={styles.editText}>Progress (in $): </Text>
                <TextInput
                  style={styles.trackInput}
                  placeholder='goal.progress'
                  keyboardType="numeric"
                  value={Number(goal.progress)}
                  onChangeText={(text) => updateProgress(index, 'progress', parseInt(text) || 0)}
                />
                <TouchableOpacity 
                  onPress={() => removeGoal(index)} 
                  style={styles.removeButton}>
                  <Text style={styles.removeButtonText}>Remove Goal</Text>
                </TouchableOpacity>
                <View style={styles.divider} />
              </>
            ) : (
              <>
                {/* Displaying Goal Progress */}
                <Text style={styles.goalTotal}>{"$" + goal.total}</Text>
                <View style={styles.boxPlot}>
                  <View style={[
                      styles.progressBar,
                      {
                        height: `${(goal.progress / goal.total) * 100}%`, 
                      },
                    ]}>
                    <Text style={styles.progressText}>{'$' + goal.progress}</Text>
                  </View>
                </View>
              </>
            )}
          </View>
        ))}
      </View>

      {/* Edit/Save Button */}
      <TouchableOpacity 
        onPress={toggleEditMode} 
        style={styles.editButton}
      >
        <Text style={styles.editButtonText}>{isEditing ? 'Save' : 'Edit Goals'}</Text>
      </TouchableOpacity>

      {/* Add Goal Button */}
      {isEditing && (
        <TouchableOpacity
          onPress={() => navigation.navigate('CreateGoal')}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>Add Goal</Text>
        </TouchableOpacity>
      )}
      {/* Back Button */}
      <TouchableOpacity 
        onPress={() => navigation.navigate('Home')} 
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
