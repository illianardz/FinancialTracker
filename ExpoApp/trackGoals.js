import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';

export default function TrackGoals() {
  // State to hold an array of goals
  const [goals, setGoals] = useState([
    { title: 'Goal 1', progress: 0 },
    { title: 'Goal 2', progress: 0 },
    { title: 'Goal 3', progress: 0 },
  ]);

  const [isEditing, setIsEditing] = useState(false);

  // Toggle edit mode for all goals
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  // Add a new goal
  const addGoal = () => {
    const newGoal = { title: `Goal ${goals.length + 1}`, progress: 0 };
    setGoals([...goals, newGoal]);
  };

  // Remove the last goal
  const removeGoal = () => {
    if (goals.length > 1) {
      setGoals(goals.slice(0, -1));
    }
  };

  // Update the progress for a specific goal
  const updateProgress = (index, percentage) => {
    const updatedGoals = goals.map((goal, i) =>
      i === index ? { ...goal, progress: Math.min(100, Math.max(0, percentage)) } : goal
    );
    setGoals(updatedGoals);
  };

  // Update the title for a specific goal
  const updateGoalTitle = (index, title) => {
    const updatedGoals = goals.map((goal, i) => (i === index ? { ...goal, title } : goal));
    setGoals(updatedGoals);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Track Your Goals</Text>

      {/* Goal Titles and Progress Bar Row */}
      <View style={styles.goalsRow}>
        {goals.map((goal, index) => (
          <View key={index} style={styles.goalContainer}>
            <Text style={styles.goalTitle}>{goal.title}:</Text>
            {isEditing ? (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Goal title"
                  value={goal.title}
                  onChangeText={(text) => updateGoalTitle(index, text)}
                />
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="Update progress"
                  value={String(goal.progress)}
                  onChangeText={(text) =>
                    updateProgress(index, parseInt(text) || 0)
                  }
                />
              </>
            ) : (
              <>
                <Text style={styles.goalDisplay}>{goal.title}</Text>
                <View style={styles.verticalBoxPlot}>
                  <View style={[styles.verticalProgressBar, { height: `${goal.progress}%` }]}>
                    <Text style={styles.progressText}>{goal.progress}%</Text>
                  </View>
                </View>
              </>
            )}
          </View>
        ))}
      </View>

      {/* Edit/Save Button */}
      <TouchableOpacity onPress={toggleEditMode} style={styles.editButton}>
        <Text style={styles.editButtonText}>{isEditing ? 'Save' : 'Edit Goals'}</Text>
      </TouchableOpacity>

      {/* Add and Remove Goal Buttons */}
      <View style={styles.addRemoveButtons}>
        <TouchableOpacity onPress={addGoal} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Goal</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={removeGoal} style={styles.removeButton}>
          <Text style={styles.removeButtonText}>Remove Goal</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  goalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  goalContainer: {
    width: 100,
    marginRight: 20,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  goalDisplay: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  verticalBoxPlot: {
    width: 50,
    height: 200,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginBottom: 10,
    position: 'relative',
    alignSelf: 'center',
  },
  verticalProgressBar: {
    width: '100%',
    backgroundColor: '#4caf50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    position: 'absolute',
    bottom: 0,
  },
  progressText: {
    color: 'white',
    fontWeight: 'bold',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -10 }],
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
  },
  addRemoveButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  addButton: {
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
