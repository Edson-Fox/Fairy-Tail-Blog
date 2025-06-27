const personagens = [
  {
    nome: "Erza Scarlet",
    imagem: "FairyTail/assets/img/erza.png",
    link: "pages/personagens/erza.html",
    categoria: ["mago", "guilda"]
  },
  {
    nome: "Gray Fullbuster",
    imagem: "FairyTail/assets/img/gray.png",
    link: "pages/personagens/gray.html",
    categoria: ["mago", "guilda"]
  },
  {
    nome: "Lucy Heartfilia",
    imagem: "FairyTail/assets/img/lucy.png",
    link: "pages/personagens/lucy.html",
    categoria: ["mago", "guilda"]
  },
  {
    nome: "Natsu Dragneel",
    imagem: "FairyTail/assets/img/natsu.png",
    link: "pages/personagens/natsu.html",
    categoria: ["mago", "dragao", "guilda"]
  },
  {
    nome: "Zeref Dragneel",
    imagem: "FairyTail/assets/img/zeref.png",
    link: "pages/personagens/zeref.html",
    categoria: ["mago"]
  }
];

personagens.sort((a, b) => a.nome.localeCompare(b.nome));
let personagensFiltrados = personagens;
const perPage = 6;
let currentPage = 1;

function renderPage(page) {
  const list = document.getElementById('episode-list');
  list.style.opacity = 0;

  const start = (page - 1) * perPage;
  const items = personagensFiltrados.slice(start, start + perPage);

  setTimeout(() => {
    list.innerHTML = items.map(p => `
      <div class="card">
        <a href="${p.link}">
          <img src="${p.imagem}" alt="${p.nome}" />
          <p>${p.nome}</p>
        </a>
      </div>
    `).join('');

    updatePagination();
    list.style.opacity = 1;
  }, 200);
}

function updatePagination() {
  const totalPages = Math.ceil(personagensFiltrados.length / perPage);
  document.getElementById('prevBtn').disabled = currentPage === 1;
  document.getElementById('nextBtn').disabled = currentPage === totalPages;

  const pageNumbers = document.getElementById('pageNumbers');
  pageNumbers.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    if (i === currentPage) btn.classList.add('active');
    btn.onclick = () => {
      currentPage = i;
      renderPage(i);
    };
    pageNumbers.appendChild(btn);
  }
}

document.querySelectorAll('.filtro-btn')?.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('ativo'));
    btn.classList.add('ativo');

    const filtro = btn.getAttribute('data-filtro');
    currentPage = 1;
    personagensFiltrados = filtro === 'todos'
      ? personagens
      : personagens.filter(p => p.categoria.includes(filtro));

    renderPage(currentPage);
  });
});

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

// Inicializa
renderPage(currentPage);
