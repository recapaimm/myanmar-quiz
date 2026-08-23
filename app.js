// ========================================
// MYANMAR QUIZ GAME
// 15 SECONDS PER QUESTION
// ========================================


// ----------------------------------------
// CATEGORIES
// ----------------------------------------

const categories = [
  ["🧠", "အထွေထွေဗဟုသုတ"],
  ["🇲🇲", "မြန်မာ့အကြောင်း"],
  ["🌍", "ကမ္ဘာ့ဗဟုသုတ"],
  ["🔬", "သိပ္ပံနှင့်သဘာဝ"],
  ["📚", "ပညာရေး"],
  ["⚽", "အားကစား"],
  ["🎬", "Entertainment"],
  ["🧩", "ဉာဏ်စမ်း"],
  ["😂", "Fun Quiz"],
  ["🧒", "Kids Zone"]
];


// ----------------------------------------
// QUIZ VARIABLES
// ----------------------------------------

let currentCategory = "";

let questions = [];

let currentQuestion = 0;

let timeLeft = 15;

let timer = null;

let answered = false;


// ----------------------------------------
// SHOW CATEGORY PAGE
// ----------------------------------------

function showCategories() {

  clearInterval(timer);

  document.querySelector(".hero").style.display = "none";

  document.querySelector(".category-section").style.display = "block";

  document.querySelector(".quiz-section").style.display = "none";

  document.querySelector(".finished").style.display = "none";

  renderCategories();
}


// ----------------------------------------
// DISPLAY CATEGORIES
// ----------------------------------------

function renderCategories() {

  const categoryBox =
    document.getElementById("categories");


  categoryBox.innerHTML = "";


  categories.forEach(category => {

    const icon = category[0];

    const name = category[1];

    const questionCount =
      quizData[name]?.length || 0;


    const button =
      document.createElement("button");


    button.className = "category";


    button.innerHTML = `

      <div class="category-icon">
        ${icon}
      </div>

      <b>${name}</b>

      <small>
        ${questionCount} Questions
      </small>

    `;


    button.addEventListener("click", () => {

      startQuiz(name);

    });


    categoryBox.appendChild(button);

  });

}


// ----------------------------------------
// START QUIZ
// ----------------------------------------

function startQuiz(category) {

  // Check questions
  if (
    !quizData[category] ||
    quizData[category].length === 0
  ) {

    alert(
      "ဒီ Category မှာ မေးခွန်းမရှိသေးပါဘူး။"
    );

    return;
  }


  // Save category
  currentCategory = category;


  // Copy questions
  questions = [...quizData[category]];


  // Randomize
  shuffleQuestions();


  // Reset
  currentQuestion = 0;

  answered = false;

  timeLeft = 15;


  // Hide other screens
  document.querySelector(".hero").style.display = "none";

  document.querySelector(".category-section").style.display = "none";

  document.querySelector(".finished").style.display = "none";


  // Show quiz
  document.querySelector(".quiz-section").style.display = "block";


  // Show first question
  showQuestion();

}


// ----------------------------------------
// SHUFFLE QUESTIONS
// ----------------------------------------

function shuffleQuestions() {

  for (
    let i = questions.length - 1;
    i > 0;
    i--
  ) {

    const random =
      Math.floor(Math.random() * (i + 1));


    const temp =
      questions[i];


    questions[i] =
      questions[random];


    questions[random] =
      temp;

  }

}


// ----------------------------------------
// SHOW QUESTION
// ----------------------------------------

function showQuestion() {

  // Stop old timer
  clearInterval(timer);


  // Reset timer
  timeLeft = 15;


  // Reset answer state
  answered = false;


  // Get current question
  const question =
    questions[currentQuestion];


  // Question number
  document.getElementById(
    "question-number"
  ).textContent =
    `Question ${currentQuestion + 1}`;


  // Question count
  document.getElementById(
    "question-count"
  ).textContent =
    `${currentQuestion + 1} / ${questions.length}`;


  // Question text
  document.getElementById(
    "question"
  ).textContent =
    question.q;


  // Message reset
  document.getElementById(
    "quiz-message"
  ).textContent =
    "";


  // Hide next button
  document.getElementById(
    "next-button"
  ).style.display =
    "none";


  // Progress
  const progress =
    (
      currentQuestion /
      questions.length
    ) * 100;


  document.getElementById(
    "progress-bar"
  ).style.width =
    `${progress}%`;


  // Answers container
  const answers =
    document.getElementById("answers");


  answers.innerHTML = "";


  // Create answers
  question.a.forEach(
    (answer, index) => {

      const button =
        document.createElement("button");


      button.className =
        "answer";


      button.innerHTML = `

        <span class="answer-letter">
          ${String.fromCharCode(65 + index)}
        </span>

        ${answer}

      `;


      button.addEventListener(
        "click",
        () => {

          selectAnswer(
            index,
            button
          );

        }
      );


      answers.appendChild(button);

    }
  );


  // Start 15 second timer
  startTimer();

}


// ----------------------------------------
// START 15 SECOND TIMER
// ----------------------------------------

function startTimer() {

  clearInterval(timer);


  timeLeft = 15;


  updateTimer();


  timer = setInterval(() => {

    timeLeft--;


    updateTimer();


    // Time finished
    if (timeLeft <= 0) {

      clearInterval(timer);


      timeUp();

    }

  }, 1000);

}


// ----------------------------------------
// UPDATE TIMER
// ----------------------------------------

function updateTimer() {

  const timerElement =
    document.getElementById("timer");


  timerElement.textContent =
    timeLeft;


  // Normal
  if (timeLeft > 5) {

    timerElement.style.borderColor =
      "#8b5cf6";

    timerElement.style.color =
      "#ffffff";

  }


  // Warning
  else if (timeLeft > 0) {

    timerElement.style.borderColor =
      "#ff5573";

    timerElement.style.color =
      "#ff5573";

  }


  // Zero
  else {

    timerElement.style.borderColor =
      "#ff5573";

    timerElement.style.color =
      "#ff5573";

  }

}


// ----------------------------------------
// SELECT ANSWER
// ----------------------------------------

function selectAnswer(
  selectedIndex,
  selectedButton
) {

  // Already answered
  if (answered) {
    return;
  }


  // Stop timer
  clearInterval(timer);


  // Mark answered
  answered = true;


  // Current question
  const question =
    questions[currentQuestion];


  // All answer buttons
  const allAnswers =
    document.querySelectorAll(
      ".answer"
    );


  // Disable all
  allAnswers.forEach(
    button => {

      button.classList.add(
        "disabled"
      );

    }
  );


  // Correct answer
  if (
    selectedIndex === question.c
  ) {

    selectedButton.classList.add(
      "correct"
    );


    document.getElementById(
      "quiz-message"
    ).textContent =
      "✅ အဖြေမှန်ပါတယ်!";

  }


  // Wrong answer
  else {

    selectedButton.classList.add(
      "wrong"
    );


    allAnswers[
      question.c
    ].classList.add(
      "correct"
    );


    document.getElementById(
      "quiz-message"
    ).textContent =
      `❌ အဖြေမှားပါတယ်။ မှန်တဲ့အဖြေက ${question.a[question.c]} ပါ။`;

  }


  // Show next
  document.getElementById(
    "next-button"
  ).style.display =
    "block";

}


// ----------------------------------------
// TIME UP
// ----------------------------------------

function timeUp() {

  // If already answered
  if (answered) {
    return;
  }


  answered = true;


  const question =
    questions[currentQuestion];


  const allAnswers =
    document.querySelectorAll(
      ".answer"
    );


  // Disable answers
  allAnswers.forEach(
    button => {

      button.classList.add(
        "disabled"
      );

    }
  );


  // Show correct answer
  allAnswers[
    question.c
  ].classList.add(
    "correct"
  );


  // Message
  document.getElementById(
    "quiz-message"
  ).textContent =
    `⏰ အချိန်ကုန်သွားပါပြီ။ မှန်တဲ့အဖြေက ${question.a[question.c]} ပါ။`;


  // Show next
  document.getElementById(
    "next-button"
  ).style.display =
    "block";

}


// ----------------------------------------
// NEXT QUESTION
// ----------------------------------------

function nextQuestion() {

  clearInterval(timer);


  currentQuestion++;


  // Questions finished
  if (
    currentQuestion >= questions.length
  ) {

    currentQuestion = 0;

    shuffleQuestions();

  }


  showQuestion();

}


// ----------------------------------------
// FINISH QUIZ
// ----------------------------------------

function finishQuiz() {

  clearInterval(timer);


  document.querySelector(
    ".quiz-section"
  ).style.display =
    "none";


  document.querySelector(
    ".finished"
  ).style.display =
    "block";

}


// ----------------------------------------
// GO HOME
// ----------------------------------------

function goHome() {

  clearInterval(timer);


  document.querySelector(
    ".hero"
  ).style.display =
    "block";


  document.querySelector(
    ".category-section"
  ).style.display =
    "none";


  document.querySelector(
    ".quiz-section"
  ).style.display =
    "none";


  document.querySelector(
    ".finished"
  ).style.display =
    "none";

}


// ----------------------------------------
// INITIAL LOAD
// ----------------------------------------

renderCategories();
