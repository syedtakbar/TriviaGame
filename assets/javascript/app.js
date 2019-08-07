    const beatlesTriviaGame = {

        domDivStartButton: document.getElementById("start-div-button"),     
        domDivTriviaQuestion: document.getElementById("currentquestion-text"),     
        domDivAnser: document.getElementById("ansers-area"),   

        domTimerText: document.getElementById("timer-text"),

        questionIndex: 0,
        triviaQuestion: "",
        songUrl: "",
        
        triviaStartTimeOutFunc: "",
        questonIntervalFunc: "",
        questonIntervalVal: 1000,

        questionTimerVal: 20,

        answers: [],
        answer: "",

        
        isGameOver: false,
        isGameStarted: false,
        isGameWon: false, 
        
        ResetMessage: function  () {

            this.questionTimerVal = 20;

            this.isGameOver = false;
            this.isGameStarted  = false;
            this.isGameWon = false;
            this.isTimerRunning = false;

            this.triviaQuestion = "";
            this.songUrl = ""

            this.domDivStartButton.display = "block";
            
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
        
            this.domDivAnser.style.display = "block";
            for (let i = 0; i < possibleAnswers.length; i++)
            {
                const titleBtnElem = document.createElement("button");
                const pElem = document.createElement("p");

                titleBtnElem.setAttribute("class", "btn btn-outline-info btn-lg m-2 p-2");                
                
                pElem.setAttribute("class", "answer-button m-2 p-2 text-left"); 
                pElem.setAttribute("id", "pElement" + i);                  
                pElem.setAttribute("value", answer);       
                
                pElem.textContent = possibleAnswers[i];
                // pElem.innerHTML = anwer;
                
                titleBtnElem.append(pElem);

                this.domDivAnser.appendChild(titleBtnElem);
                                               
            }
        },

        genQuestions:  function() {
            
            this.triviaQuestion = this.triviaQuestions[this.questionIndex].question;
            
            this.songUrl = this.triviaQuestions[this.questionIndex].url;

            this.answers = this.triviaQuestions[this.questionIndex].possibleAnswers;

            this.answer = this.triviaQuestions[this.questionIndex].answer;

            this.domDivAnser.innerHTML = "";

            this.genAnswerBoxes (this.answers, this.answer);
            
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
            
            
            this.domTimerText.innerHTML = "<h6> Time ramaining: " + ("00" + this.questionTimerVal).slice(-2) + "</h6>";
            this.questonIntervalFunc = setInterval(this.timer.bind(beatlesTriviaGame), this.questonIntervalVal);
            
        },

        timer:  function () {

            if (this.questionTimerVal <= 0)
            {              
                clearInterval(this.questonIntervalFunc );
                this.questionIndex++;
                this.ResetMessage();
                this.genQuestions();
                this.startTriviaQuestion();
                return;
            }

            this.questionTimerVal--;
          
            console.log("timer-function " + this.questionTimerVal);            

            this.domTimerText.innerHTML = "<h6> Time ramaining: " + ("00" + this.questionTimerVal).slice(-2) + "</h6>";

        }
    };


    window.onload = function(){
        beatlesTriviaGame.ResetMessage();       
    }

    document.getElementById("start-button").addEventListener("click", 
                beatlesTriviaGame.startTrivia.bind(beatlesTriviaGame));

    document.addEventListener('click',function(e){

    if (e.target && e.target.className === "answer-button m-2 p-2 text-left") {

            console.log("answer button clicked " + e.target.innerText);

            const answerVal = document.getElementById(e.target.id);
            const answerText = answerVal.getAttribute("value");
            if (answerVal.innerText === answerText) {
                console.log("correct answer: " + answerText);
            }
            else
            {
                console.log("incorrect answer: " + answerVal.innerText + " correct answer would be " + answerText);
            }
        } 
    });  