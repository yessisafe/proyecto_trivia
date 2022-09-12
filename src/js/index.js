

const url = "https://opentdb.com/api.php?amount=20&difficulty=medium"

const d = document;
const question = d.getElementById('question');
const options = d.getElementById('options')
const _correctScore = d.getElementById('correct-score');
const _totalQuestion = d.getElementById('total-question');
const checkBtn = d.getElementById('checkAnswer')
const playAgainBtn = d.getElementById('play-again')
const result = d.getElementById('result')
const spinner = d.getElementById('spinner')


const events = () => {
    checkBtn.addEventListener('click', checkAnswer)
    playAgainBtn.addEventListener('click', restartQuiz)
}


let correctAnswer = "", correctScore = askedCount = 0, totalQuestion = 10;

d.addEventListener("DOMContentLoaded",() => {
    events();
    fetchTrivia1();
    _totalQuestion.textContent = totalQuestion;
    _correctScore.textContent = correctScore;  

})


const fetchTrivia1 = async () => {
  const response = await fetch(url)
  const data = await response.json()
  console.log(data);
  result.innerHTML= "";
  spinner.style.display = "none"
  renderInfo(data.results[0]);
  

}



const renderInfo = (data) => {
      
  checkBtn.disabled = false;
  correctAnswer = data.correct_answer;
  let incorrectAnswer = data.incorrect_answers;
  let optionsList = incorrectAnswer;
  optionsList.splice(Math.floor(Math.random() * (incorrectAnswer.length + 1)), 0, correctAnswer);
  category.innerHTML = `${data.category}`
  question.innerHTML = `${data.question} `
  options.innerHTML = `
        ${optionsList.map((option, index) => `
            <li> ${index + 1}. <span>${option}</span> </li>
        `).join('')}
    `;
    
    selectOption()
}



const selectOption = () =>{
    options.querySelectorAll('li').forEach((option) =>{
        option.addEventListener('click', () => {
            if(options.querySelector('.selected')){
                const activeOption = options.querySelector('.selected')
                activeOption.classList.remove('selected')
            }
            option.classList.add('selected');
        })
    })
    console.log(correctAnswer);
}

const checkAnswer = () => {
    
    checkBtn.disabled = true;
    if(options.querySelector('.selected')){
        let selectedAnswer = options.querySelector('.selected span').textContent;
        if(selectedAnswer.trim() == HTMLDecode(correctAnswer)){
            
            correctScore++;
            
            
            result.innerHTML = `<p><i class = "fas fa-check"></i>Correct Answer!</p>`;
        }else{
            result.innerHTML = `<p><i class = "fas fa-times"></i>Incorrect Answer!</p> <small><b>Correct Answer: </b>${correctAnswer}</small>`;
        }
        checkCount();
         
    }else{
        result.innerHTML = `<p><i class = "fas fa-question"></i>Please select an option!</p>`;
        checkBtn.disabled = false;
    }
    
}

function HTMLDecode(textString) {
    let doc = new DOMParser().parseFromString(textString, "text/html");
    return doc.documentElement.textContent;
}


const checkCount = () => {
    
    askedCount++;
    setCount();
    if(askedCount == totalQuestion){
        
        result.innerHTML += `<p>Your score is ${correctScore}.</p>`
        playAgainBtn.style.display = "block";
        checkBtn.style.display = "none";
    }else{
        setTimeout(() => {
            fetchTrivia1();
            
        }, 300)
    }
}

const setCount = () => {
    _totalQuestion.textContent = totalQuestion;
    _correctScore.textContent = correctScore;
}

const restartQuiz = () => {
    spinner.style.display = "block" 
    correctScore = askedCount = 0;
    playAgainBtn.style.display = "none";
    checkBtn.style.display = "block";
    checkBtn.disabled = false;
    setCount();
    fetchTrivia1()

}