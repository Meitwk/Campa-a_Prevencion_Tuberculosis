JavaScript


const GEMINI_API_KEY = "TU_API_KEY_AQUI"; // Reemplazar con tu llave de Gemini

document.getElementById('send-btn').addEventListener('click', async () => {
  const input = document.getElementById('user-input');
  const query = input.value.trim();
  if (!query) return;

  appendMessage(query, 'user');
  input.value = '';

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Eres un asistente médico preventivo y amigable para jóvenes. Responde de forma clara y concisa a la siguiente consulta sobre prevención o síntomas de tuberculosis: ${query}`
          }]
        }]
      })
    });
    
    const data = await response.json();
    const botReply = data.candidates[0].content.parts[0].text;
    appendMessage(botReply, 'bot');
  } catch (err) {
    appendMessage("Lo siento, ocurrió un problema al conectar con el servidor. Intenta nuevamente.", 'bot');
  }
});

function appendMessage(msg, sender) {
  const chat = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = `alert ${sender === 'user' ? 'alert-primary text-end' : 'alert-secondary'} my-1`;
  div.textContent = msg;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}