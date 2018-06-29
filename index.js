'use strict';

let questionNumber = 0;
let score = 0;


function startQuiz()
{
	console.log( 'startQuiz() ran' );
  
  // Start page will show by default
	// Listen for user's click on start button to begin
  $( '.startPg' ).on( 'click', '.startButton', function(event )
  {
      // remove startPg content
      $( '.startPg' ).remove();

      // Make the div that will hold the Q&A form visible
      $( '.questionsAndAnswers' ).show();
      
    
        // Ask a question
        renderQuestion();            
  });	
} // end startQuiz

function giveCorrectFeedback()
{
	// Create HTML for eedback given when user chooses the correct answer
  console.log( 'giveCorrectFeedback() ran' );	

  // Correct message and 'Next' button
  $( '.questionsAndAnswers' ).html( 
    `<div>
      <p>Correct!</p>
      <button type="button" class="nextButton">Next</button>
    </div>` );  
} // end giveCorrectFeedback

function giveIncorrectFeedback()
{
	// Create HTML for eedback given when user chooses the incorrect answer
  console.log( 'giveIncorrectdFeedback() ran' );

  // Get the correct answer to display to user
  const correct = STORAGE[ questionNumber ].correctAnswer;
  
  // Incorrect message and 'Next' button  
  $( '.questionsAndAnswers' ).html( 
    `<div>
      <p>Wrong!
        <br><br>The correct answer is "${ correct }"
      </p>
      <button type="button" class="nextButton">Next</button>
    </div>` );
} // end giveIncorrectFeedback

function updateScore()
{
  // Increases the user's score for correct answers
  score++;
} // end updateScore

function updateQuestionNumberCounter()
{
  // Increases the question number on the counter that keeps track of current question
  questionNumber++;
} // updateQuestionNumberCounter

function askNextQuestion()
{
	console.log( 'askNextQuestion() ran' );

  // Listen for a click on the next button
  $( '.questionsAndAnswers' ).on( 'click', '.nextButton', function ( event )
  {
    renderQuestion();                  
  });  
}

function giveResults()
{
	console.log( 'giveResults() ran' );
  
  // hide counter
  $( '.counting' ).hide();
  
  // Replace HTML in Q&A div
  // Give user results by updating score and displaying a message with total score
  // Create a 'restart' button
  $( '.questionsAndAnswers' ).html( 
    `<div>
        <p>You got ${ score } correct
        <br>
        Play Again?
        </p>
        <button type="button" class="restartButton">Restart</button>
    </div>` );
	
  // Listen for user click on 'startOver' button and run startOver()
	$( '.questionsAndAnswers' ).on( 'click', '.restartButton', function()
  {
      startOver();
  } );  
} // end giveResults

function startOver()
{
	console.log( 'startOver() ran' );

  // Reload game
  location.reload();
} // end startOver

function createQuestionString()
{
	console.log( 'createQuestionString() ran' );
  
  // Creates the string that will be added to the DOM
  return `<div class="quest-${ questionNumber }">
    <h3>${ STORAGE[ questionNumber ].question }</h3>
    <form>
      <fieldset>
        <div class="answerWrapper">
          <label>
            <input type="radio" name="answer" value="${STORAGE[questionNumber].answers[0]}" required>
            <span>${STORAGE[questionNumber].answers[0]}</span>
          </label>
        </div>        

        <div class="answerWrapper">
          <label>
            <input type="radio" name="answer" value="${STORAGE[questionNumber].answers[1]}" required>
            <span>${STORAGE[questionNumber].answers[1]}</span>
          </label>
        </div>       

        <div class="answerWrapper">
          <label>
            <input type="radio" name="answer" value="${STORAGE[questionNumber].answers[2]}" required>
            <span>${STORAGE[questionNumber].answers[2]}</span>
        </label>
        </div>        

        <div class="answerWrapper">
          <label>
            <input type="radio" name="answer" value="${STORAGE[questionNumber].answers[3]}" required>
            <span>${STORAGE[questionNumber].answers[3]}</span>
          </label>
        </div>
        
        <div>
          <button type="submit" class="submitButton" onclick="handleSubmit()">Submit</button>
        </div>        
      </fieldset>      
    </form>
    </div>`;
}

function renderQuestion()
{
	console.log( 'renderQuestion() ran' );
   
  // Show question counter and score
  $( '.counting' ).html( `<ul>
          <li>Question <span>${ questionNumber + 1 } of 10</span></li>
          <li>Score: <span>${ score }</span></li>
        </ul>` );
  
  $( '.counting' ).show();
  
  // Adds the created question string to the DOM
  $( '.questionsAndAnswers' ).html( createQuestionString() );  
}

function handleSubmit()
{
  console.log( 'handleSubmit() ran' );
  
  event.preventDefault();
            
  let userAnswer = $( 'input[name=answer]:checked').val();
  console.log( userAnswer );

  if ( userAnswer )
  {
    // On submit compare user answer to current quesion's correct answer
    if ( userAnswer === STORAGE[ questionNumber ].correctAnswer )
    {
      // Increase user's score for correct answers
      updateScore();
              
      // Give user feedback for correct answers
      giveCorrectFeedback();          
    }
    else
    {
      // Give user feedback for incorrect answers
      giveIncorrectFeedback();              
    }            

    updateQuestionNumberCounter();            

    if ( questionNumber < STORAGE.length )
    {
      // Listen for click on 'Next' button...
      askNextQuestion();
    }
    else
    {
      // After all questions are asked and answered, show results
      giveResults(); 
    }
  }
  else
  {
    alert("Please select an answer");
  }
  
} // end handleSubmit

function isRadioButtonClicked()
{
  if ( true )
  {
      // allow user to move on to feedback
  }
  else( false )
  {
    //prompt user to make a selection
  }

}

function handleTestApp()
{
    console.log( 'handleTestApp() ran' );
    
    // initial calls to bind event listeners to these functions
    startQuiz();    
}

$( handleTestApp );