import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import App from './App';

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
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Track Goals</Text>

      <View style={isEditing ? styles.goalsStacked : styles.goalsRow}>
        {goals.map((goal, index) => (
          <View key={index} style={isEditing ? styles.centeredGoalContainer : styles.goalContainer}>
            <Text style={styles.goalTitle}>{goal.title}:</Text>
            {isEditing ? (
              <>
                {/* Editing Goal Details */}
                <Text style={styles.editText}>Monetary Goal (in $): </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Monetary Goal"
                  keyboardType="numeric"
                  value={String(goal.total)}
                  onChangeText={(text) => updateProgress(index, 'total', parseInt(text) || 0)}
                />
                <Text style={styles.editText}>Progress (in $): </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Update Progress"
                  keyboardType="numeric"
                  value={String(goal.progress)}
                  onChangeText={(text) => updateProgress(index, 'progress', parseInt(text) || 0)}
                />
                <TouchableOpacity onPress={() => removeGoal(index)} style={styles.removeButton}>
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
      <TouchableOpacity onPress={toggleEditMode} style={styles.editButton}>
        <Text style={styles.editButtonText}>{isEditing ? 'Save' : 'Edit Goals'}</Text>
      </TouchableOpacity>

      {/* Add Goal Button */}
      {isEditing && (
        <TouchableOpacity
          onPress={() => navigation.navigate('CreateGoal')}
          style={styles.addButtonbutton}
        >
          <Text style={styles.addButtonTextuttonText}>Add Goal</Text>
        </TouchableOpacity>
      )}
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#E5EBEA',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: '#B098A4',
    padding: 45,
    color: '#2C2C2C',
  },
  goalsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  goalsStacked: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredGoalContainer: {
    width: '80%',
    marginBottom: 20,
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  editText: {
    fontSize: 16,
  },
  goalContainer: {
    width: '30%',
    marginBottom: 20,
    alignItems: 'center',
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#2C2C2C',
  },
  goalTotal: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: '#2C2C2C',
  },
  boxPlot: {
    width: '50%',
    height: 200,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginBottom: 10,
    position: 'relative',
    alignSelf: 'center',
  },
  progressBar: {
    width: '100%',
    backgroundColor: '#5f8575',
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
    backgroundColor: '#2C2C2C',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  backButton: {
    backgroundColor: '#2C2C2C',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
  },
  editButtonText: {
    color: 'white',
    fontSize: 18,
  },
  addButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  addButton: {
    backgroundColor: '#2C2C2C',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#E5EBEA',
    fontSize: 18,
  },
  removeButton: {
    backgroundColor: '#5f8575',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#E5EBEA',
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectButton: {
    backgroundColor: '#5f8575',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  selectSelect: {
    backgroundColor: 'E5EBEA'
  },
  selectButtonText: {
    color: '#E5EBEA',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
