import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  //properties
  const [showFinalResults, setFinalResults] = useState(false);
  const [score, setScore] = useState(0);
  const [CurrentQuestion, setCurrentQuestion] = useState(0);

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
      fetch('https://opentdb.com/api.php?amount=10&category=9&type=multiple')
      .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setQuestions(result.results);
            console.log(result.results[0])
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
  }, [])
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="App">
        {/* 1. Header */}
        <h1>Quiz </h1>

        {/* 2. current score */}
        <h2>Current Score: {score}</h2>

        {showFinalResults ? (
          /* 4. final results */
          < div className='final-results'>
            <h1>Final Results</h1>
            <h2>
              2 OUT OF 10 CORRECT - (20%)
            </h2>

            <button>Restart with new Questions</button>
          </div>
        ) : (


          /* 3. Question Card */
          <div className='question-card'>
              <h2>Question {CurrentQuestion + 1} out of {questions.length}</h2>
              <h3 className='question-text'>{questions[CurrentQuestion].question}</h3>

            <ul>
              <li>{questions[CurrentQuestion].correct_answer}</li>
              <li>{questions[CurrentQuestion].incorrect_answers[0]}</li>
              <li>{questions[CurrentQuestion].incorrect_answers[1]}</li>
              <li>{questions[CurrentQuestion].incorrect_answers[2]}</li>
            </ul>
          </div>
        )}
      </div >
    );
  }
}
export default App;
