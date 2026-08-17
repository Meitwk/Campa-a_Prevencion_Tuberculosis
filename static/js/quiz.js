
const quizData = [
  { q: "¿Cuánto tiempo debe durar la tos para ser sospecha de TBC?", options: ["2 días", "Más de 15 días", "1 mes"], correct: 1 },
  { q: "¿El tratamiento para la TBC en centros de salud públicos es gratuito?", options: ["Sí, 100% gratuito", "No, se paga", "Solo la primera dosis"], correct: 0 }
];

let currentQ = 0;

function initQuiz() {
  const savedScore = localStorage.getItem('tbc_quiz_score');
  if (savedScore) {
    document.getElementById('quiz-body').innerHTML = `
      <div class="alert alert-info">Puntuación previa registrada: <strong>${savedScore}</strong>. 
      <button class="btn btn-sm btn-outline-primary ms-2" onclick="resetQuiz()">Reintentar</button></div>`;
  } else {
    loadQuestion();
  }
}

function loadQuestion() {
  const q = quizData[currentQ];
  document.getElementById('quiz-body').innerHTML = `
    <h5>Pregunta ${currentQ + 1} de ${quizData.length}: ${q.q}</h5>
    <div class="d-grid gap-2 my-3">
      ${q.options.map((opt, i) => `<button class="btn btn-outline-teal text-start" onclick="checkAnswer(${i})">${opt}</button>`).join('')}
    </div>`;
}

function checkAnswer(selected) {
  if (selected === quizData[currentQ].correct) {
    currentQ++;
    if (currentQ < quizData.length) {
      loadQuestion();
    } else {
      localStorage.setItem('tbc_quiz_score', '¡Completado con éxito!');
      document.getElementById('quiz-body').innerHTML = `<div class="alert alert-success">¡Excelente! Has aprendido los conceptos clave sobre la prevención.</div>`;
    }
  } else {
    alert("Respuesta incorrecta. ¡Inténtalo de nuevo!");
  }
}

function resetQuiz() {
  localStorage.removeItem('tbc_quiz_score');
  currentQ = 0;
  loadQuestion();
}

document.addEventListener('DOMContentLoaded', initQuiz);