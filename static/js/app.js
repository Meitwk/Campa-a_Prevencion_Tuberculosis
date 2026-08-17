

document.addEventListener('DOMContentLoaded', () => {
  fetch('assets/data/tbc-info.json')
    .then(res => res.json())
    .then(data => {
      renderSintomas(data.sintomas);
      renderMitos(data.mitos);
    })
    .catch(err => console.error("Error al cargar los datos:", err));
});

function renderSintomas(sintomas) {
  const container = document.getElementById('cards-sintomas');
  container.innerHTML = sintomas.map(s => `
    <div class="col-md-4">
      <div class="card h-100 border-0 shadow-sm text-center p-3">
        <i class="${s.icono} display-3 text-dark-teal mb-3"></i>
        <h5 class="fw-bold">${s.titulo}</h5>
        <p class="text-muted">${s.descripcion}</p>
      </div>
    </div>
  `).join('');
}

function renderMitos(mitos) {
  const container = document.getElementById('mitos-container');
  container.innerHTML = mitos.map(m => `
    <div class="col-md-5 mb-3">
      <div class="flip-card" onclick="this.classList.toggle('flipped')">
        <div class="flip-card-inner">
          <div class="flip-card-front shadow-sm">
            <h5 class="fw-bold text-dark-teal">${m.mito}</h5>
          </div>
          <div class="flip-card-back shadow-sm">
            <p class="m-0">${m.realidad}</p>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}