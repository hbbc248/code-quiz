var titleEl = document.querySelector("#title-content");
var startQuizEl = document.querySelector("#start-quiz"); 
var answersEl = document.querySelector("#answers");
var feedbackEl = document.querySelector(".answer-feedback");
var finalEl = document.querySelector("#final-score");
var submitEl = document.querySelector("#initials-input");
var highScoreEl = document.querySelector("#high-scores");
var btnDivEl = document.querySelector(".score-btns");
var timerEl = document.querySelector("#timer-count");
var highScores = [];
var score = 0;
var timer = 75;
var n = 0;



var questionEl = document.querySelector("#question");
var fbEl = document.querySelector("#feedback");



// Questions variable
var questions = [
    {
        question: "What is there",
        a1: "jose",
        a2: "maria",
        a3: "carlos",
        a4: "pedro",
        ca: "answer2"
    },
    {
        question: "What is here",
        a1: "alla",
        a2: "por aqui",
        a3: "no por aqui",
        a4: "lejos",
        ca: "answer3"
    } 
];








//initial screen function
var initialScreen = function() {

    // create Title "Coding Quiz Challenge"
    var initialTitle = document.createElement("h1");
    initialTitle.id = "initial-title";
    initialTitle.textContent = "Coding Quiz Challenge";
    titleEl.appendChild(initialTitle);

    // create inital message
    var initialMessage = document.createElement("p");
    initialMessage.id = "initial-message";
    initialMessage.textContent = "Try to answer the following code related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds";
    startQuizEl.appendChild(initialMessage);

    var startBtn = document.createElement("button");
    startBtn.className = "start-btn";
    startBtn.textContent = "Start Quiz";
    startQuizEl.appendChild(startBtn);
};


//quiz start function
var quizStart = function () {
    // remove all initial message elements
    var remTitle = document.querySelector("#initial-title");
    remTitle.remove();
    var remMessage = document.querySelector("#initial-message");
    remMessage.remove();
    var remButton = document.querySelector(".start-btn");
    remButton.remove();
    // create element for question
    questionEl = document.createElement("h2");
    questionEl.id = "question";
    titleEl.appendChild(questionEl);
    // create element for answers
      
        a1 = document.createElement("button");
        a1.className = "answer-btn";
        a1.id = "answer1";
        answersEl.appendChild(a1);
        a2 = document.createElement("button");
        a2.className = "answer-btn";
        a2.id = "answer2";
        answersEl.appendChild(a2);
    
        a3 = document.createElement("button");
        a3.className = "answer-btn";
        a3.id = "answer3";
        answersEl.appendChild(a3);
    
        a4 = document.createElement("button");
        a4.className = "answer-btn";
        a4.id = "answer4";
        answersEl.appendChild(a4);  
    
    /*
    for (i = 0; i < 4; i++) {
        var answerEl = document.createElement("button");
        answerEl.className = "answer-btn";
        var newId = "answer"+i;
        answerEl.id = newId;
        answerEl.textContent = "aqui";
        answersEl.appendChild(answerEl);
    }
    */
  
    // call question print function for first question
    n = 0;
    questionPrint(n);
};

var questionPrint = function(i) {     
    questionEl.textContent = questions[i].question;
    a1.textContent = questions[i].a1;
    a2.textContent = questions[i].a2;
    a3.textContent = questions[i].a3;
    a4.textContent = questions[i].a4;
};
var answerSequence = function(event) {
    if (timer > 0) {
        // an anwer was clicked 
        if (event.target.matches(".answer-btn")) {
            // validate answer
            var answerId = event.target.id;
            fbEl = document.createElement("p");
            fbEl.id = "feedback";
            feedbackEl.appendChild(fbEl);
            if (answerId === questions[n].ca) {
                fbEl.textContent = "Correct!";
            }
            else {
                fbEl.textContent = "Wrong!";
                timer -=10;
            }
            setTimeout(() => {
                fbEl.remove();
            }, 1000);
            n++;
            if (n >= questions.length) {
                return quizEnd();
            }
            questionPrint(n);
        }   
    }
};
var quizEnd = function () {
    // timer is the score
    score = timer;
    //eliminate question answers elements
    a1.remove();
    a2.remove();
    a3.remove();
    a4.remove();
    // change question content to all done!
    questionEl.textContent = "All done!"
    // create other final page elements 
    finalEl.innerHTML =  "<p>Your final score is " + score + "</p><div class='form-line' id='initials-input'><p>Enter initials:</p><input type='text' name='initials' id='initials' placeholder='Your initials'/><button class='submit-btn'>Submit</button>";
};
// high score handler function
var highScoreHandler = function(event) {
    event.preventDefault();
    var initialsInput = document.querySelector("input[name='initials']").value;
    // check if value is empty string
    if (!initialsInput) {
        alert("You need to enter initials to continue!")
        return false;    
    }
    if (initialsInput.length > 4) {
        document.getElementById("initials").value = '';
        alert("Initials can't be longer than 4 characters");
        return false;
    }
    var savedHighScores = localStorage.getItem("JSQscores");
    var scoreDataObj = {
        name: initialsInput,
        score: score
    }
    if (!savedHighScores) {
        highScores.push(scoreDataObj);
        saveHighScores();
        clearAll();
        return highScoresView();
    }
    else {
        highScores = JSON.parse(savedHighScores);
        //checking if there is saved data but it was cleared
        if (highScores.length < 1) {
            highScores.push(scoreDataObj);
            saveHighScores();
            clearAll();
            return highScoresView();
        }
        for (i = 0; i < highScores.length; i++) {
            if (highScores[i].score < scoreDataObj.score) {
                highScores.splice(i, 0, scoreDataObj);
                highScores = highScores.slice(0,5);
                saveHighScores();
                break;
            }
            else if (i === (highScores.length - 1)) {
                highScores.push(scoreDataObj);
                highScores = highScores.slice(0,5);
                saveHighScores();
                break;
            }
        }
    }
    clearAll();
    highScoresView ();
};
// function to save high scores
var saveHighScores = function() {
    localStorage.setItem("JSQscores", JSON.stringify(highScores));
};
// function to prepare window from final score to high score view
var clearAll = function() {
    highScoreEl.innerHTML = "";
    feedbackEl.innerHTML = "";
    startQuizEl.innerHTML = "";
    answersEl.innerHTML = "";
    finalEl.innerHTML ="";
    titleEl.innerHTML ="";
    btnDivEl.innerHTML = "";
    return false;
};
// high scores view function
var highScoresView = function() {
    // read high scores from localstorage
    var savedHighScores = localStorage.getItem("JSQscores");
    highScores = JSON.parse(savedHighScores);
    // create element for title
    questionEl = document.createElement("h2");
    questionEl.id = "question";
    questionEl.textContent = "High scores"
    titleEl.appendChild(questionEl);
    // create high scores elements
    for (i = 0; i < highScores.length; i++) {
        var scoreEl = document.createElement("h3");
        scoreEl.textContent = (i+1) + ". " + highScores[i].name + " - " + highScores[i].score;
        highScoreEl.appendChild(scoreEl);
    }
    // if there is not high scores saved or high score was cleared
    if ((!highScores) || (highScores.length < 1)) {
        var scoreEl = document.createElement("h3");
        scoreEl.textContent = "No high scores saved"
        highScoreEl.appendChild(scoreEl);
    }

    // create element for buttons
    btnDivEl.innerHTML = "<button type='button' class='score-btn' id='back'>Go back</button><button type='button' class='score-btn' id='clear'>Clear high scores</button>";  
};
var backOrClear = function(event) {
    // Clear high scores was clicked
    if (event.target.matches("#clear")) {
        highScores = [];
        saveHighScores();
        clearAll();
        highScoresView();
    }
    // Go back button was clicked
    if (event.target.matches("#back")) {
        clearAll();
        initialScreen();
    }

    


};













// click lisenter filter to make sure it was start button clicked
var clickFilter = function(event) {
    // start quiz button was clicked
    if (event.target.matches(".start-btn")) {
        // start timer and quiz
        timerStart();
        quizStart();
    }
    else {
        return false;
    }
};
// timer function
var timerStart = function () {
    timer = 75;
    timerEl.innerHTML = timer;
    var t = setInterval(function() {
        if ((timer <= 0) || (n >= questions.length))     {
            clearInterval(t);
            timer = 0;
            timerEl.innerHTML = timer;
            quizEnd();
        }
        if (n < questions.length) {
            timer -=1;
        }
        timerEl.innerHTML = timer; 
    }, 1000);
    timer = 75;
};

// event listeners


//go back or clear high score
btnDivEl.addEventListener("click", backOrClear);

// initials submit
finalEl.addEventListener("submit", highScoreHandler);
// quesiton answered
answersEl.addEventListener("click", answerSequence);
// start quiz button
startQuizEl.addEventListener("click", clickFilter);


initialScreen();