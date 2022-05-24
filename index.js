
 function Question( text, choices, answer ) {
    this.text = text;
    this.choices = choices;
    this.answer = answer; // this shall be one of the choices
  }

  function Quiz( questions ) {
    
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
  }
  
  
  Question.prototype.isCorrectAnswer = function( choice ) {
    return choice === this.answer;
  };  
  
  Quiz.prototype.CurrentQuestion = function() {
    return this.questions[this.questionIndex];
  };
  
  
  Quiz.prototype.checkOptionWithAnswer = function( answer ) {
    if( this.CurrentQuestion().isCorrectAnswer( answer ) ) {
      this.score++;
    }
    this.questionIndex++;
  };
  
  Quiz.prototype.isEnded = function() {
    return this.questions.length === this.questionIndex;
  };
  
  function showScore() {
    let percentage = (quiz.score/quiz.questions.length)*100;
    document.querySelector( '#quiz' ).innerHTML = `
      <h1>Result</h1>
      <div id="score">You scored ${quiz.score} / ${quiz.questions.length} and percentage is ${percentage} %</div>
    `;
  }
  
  function loadQuestion() {
    if( quiz.isEnded() ) {
      showScore();
      return;
    }
  
    let currentQuestion = quiz.CurrentQuestion();
  
    document.querySelector( '#question' ).textContent = currentQuestion.text;
   
    for( let i = 0; i < currentQuestion.choices.length; i++ ) {
      document.getElementById( 'choice' + i ).textContent = currentQuestion.choices[i];
      handleOptionButtonClick( 'btn' + i, currentQuestion.choices[i] );
    }
  
    showProgress();
  }
  
  
  function handleOptionButtonClick( btnId, choice ) {
    let button = document.querySelector( '#' + btnId );
    button.onclick = function() {
      
      quiz.checkOptionWithAnswer( choice );
      loadQuestion();
    };
  }
  
  
  function showProgress() {
    document.querySelector( '#progress' ).textContent = 'Question ' + ( quiz.questionIndex + 1 ) + ' of ' + quiz.questions.length;
  }
  
  // create questions here
  let questions = [
    new Question("An HTML document can contain_", ["Attributes", "Tags","Raw text", "All the answers are true"], "All the answers are true"),
    new Question("Choose the correct HTML tag for a large title.", ["H1", "Heading", "Head", "H6"], "H1"),
    new Question("Which type of JavaScript language is ___?", ["Object-Oriented", "Object-Based","Assembly-language", "High-level"], "Object-Based"),
    new Question("The 'function' and 'var' are known as: ", ["Keywords", "Data types", "Declaration statements", "Prototypes"], "Declaration statements"),
    new Question("Which language is used for Database Connection?", ["CSS", "HTML", "JS", "PHP"], "PHP")
  ];
  
  let quiz = new Quiz( questions );
  loadQuestion();