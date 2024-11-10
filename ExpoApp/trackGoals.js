import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';

export default function TrackGoals({ navigation }) {
  //hardcoded data points in use
  const [goals, setGoals] = useState([
    { title: 'Vacation', progress: 2100, total: 3000 },
    { title: 'Debt', progress: 985, total: 5000 },
    { title: 'Emergency', progress: 4000, total: 8000 },
  ]);

  //constant that checks if the 
  const [isEditing, setIsEditing] = useState(false);

  // Toggle edit mode for all goals
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  // Add a new goal
  const addGoal = (newGoal) => {
    setGoals((prevGoals) => [...prevGoals, newGoal]);  
  };

  // Remove goal by index
  const removeGoal = (index) => {
    const updatedGoals = goals.filter((_, i) => i !== index);
    setGoals(updatedGoals);
  };

  // Update goal progress or total
  const updateProgress = (index, updatedValue) => {
      const updatedGoals = [...goals];
      updatedGoals[index] = { ...updatedGoals[index], progress: updatedValue };
      setGoals(updatedGoals);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Track Your Goals</Text>

  {/*Displayed goals and progress bar*/}
  
      <View style={isEditing ? styles.goalsStacked : styles.goalsRow}>
        {goals.map((goal, index) => (
          <View key={index} style={isEditing ? styles.centeredGoalContainer : styles.goalContainer}>
            <Text style={styles.goalTitle}>{goal.title}:</Text>
            {isEditing ? (
              <>
                {/*Edit goals*/} 
          
                <Text style={styles.editText}>Monetary Goal (in $): </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Monetary Goal"
                  keyboardType="numeric"
                  value={String(goal.total)}
                  onChangeText={(text) => updateProgress(index, parseInt(text) || 0)}
                />
                  {/*Updating current progress*/} 
                    
                <Text style={styles.editText}>Progress (in $): </Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="Update progress"
                  value={String(goal.progress)}
                  onChangeText={(text) => updateProgress(index, parseInt(text) || 0)}
                />

                    {/*Remove Goal functions*/}
                    
                <TouchableOpacity
                  onPress={() => removeGoal(index)} 
                  style={styles.selectButton}
                >
                  <Text style={styles.selectButtonText}>Select for Removal</Text>
                </TouchableOpacity>
                <View style={styles.divider} />
              </>
            ) : (
              <>
              
              {/*Shows the progress bars*/}

                <Text style={styles.goalTotal}>{"$" + goal.total}</Text>
                <View style={styles.boxPlot}>
                  <View
                    style={[
                      styles.progressBar,
                      {
                        

                        height: `${(goal.progress / goal.total) * 100}%`, 
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

{/*Edit/Save Button*/}

      <TouchableOpacity onPress={toggleEditMode} style={styles.editButton}>
        <Text style={styles.editButtonText}>{isEditing ? 'Save' : 'Edit Goals'}</Text>
      </TouchableOpacity>

{/*Back Button*/}

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

{/*Add Goal Buttons*/}

      {isEditing && (
        <View style={styles.addButtons}>
          <TouchableOpacity onPress={() => navigation.navigate('CreateGoal', { addGoal })} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add Goal</Text>
          </TouchableOpacity>
        </View>
      )}
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
    backgroundColor: '#5F8575',
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
    backgroundColor: '#2C2C2C',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#E5EBEA',
    fontSize: 18,
  },
  selectButton: {
    backgroundColor: '#B098A4',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  selectSelect: {
    backgroundColor: 'E5EBEA'
  },
  selectButtonText: {
    color: '#2C2C2C',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
