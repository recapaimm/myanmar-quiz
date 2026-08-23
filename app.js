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

const app = document.getElementById("app");

const categoryBox = document.getElementById("categories");


function showCategories() {

  document.querySelector(".hero").style.display = "none";

  document.querySelector(".category-section").style.display = "block";

  renderCategories();

}


function renderCategories() {

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


function startQuiz(category) {

  alert(
    `"${category}" Quiz ကို မကြာခင် စတင်ပါမယ်။`
  );

}


function goHome() {

  document.querySelector(".hero").style.display = "block";

  document.querySelector(".category-section").style.display = "none";

  document.querySelector(".quiz-section").style.display = "none";

  document.querySelector(".finished").style.display = "none";

}


function nextQuestion() {

  console.log("Next question");

}


renderCategories();
