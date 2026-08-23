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


let currentCategory = "";
let questions = [];
let currentQuestion = 0;

let timeLeft = 60;
let timer = null;

let answered = false;


/* =========================
   SHOW CATEGORIES
========================= */

function showCategories() {

  document.querySelector(".hero").style.display = "none";

  document.querySelector(".category-section").style.display = "block";

  document.querySelector(".quiz-section").style.display = "none";

  document.querySelector(".finished").style.display = "none";

  renderCategories();
}


/* =========================
   RENDER CATEGORIES
========================= */

function renderCategories() {

  const categoryBox =
    document.getElementById("categories");

  categoryBox.innerHTML = categories.map(category => {

    const icon = category[0];

    const name = category[1];

    const questionCount =
      quizData[name]?.length || 0;

    return `

      <button
        class="category"
        onclick="startQuiz('${name}')"
      >

        <div class="category-icon">
          ${icon}
        </div>

        <b>${name}</b>

        <small>
          ${questionCount} Questions
        </small>

      </button>

    `;

  }).join("");
}


/* =========================
   START QUIZ
========================= */

function startQuiz(category) {

  if (!quizData[category] || quizData[category].length === 0) {

    alert("ဒီ Category မှာ မေးခွန်းမရှိသေးပါဘူး။");

    return;
  }


  currentCategory = category;

  questions = [...quizData[category]];

  shuffleQuestions();

  currentQuestion = 0;

  timeLeft = 60;

  answered = false;


  document.querySelector(".hero").style.display = "none";

  document.querySelector(".category-section").style.display = "none";

  document.querySelector(".quiz-section").style.display = "block";

  document.querySelector(".finished").style.display = "none";


  startTimer();

  showQuestion();
}


/* =========================
   SHUFFLE QUESTIONS
========================= */

function shuffleQuestions() {

  for (
    let i = questions.length - 1;
    i > 0;
    i--
  ) {

    const j =
      Math.floor(Math.random() * (i + 1));

    [
      questions[i],
      questions[j]
    ] =
    [
      questions[j],
      questions[i]
    ];
  }
}


/* =========================
   SHOW QUESTION
========================= */

function showQuestion() {

  if (questions.length === 0) {
    return;
  }


  const question =
    questions[currentQuestion];


  answered = false;


  document.getElementById("question-number").textContent =
    `Question ${currentQuestion + 1}`;


  document.getElementById("question-count").textContent =
    `${currentQuestion + 1} / ${questions.length}`;


  document.getElementById("question").textContent =
    question.q;


  document.getElementById("quiz-message").textContent =
    "";


  document.getElementById("next-button").style.display =
    "none";


  const progress =
    ((currentQuestion) / questions.length) * 100;


  document.getElementById("progress-bar").style.width =
    `${progress}%`;


  const answers =
    document.getElementById("answers");


  answers.innerHTML = "";


  question.a.forEach((answer, index) => {

    const button =
      document.createElement("button");


    button.className = "answer";


    button.innerHTML = `

      <span class="answer-letter">
        ${String.fromCharCode(65 + index)}
      </span>

      ${answer}

    `;


    button.onclick = () =>
      selectAnswer(index, button);


    answers.appendChild(button);

  });

}


/* =========================
   SELECT ANSWER
========================= */

function selectAnswer(index, button) {

  if (answered) {
    return;
  }


  answered = true;


  const question =
    questions[currentQuestion];


  const allAnswers =
    document.querySelectorAll(".answer");


  allAnswers.forEach(answer => {

    answer.classList.add("disabled");

  });


  if (index === question.c) {

    button.classList.add("correct");

    document.getElementById("quiz-message").textContent =
      "✅ အဖြေမှန်ပါတယ်!";

  } else {

    button.classList.add("wrong");

    allAnswers[question.c].classList.add("correct");

    document.getElementById("quiz-message").textContent =
      `❌ အဖြေမှားပါတယ်။ မှန်တဲ့အဖြေက ${question.a[question.c]} ပါ။`;

  }


  document.getElementById("next-button").style.display =
    "block";
}


/* =========================
   NEXT QUESTION
========================= */

function nextQuestion() {

  currentQuestion++;


  if (currentQuestion >= questions.length) {

    currentQuestion = 0;

    shuffleQuestions();

  }


  showQuestion();
}


/* =========================
   TIMER
========================= */

function startTimer() {

  clearInterval(timer);


  updateTimer();


  timer = setInterval(() => {

    timeLeft--;


    updateTimer();


    if (timeLeft <= 0) {

      clearInterval(timer);

      finishQuiz();

    }

  }, 1000);

}


/* =========================
   UPDATE TIMER
========================= */

function updateTimer() {

  document.getElementById("timer").textContent =
    timeLeft;


  if (timeLeft <= 10) {

    document.getElementById("timer").style.borderColor =
      "#ff5573";

  } else {

    document.getElementById("timer").style.borderColor =
      "#8b5cf6";

  }

}


/* =========================
   FINISH QUIZ
========================= */

function finishQuiz() {

  clearInterval(timer);


  document.querySelector(".quiz-section").style.display =
    "none";


  document.querySelector(".finished").style.display =
    "block";

}


/* =========================
   HOME
========================= */

function goHome() {

  clearInterval(timer);


  document.querySelector(".hero").style.display =
    "block";


  document.querySelector(".category-section").style.display =
    "none";


  document.querySelector(".quiz-section").style.display =
    "none";


  document.querySelector(".finished").style.display =
    "none";

}


/* =========================
   INITIAL
========================= */

renderCategories();
