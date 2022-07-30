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

  // fisher - yates algorithm to randomize array order
  const shuffleAnswers = array =>{
    for(let i = array.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  return array;
  }

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
    questions[CurrentQuestion].incorrect_answers.push(questions[CurrentQuestion].correct_answer)
    shuffleAnswers(questions[CurrentQuestion].incorrect_answers);
    return (
      <div className="App">
        <h1>Quiz </h1>

        <h2>Current Score: {score}</h2>

        {/* 4. final results */}
        {showFinalResults ? (
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
              {console.log(questions[CurrentQuestion].correct_answer)}
            <ul>
              <li>{questions[CurrentQuestion].incorrect_answers[0]}</li>
              <li>{questions[CurrentQuestion].incorrect_answers[1]}</li>
              <li>{questions[CurrentQuestion].incorrect_answers[2]}</li>
              <li>{questions[CurrentQuestion].incorrect_answers[3]}</li>
            </ul>
          </div>
        )}
      </div >
    );
  }
}
export default App;
