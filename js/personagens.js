// personagens.js

import { personagens } from './data/personagensData.js';


const perPage = 6;
let currentPage = 1;
let personagensFiltrados = personagens;

export function renderPage(page) {
  const list = document.getElementById('episode-list');
  const semResultados = document.getElementById('sem-resultados');
  if (!list || !semResultados) return;

  const start = (page - 1) * perPage;
  const items = personagensFiltrados.slice(start, start + perPage);

  if (items.length === 0) {
    list.innerHTML = '';
    semResultados.style.display = 'block';
  } else {
    list.innerHTML = items.map(p => `
      <div class="card">
        <a href="${p.link}">
          <img src="${p.imagem}" alt="${p.nome}" />
          <p>${p.nome}</p>
        </a>
      </div>
    `).join('');
    semResultados.style.display = 'none';
  }

  updatePagination();
}

export function updatePagination() {
  const totalPages = Math.ceil(personagensFiltrados.length / perPage);
  const pageNumbers = document.getElementById('pageNumbers');

  document.getElementById('prevBtn').disabled = currentPage === 1;
  document.getElementById('nextBtn').disabled = currentPage === totalPages;

  pageNumbers.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    if (i === currentPage) btn.classList.add('active');
    btn.onclick = () => {
      currentPage = i;
      renderPage(currentPage);
    };
    pageNumbers.appendChild(btn);
  }
}

document.getElementById('prevBtn')?.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderPage(currentPage);
  }
});

document.getElementById('nextBtn')?.addEventListener('click', () => {
  const totalPages = Math.ceil(personagensFiltrados.length / perPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderPage(currentPage);
  }
});

// Filtro por categoria
document.querySelectorAll('.filtro-btn')?.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('ativo'));
    btn.classList.add('ativo');

    const filtro = btn.getAttribute('data-filtro');
    currentPage = 1;

    if (filtro === 'todos') {
      personagensFiltrados = personagens;
    } else {
      personagensFiltrados = personagens.filter(p => p.categoria.includes(filtro));
    }

    renderPage(currentPage);
  });
});

// Busca por nome
const searchInput = document.getElementById('searchInput');
if (searchInput) {
  searchInput.addEventListener('input', () => {
    const termo = searchInput.value.toLowerCase();
    personagensFiltrados = personagens.filter(p =>
      p.nome.toLowerCase().includes(termo)
    );
    currentPage = 1;
    renderPage(currentPage);
  });
}

// Função de inicialização
export function iniciarPersonagens() {
  renderPage(currentPage);
}
