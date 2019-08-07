    const beatlesTriviaGame = {

        domDivStartButton: document.getElementById("start-div-button"),   
        domDivReStartButton: document.getElementById("restart-div-button"),     
        domDivTriviaQuestion: document.getElementById("currentquestion-text"),     
        domDivAnwser: document.getElementById("answers-area"), 
        domDivResult: document.getElementById("result-area"),   
        domSummary: document.getElementById('summary-area'),
        domTimerText: document.getElementById("timer-text"),

        questionIndex: 0,
        triviaQuestion: "",
        songUrl: "",
        
        triviaStartTimeOutFunc: "",
        questonIntervalFunc: "",
        questonIntervalVal: 1000,

        questionTimerVal: 3,

        answers: [],
        triviaAnswer: "",

        numOfCorrect: 0,
        numOfWrong: 0,
        numOfUnAnswered: 0,

        isAnswerCorrect: false,
        isTimesUp: false,

        
        ResetMessage: function  () {

            this.questionTimerVal = 3;

            this.isAnswerCorrect = false;
            this.isTimerRunning = false;
            this.isTimesUp = true;

            this.triviaQuestion = "";
            this.songUrl = ""
            this.triviaAnswer = "";

            this.domDivResult.innerHTML = "";
            this.domSummary.innerHTML = "";  
            this.domDivReStartButton.style.display = "none";            
        },

        RestartGame: function  () {

            this.questionTimerVal = 3;

            this.isAnswerCorrect = false;
            this.isTimerRunning = false;
            this.isTimesUp = true;

            this.triviaQuestion = "";
            this.songUrl = ""
            this.triviaAnswer = "";

            this.domDivResult.innerHTML = "";
            this.domSummary.innerHTML = "";  
            this.domDivReStartButton.style.display = "none";
            this.domDivStartButton.style.display = "none";  

            this.numOfCorrect = 0;
            this.numOfWrong = 0;
            this.numOfUnAnswered = 0;
            this.questionIndex = 0;

            this.startTrivia();
        }, 

        triviaQuestions : 
        [
            { 
              question: "Which of the following songs contributed to the rumor that Paul had died?",
              possibleAnswers: ["Strawberry Fields Forever", "Hey Jude", "Yesterday", "Penny Lane"], 
              url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/HtUH9z_Oey8?controls=0;autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 
              answer: "Strawberry Fields Forever"
            },

            { 
                question: "What Beatles song was written for Mia Farrow's sister?",
                possibleAnswers: ["For No One", "Dear Prudence", "Julia", "Honey Pie"], 
                url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/wQA59IkCF5I?controls=0;autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 
                answer: "Dear Prudence"
            },
            { 
                question: "Which Beatles song inspired the most cover versions?",
                possibleAnswers: ["Yesterday", "A Day In The Life", "I Want To Hold Your Hand", "Hey Jude"], 
                url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/pRTXUZDBBYo?controls=0;autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 
                answer: "Yesterday"
            },
            { 
                question: "What Beatles song was taken from the Broadway musical The Music Man?",
                possibleAnswers: ["Ain't She Sweet", "Till There Was You", "Tomorrow Never Knows", "Your Mother Should Know"], 
                url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/SHAqAO7w8M8?controls=0;autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 
                answer: "Till There Was You"
            },
            { 
                question: "What Beatles song ends with a chord played on three different pianos and a harmonium?",
                possibleAnswers: ["Getting Better", "A Day In The Life", "Fixing A Hole", "Let It Be"], 
                url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/usNsCeOV4GM?controls=0;autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 
                answer: "A Day In The Life"
            }
        ],

        genAnswerBoxes : function (possibleAnswers, answer) {
        
            this.domDivAnwser.style.display = "block";
            for (let i = 0; i < possibleAnswers.length; i++)
            {
                const titleBtnElem = document.createElement("button");
                const pElem = document.createElement("p");

                titleBtnElem.setAttribute("class", "btn btn-outline-info btn-lg m-1 p-1");                
                
                pElem.setAttribute("class", "answer-button m-1 p-1 text-left"); 
                pElem.setAttribute("id", "pElement" + i);                  
                pElem.setAttribute("value", answer);       
                
                pElem.textContent = possibleAnswers[i];
                                
                titleBtnElem.append(pElem);

                this.domDivAnwser.appendChild(titleBtnElem);
                                               
            }
        },

        genQuestions:  function() {
            
            this.triviaQuestion = this.triviaQuestions[this.questionIndex].question; 
            this.songUrl = this.triviaQuestions[this.questionIndex].url;
            this.answers = this.triviaQuestions[this.questionIndex].possibleAnswers;
            this.triviaAnswer = this.triviaQuestions[this.questionIndex].answer;
            this.domDivAnwser.innerHTML = "";
            this.genAnswerBoxes (this.answers, this.triviaAnswer);
            this.domDivTriviaQuestion.innerHTML = "<strong>" + this.triviaQuestion + "</strong>";     
            
        },    
        
        startTrivia : function() {
            
            console.log("startTrivia-function " + this.questonIntervalVal);            
            this.triviaStartTimeOutFunc = setTimeout(this.startTriviaQuestion.bind(beatlesTriviaGame), 1000);   
            this.domDivStartButton.style.display = "none";                  
            this.genQuestions();
            
        },
          
        startTriviaQuestion : function() {
            
            console.log("startTriviaQuestion-function " + this.questonIntervalVal);
            clearInterval(this.triviaStartTimeOutFunc);
             
            this.domTimerText.innerHTML = "<h6> Time ramaining: " + ("00" + this.questionTimerVal).slice(-2) + " seconds</h6>";
            this.questonIntervalFunc = setInterval(this.timer.bind(beatlesTriviaGame), this.questonIntervalVal);
            
        },

        moveNext : function () {

            if (this.questionIndex === this.triviaQuestions.length - 1)
            {
                this.showSummary();
                return;
            }

            clearInterval(this.questonIntervalFunc );
            this.questionIndex++;
            this.ResetMessage();
            this.genQuestions();
            this.startTriviaQuestion();
        },

        timer:  function () {

            if (this.questionTimerVal <= 0)
            {   
                if (this.isTimesUp === true) 
                {
                    this.numOfUnAnswered++;
                    this.showResult();
                    return;
                }

                this.moveNext();
                
            }

            this.questionTimerVal--;
            console.log("timer-function " + this.questionTimerVal);            
            this.domTimerText.innerHTML = "<h6> Time ramaining: " + ("00" + this.questionTimerVal).slice(-2) + " seconds </h6>";
        },

        showResult:  function() {

            this.domDivAnwser.style.display = "none";
            this.domDivResult.style.display = "block";
            
            clearInterval(this.questonIntervalFunc);

            if (this.isTimesUp === true)
            {
                this.domDivResult.innerHTML = "<h4>Your time is up!</h4><p>The answer is: " + this.triviaAnswer + "</p>" ;
            }
            else if (this.isAnswerCorrect === true)
            {
                this.domDivResult.innerHTML = "<h4>Correct!</h4><p>The answer is: " + this.triviaAnswer + "</p>" ;
            }
            else
            {
                this.domDivResult.innerHTML = "<h4>Nope!</h4><p>The correct answer is: " + this.triviaAnswer + "</p>" ;
            }
 
            clearTimeout(this.triviaStartTimeOutFunc);
            this.triviaStartTimeOutFunc = setTimeout(this.moveNext.bind(beatlesTriviaGame), 3000);   
            
        },

        showSummary: function() {

            this.domDivAnwser.style.display = "none";
            this.domDivResult.style.display = "none";
            this.domDivReStartButton.style.display = "block";

            this.domSummary.innerHTML = "<p><h6><strong>Please see the result below:</strong></h6></p>" +
                                        "<h4><p>Number of correct answer : " + this.numOfCorrect + "</p></h4>" +
                                        "<h4><p>Number of wrong answer : " + this.numOfWrong + "</p></h4>" +
                                        "<h4><p>Number of question unanswered : " + this.numOfUnAnswered + "</p></h4>" ;

            this.domSummary.style.display = "block";
            
            
        }
    };


    window.onload = function(){
        beatlesTriviaGame.ResetMessage();       
    }

    document.getElementById("start-button").addEventListener("click", 
                beatlesTriviaGame.startTrivia.bind(beatlesTriviaGame));

    document.getElementById("restart-button").addEventListener("click", 

                beatlesTriviaGame.RestartGame.bind(beatlesTriviaGame));                

    document.addEventListener('click',function(e){

    if (e.target && e.target.className === "answer-button m-1 p-1 text-left") {

            console.log("answer button clicked " + e.target.innerText);
            const answerVal = document.getElementById(e.target.id);
            const answerText = answerVal.getAttribute("value");
            if (answerVal.innerText === answerText) {
                console.log("correct answer: " + answerText);
                beatlesTriviaGame.isAnswerCorrect = true;
                beatlesTriviaGame.numOfCorrect++;
            }
            else
            {
                beatlesTriviaGame.numOfWrong++;
                console.log("incorrect answer: " + answerVal.innerText + " correct answer would be " + answerText);
            }
            beatlesTriviaGame.isTimesUp = false;
            beatlesTriviaGame.showResult();
        } 
    });  