// DOM elements
var highScoreLinkEl = document.querySelector("#high-scores-link");
var timerEl = document.querySelector("#timer");
var titleEl = document.querySelector("#title-content");
var startQuizEl = document.querySelector("#start-quiz"); 
var answersEl = document.querySelector("#answers");
var feedbackEl = document.querySelector(".answer-feedback");
var finalEl = document.querySelector("#final-score");
var submitEl = document.querySelector("#initials-input");
var highScoreEl = document.querySelector("#high-scores");
var btnDivEl = document.querySelector(".score-btns");

//Global variables
var highScores = [];
var score = 0;
var timer = 75;
var n = 0;

// Questions variable
var questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        a1: "javascript",
        a2: "js",
        a3: "scripting",
        a4: "script",
        ca: "answer4"
    },
    {
        question: "Where is the correct place to insert a JavaScript?",
        a1: "<body> section",
        a2: "<head> section",
        a3: "Both",
        a4: "None",
        ca: "answer3"
    },
    {
        question: "How do you write 'Hello' in an alert box?",
        a1: "msgBox('Hello')",
        a2: "alertB('Hellow')",
        a3: "alert('Hello')",
        a4: "msg('Hello')",
        ca: "answer3"
    },
    {
        question: "How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
        a1: "if i=!5 then",
        a2: "if (i!=5)",
        a3: "if i<>5",
        a4: "if (i<>5)",
        ca: "answer2"
    },
    {
        question: "How does a WHILE loop start?",
        a1: "while i=1 to 10",
        a2: "while (i<=1-;i++)",
        a3: "while (i<=10)",
        a4: "while 20<i<1",
        ca: "answer3"
    },
    {
        question: "How does a FOR loop start?",
        a1: "for i=1 to 5",
        a2: "for (i=0;i<5;i++)",
        a3: "for (i=0;i<=10)",
        a4: "for (i<=5;i++)",
        ca: "answer2"
    },
    {
        question: "How do you add a comment in JavaScript?",
        a1: "<!--comment-->",
        a2: "'comment'",
        a3: "//comment",
        a4: "c--comment",
        ca: "answer3"
    },
    {
        question: "Which event occurs when the user clicks on a HTML element?",
        a1: "onchange",
        a2: "onmouseclick",
        a3: "onmouseover",
        a4: "onclick",
        ca: "answer4"
    },
    {
    question: "How do you declare a JavaScript variable?",
        a1: "varia carName",
        a2: "v carName",
        a3: "var carName",
        a4: "j carName",
        ca: "answer3"
    }
];

//initial screen function
var initialScreen = function() {
    //create high scores view and timer
    highScoreLinkEl.innerHTML = "<p>View high scores</p>";
    timer = 75;
    timerEl.innerHTML = "<p>Time: " + timer + "</p>";

    // create Title "Coding Quiz Challenge"
    var initialTitle = document.createElement("h1");
    initialTitle.id = "initial-title";
    initialTitle.textContent = "Coding Quiz Challenge";
    titleEl.appendChild(initialTitle);

    // create inital message
    var initialMessage = document.createElement("p");
    initialMessage.id = "initial-message";
    initialMessage.textContent = "Try to answer the following code related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    startQuizEl.appendChild(initialMessage);

    var startBtn = document.createElement("button");
    startBtn.className = "start-btn";
    startBtn.textContent = "Start Quiz";
    startQuizEl.appendChild(startBtn);
};

//quiz start function
var quizStart = function () {
    // remove all initial message elements
    clearAll();
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
    // call question print function for first question
    n = 0;
    questionPrint(n);
};

// question view function
var questionPrint = function(i) {     
    questionEl.textContent = questions[i].question;
    a1.textContent = questions[i].a1;
    a2.textContent = questions[i].a2;
    a3.textContent = questions[i].a3;
    a4.textContent = questions[i].a4;
};

// questions sequence
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
            }, 800);
            n++;
            if (n >= questions.length) {
                return quizEnd();
            }
            questionPrint(n);
        }   
    }
};

// quiz end function
var quizEnd = function () {
    // timer is the score
    score = timer;
    if (score < 0) {
        score = 0;
    }
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

// function to clear all window except time and high scores link
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
    // eliminite high scores link and timer elements
    highScoreLinkEl.innerHTML = "";
    timerEl.innerHTML = "";

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

// filter between back or clear score buttons
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

// view high scores link
var highScoreLink = function() {
    // only should work on initial screen when timer is 75
    if (timer === 75) {
        clearAll();
        highScoresView();
    }
    // window alert if high score link is clicked before submiting initials
    else if (n >= questions.length) {
        alert("Unable to view high scores until your initials are submitted, Please submit your initials");
        return false;
    }  
    else {
        return false;
    }
};

// click listener filter to make sure it was start quiz button clicked
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
    var t = setInterval(function() {
        if (timer <= 0)     {
            clearInterval(t);
            timer = 0;
            timerEl.innerHTML = "<p>Time: " + timer + "</p>";
            quizEnd();
        }
        if (n >= questions.length) {
            clearInterval(t);
        }
        if ((n < questions.length) && (timer > 0)) {
        timer -=1;
        }
        timerEl.innerHTML = "<p>Time: " + timer + "</p>";
    }, 1000);
};

// event listeners

//high score link 
highScoreLinkEl.addEventListener("click", highScoreLink);
//go back or clear high score
btnDivEl.addEventListener("click", backOrClear);
// initials submit
finalEl.addEventListener("submit", highScoreHandler);
// quesiton answered
answersEl.addEventListener("click", answerSequence);
// start quiz button
startQuizEl.addEventListener("click", clickFilter);

// initial function called
initialScreen();