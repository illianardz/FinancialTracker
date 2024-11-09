import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import CreateGoal from './createGoal';

export default function TrackGoals({ navigation }) {
  const [goals, setGoals] = useState([
    { title: 'Vacation', progress: 2100, total: 3000 },
    { title: 'Debt', progress: 985, total: 5000 },
    { title: 'Emergency', progress: 4000, total: 8000 },
  ]);

  const [isEditing, setIsEditing] = useState(false);

  // Toggle edit mode for all goals
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  // Add a new goal
  const addGoal = (newGoal) => {
    setGoals((prevGoals) => [...prevGoals, newGoals]);
  }

  // Remove the last goal
  const removeGoal = () => {
    if (goals.length > 1) {
      setGoals(goals.slice(0, -1));
    }
  };

  // Update the progress for a specific goal
  const updateProgress = (index, percentage) => {
    const updatedGoals = goals.map((goal, i) =>
      i === index ? { ...goal, total: parseInt(amount) || 0} : goal
    );
    setGoals(updatedGoals);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Track Your Goals</Text>
      {/* displayed goals and progress bar */}
      <View style={isEditing ? styles.goalsStacked : styles.goalsRow}>
        {goals.map((goal, index) => (
          <View key={index} style={isEditing ? styles.centeredGoalContainer : styles.goalContainer}>
            <Text style={styles.goalTitle}>{goal.title}:</Text>
            {isEditing ? (
              <>
                {/*Each goals */}
                <Text style={styles.editText}>Monetary Goal (in $): </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Monetary Goal"
                  keyboardType="numeric"
                  value={String(goal.total)}
                  onChangeText={(text) => updateProgress(index, text)}
                />
                <Text style={styles.editText}>Progress (in $): </Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="Update progress"
                  value={String(goal.progress)}
                  onChangeText={(text) =>
                    updateProgress(index, parseInt(text) || 0)
                  }
                />
                <View style={styles.divider}/>
              </>
            ) : (
              <>
                <Text style={styles.goalTotal}>{"$" + goal.total}</Text>
                <View style={styles.boxPlot}>
                  <View
                    style={[
                      styles.progressBar,
                      {
                        height: `${(goal.progress / goal.total) * 100}%`, // Scale progress bar height based on progress
                      },
                    ]}
                  >
                    <Text style={styles.progressText}>{'$' + goal.progress}</Text>
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

      {/* Conditionally Render Add and Remove Goal Buttons */}
      {isEditing && (
        <View style={styles.addRemoveButtons}>
          <TouchableOpacity onPress={() => navigation.navigate('CreateGoal', {addGoal})} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add Goal</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={removeGoal} style={styles.removeButton}>
            <Text style={styles.removeButtonText}>Remove Goal</Text>
          </TouchableOpacity>
        </View>
      )}
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
    flexWrap: 'wrap', 
    // wrap for goal tubes when space is limited
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  goalsStacked: {
    flexDirection: 'column', // Stack goals vertically when editing
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center', // Center the content horizontally
  },
  centeredGoalContainer: {
    width: '80%', // Reduce width when editing to center goals
    marginBottom: 20,
    alignItems: 'center', // Center each goal inside its container
  },
  divider: {
    border: 0,
    height: 1,
    backgroun: '#ddd',
    marginVertical: 20,
  },
  editText:{
    fontSize: 16
  },
  goalContainer: {
    width: '30%', // Adjust width to allow multiple goals to fit in a row
    marginBottom: 20, // Space between goals
    alignItems: 'center', // Align content in the center
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  goalTotal: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  goalDisplay: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  boxPlot: {
    width: '50%', // Reduced width for the progress bar container
    height: 200, // Fixed height for the container
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginBottom: 10,
    position: 'relative',
    alignSelf: 'center',
  },
  progressBar: {
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
    fontSize: 18,
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
    fontSize: 18,
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
    fontSize: 18,
  }
});
