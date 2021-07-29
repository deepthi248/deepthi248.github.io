//getting all the req elements
//stratQuiz
const start_quiz = document.querySelector('.startQuiz');
//Info page 
const infoBox = document.querySelector('.info_box');
const exitQuiz = infoBox.querySelector('.Exit_Quiz');
const continueQuiz = infoBox.querySelector('.continue');
//Quiz Page
const quizBox = document.querySelector('.quiz_box');
const nextButton = document.querySelector('.NQ');
const footerSpan = document.querySelector('.total_quesitons')
const option_list = document.querySelector('.options');
//timer
const timer_time = document.querySelector('.timer_seconds');
const time_Line = document.querySelector('.time_line');
//Icons
let tick_icon = '<div class="icon tick"> <i class="bx bx-check"></i></div';
let cross_icon = '<div class="icon cross"> <i class="bx bx-x"></i></div>';

//questions  Display
let que_count = 0;
let counter;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

const resultBox = document.querySelector('.result_box')
const restartQuiz = document.querySelector('.replay')
const exit_result = document.querySelector('.Exit_result');
const score_text = resultBox.querySelector('.score_text');
score_text.innerHTML = "<p>this is deepthi</p>"
console.log(score_text, "score_text")



function init() {
    quizBox.classList.add('deactivate');
}

init();
//if start quiz buttin is clicked
start_quiz.addEventListener('click', () => {
    infoBox.classList.add('acitvate');
});

//Exiting Quiz 
exitQuiz.addEventListener('click', () => {
    infoBox.classList.remove('acitvate');
});

//continue Quiz 
continueQuiz.addEventListener('click', () => {
    infoBox.classList.remove('acitvate')
    quizBox.classList.remove('deactivate');
    quizBox.classList.add('activateQuiz');
    showQuestions(0);
    startTimer(15);
    startTimerLine(0);
});

nextButton.onclick = () => {
    console.log(que_count);
    if (que_count == questions.length - 1) {
        quizBox.classList.remove('activateQuiz');
        quizBox.classList.toggle('deactivate');
        resultBox.classList.add('activateResult')
        nextButton.style.display = "none";

    }
    if (que_count < questions.length) {
        console.log(que_count, questions.length)
        que_count++;
        showQuestions(que_count);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        nextButton.style.display = "none";

    }

};



//getting questions and options from array

function showQuestions(index) {
    if (index < questions.length) {
        //adding question 
        const questionText = document.querySelector('.question');
        let innerQuestionText;

        innerQuestionText = '<span>' + questions[index].num + '.' + questions[index].question + '</span>';
        questionText.innerHTML = innerQuestionText;
        //adding options


        let optionTag = `<div class="option"> <span>${questions[index].options[0]}</span></div>
    <div class="option"> <span>${questions[index].options[1]}</span></div>
    <div class="option"> <span>${questions[index].options[2]}</span></div>
    <div class="option"> <span>${questions[index].options[3]}</span></div>
    `

        let innerHTMLSpan = `<span><p> ${questions[index].num} </p>of<p> ${questions.length}</p> Questions</span>`
        footerSpan.innerHTML = innerHTMLSpan;

        option_list.innerHTML = optionTag;

        const option = option_list.querySelectorAll(".option");
        for (let i = 0; i < option.length; i++) {
            option[i].setAttribute("onclick", "optionSelected(this)");
        }
    }

};

function optionSelected(answerByUser) {
    clearInterval(counterLine);
    let userAns = answerByUser.textContent;
    let allOptions = option_list.children.length;
    clearInterval(counter);
    let correctAnswer = " " + questions[que_count].answer;
    console.log(typeof(correctAnswer));
    if (userAns == correctAnswer) {
        userScore += 1;
        console.log("userscore", userScore)
        answerByUser.classList.add("correct");
        answerByUser.insertAdjacentHTML("beforeEnd", tick_icon);
    } else {
        answerByUser.classList.add("wrong");
        //if answer selected is incorrect then select the correct answer
        for (let i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent == correctAnswer) {
                option_list.children[i].setAttribute('class', 'option correct');
                answerByUser.insertAdjacentHTML("beforeEnd", cross_icon);
            }
        }
    }
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add('disabled');
    }
    nextButton.style.display = "block";


}



function startTimer(time) {
    counter = setInterval(timer, 1000);

    function timer() {
        timer_time.textContent = time;
        time--;

        if (time <= 0) {
            clearInterval(0);
            timer_time.textContent = "00";
        }


    }

}



function startTimerLine(time) {
    counterLine = setInterval(timer, 29);

    function timer() {
        time += 1;
        time_Line.style.width = time + "px";


        if (time > 549) {
            clearInterval(counterLine);

        }


    }

}


function showResultBox() {

    resultBox.classList.add('activateResult');


}

exit_result.onclick = () => {
    resultBox.classList.remove('activateResult');
    start_quiz.classList.add('acitvate');
    window.location.reload();
}

restartQuiz.onclick = () => {
    resultBox.classList.remove('activateResult');
    infoBox.classList.add('acitvate');
}

if (userScore <= 3) {
    text_score = `<span> and sorry you got only<p>${userScore} </p> out of <p>5 </p></span>`
} else
    text_score = `<span> and Hurray!! you scored <p>${userScore} </p> out of <p>5 </p></span>`
score_text.innerHTML = text_score;