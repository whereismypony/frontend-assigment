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

  // Helper Function to handle onclicks
  const optionClicked = (clickedOption, isCorrect) => {
    if(clickedOption === isCorrect){
      setScore(score +1);
    }

    if (CurrentQuestion +1 < questions.length){
      setCurrentQuestion(CurrentQuestion + 1);
    }else{
      setFinalResults(true);
    }
  }
  // helper function to handle the game restarting by refreshing the page
  const restartGame = () =>{
    window.location.reload(false);
  }

// api call on loading page
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
    // adding the correct answer to the incorrect answers and shuffeling them
    questions[CurrentQuestion].incorrect_answers.push(questions[CurrentQuestion].correct_answer)
    shuffleAnswers(questions[CurrentQuestion].incorrect_answers);

    // this is where the page starts
    return (
      <div className="App">
        <h1>The Random Quiz</h1>

        <h2>Current Score: {score}</h2>

        {/* final results tab which is shown when all the questions have been answered */}
        {showFinalResults ? (
          < div className='final-results'>
            <h1>Final Results</h1>
            <h2>
              {score} OUT OF {questions.length} CORRECT - ({(100/questions.length)*score}%)
            </h2>

            <button onClick={() => restartGame()}>Restart with new Questions</button>
          </div>
        ) : (

          
          /* the Question Card  */
          <div className='question-card'>
              <h2>Question {CurrentQuestion + 1} out of {questions.length}</h2>
              <h3 className='question-text'>{questions[CurrentQuestion].question}</h3>
              {console.log(questions[CurrentQuestion].correct_answer)}
            <ul>
              <li onClick={() => optionClicked(questions[CurrentQuestion].incorrect_answers[0], questions[CurrentQuestion].correct_answer)}>{questions[CurrentQuestion].incorrect_answers[0]}</li>
              <li onClick={() => optionClicked(questions[CurrentQuestion].incorrect_answers[1], questions[CurrentQuestion].correct_answer)}>{questions[CurrentQuestion].incorrect_answers[1]}</li>
              <li onClick={() => optionClicked(questions[CurrentQuestion].incorrect_answers[2], questions[CurrentQuestion].correct_answer)}>{questions[CurrentQuestion].incorrect_answers[2]}</li>
              <li onClick={() => optionClicked(questions[CurrentQuestion].incorrect_answers[3], questions[CurrentQuestion].correct_answer)}>{questions[CurrentQuestion].incorrect_answers[3]}</li>
            </ul>
          </div>
        )}
      </div >
    );
  }
}
export default App;
