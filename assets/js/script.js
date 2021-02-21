var titleEl = document.querySelector("#title-content");
var startQuizEl = document.querySelector("#start-quiz"); 
var answersEl = document.querySelector("#answers");
var feedbackEl = document.querySelector(".answer-feedback");
var finalEl = document.querySelector("#final-score");
var submitEl = document.querySelector("#initials-input");
var timerEl = document.querySelector("#timer-count");
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
    questionEl.textContent = "ldfkhjklsdhflksjdfsjdflkjlfkjklajsklfjasfa asldkjalksdjlkj asdlkajsd alsjkd alsdj alskdja lsdj"
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
                quizEnd();
            }
            questionPrint(n);
        }   
    }
};
var quizEnd = function () {
    // timer is the score
    var score = timer;
    //eliminate question answers elements
    a1.remove();
    a2.remove();
    a3.remove();
    a4.remove();
    // change question content to all done!
    questionEl.textContent = "All done!"
    // create other final page elements 
    finalEl.innerHTML =  "<p>Your final score is " + score + "</p><div class='form-line' id='initials-input'><p>Enter initials:</p><input type='text' name='initials' placeholder='Your initials'/><button class='submit-btn'>Submit</button>";
};















// click lisenter filter to make sure it was start button clicked
var clickFilter = function(event) {
    var targetEl = event.target;
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
    setInterval(function() {
        if (timer <= 0)  {
            clearInterval(timer = 0);
        }
        if (n < questions.length) {
        timer -=1;
        }
        timerEl.innerHTML = timer;
    }, 1000);
};



answersEl.addEventListener("click", answerSequence);

startQuizEl.addEventListener("click", clickFilter);

initialScreen();