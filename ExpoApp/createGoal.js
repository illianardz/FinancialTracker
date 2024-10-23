import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';

export default function createGoal() {

    const TextInputExample = () => {
        const [text, onChangeText] = React.useState('ente here');
        const [number, onChangeNumber] = React.useState('');
    
    const questions = [
        {
          questionText: 'Is your goal short-term or long-term?',
          answerOptions: [
            { answerText: 'Short-term' },
            { answerText: 'Long-term' },
          ],
        },
        {
          questionText: 'What is your goal?',
          answerOptions: [
            { answerText: 'Vacation' },
            { answerText: 'Debt Repayment' },
            { answerText: 'Emergency Fund' },
            { answerText: 'Other', type: 'textInput' }
          ],
        },
        {
           questionText: 'Goal Details',
           answerOptions: [
                {answerText: 'Target amount: ', type: 'textInput'},
                {answerText: 'Target time frame: ', type: 'dropdown'}
            ]
        }
      ];
    
      const [currentQuestion, setCurrentQuestion] = useState(0);
      const [answers, setAnswers] = useState({});
      const [surveyComplete, setSurveyComplete] = useState(false);
    
      // Handle input change based on question type
      const handleAnswerChange = (e, questionIndex) => {
        const newAnswers = { ...answers, [questionIndex]: e.target.value };
        setAnswers(newAnswers);
      };
    
      // Move to the next question or complete the survey
      const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          setSurveyComplete(true);
        }
      };
    
      // Move to the previous question
      const handlePrevious = () => {
        if (currentQuestion > 0) {
          setCurrentQuestion(currentQuestion - 1);
        }
      };
    
      return (
        <div className="survey-container">
          {surveyComplete ? (
            <div className="summary">
              <h2>Survey Complete</h2>
              <p>Here is a summary of your responses:</p>
              {questions.map((question, index) => (
                <div key={index}>
                  <strong>{question.questionText}</strong>
                  <p>{answers[index] || 'No answer'}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="slide">
              <h2>{questions[currentQuestion].questionText}</h2>
              <div className="answer-section">
                {/* Render input based on question type */}
                {questions[currentQuestion].type === 'multipleChoice' && (
                  <div>
                    {questions[currentQuestion].answerOptions.map((option, index) => (
                      <label key={index}>
                        <input
                          type="radio"
                          name={`question-${currentQuestion}`}
                          value={option.answerText}
                          onChange={(e) => handleAnswerChange(e, currentQuestion)}
                        />
                        {option.answerText}
                      </label>
                    ))}
                  </div>
                )}
    
                {questions[currentQuestion].type === 'scale' && (
                  <div>
                    <input
                      type="range"
                      min={questions[currentQuestion].scaleMin}
                      max={questions[currentQuestion].scaleMax}
                      onChange={(e) => handleAnswerChange(e, currentQuestion)}
                    />
                    <span>{answers[currentQuestion]}</span>
                  </div>
                )}
    
                {questions[currentQuestion].type === 'dropdown' && (
                  <div>
                    <select onChange={(e) => handleAnswerChange(e, currentQuestion)}>
                      <option value="">Select a month</option>
                      {questions[currentQuestion].answerOptions.map((month, index) => (
                        <option key={index} value={month}>{month}</option>
                      ))}
                    </select>
                  </div>
                )}
    
                {questions[currentQuestion].type === 'textInput' && (
                  <div>
                    <textarea
                      placeholder="Your answer..."
                      onChange={(e) => handleAnswerChange(e, currentQuestion)}
                    ></textarea>
                  </div>
                )}
              </div>
    
              {/* Navigation buttons */}
              <div className="navigation-buttons">
                {currentQuestion > 0 && (
                  <button onClick={handlePrevious}>Back</button>
                )}
                <button onClick={handleNext}>
                  {currentQuestion === questions.length - 1 ? 'Confirm' : 'Next'}
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }
}

