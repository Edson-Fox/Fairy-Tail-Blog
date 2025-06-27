// carousel.js

const items = document.querySelectorAll('.carousel-item');
const indicators = document.querySelectorAll('.indicator');
const prevBtn = document.querySelector('.carousel-button.prev');
const nextBtn = document.querySelector('.carousel-button.next');
let currentIndex = 0;
let autoPlayInterval;

function showSlide(index) {
  if (index < 0) {
    currentIndex = items.length - 1;
  } else if (index >= items.length) {
    currentIndex = 0;
  } else {
    currentIndex = index;
  }

  items.forEach((item, i) => {
    item.classList.toggle('active', i === currentIndex);
  });

  indicators.forEach((indicator, i) => {
    indicator.classList.toggle('active', i === currentIndex);
  });
}

function moveCarousel(step) {
  showSlide(currentIndex + step);
}

prevBtn.addEventListener('click', () => {
  moveCarousel(-1);
  resetAutoPlay();
});

nextBtn.addEventListener('click', () => {
  moveCarousel(1);
  resetAutoPlay();
});

indicators.forEach((indicator, i) => {
  indicator.addEventListener('click', () => {
    showSlide(i);
    resetAutoPlay();
  });
});

function startAutoPlay() {
  autoPlayInterval = setInterval(() => {
    moveCarousel(1);
  }, 7000);
}

function resetAutoPlay() {
  clearInterval(autoPlayInterval);
  startAutoPlay();
}

function isScrolledToBottom() {
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return scrollTop + clientHeight >= scrollHeight - 10;
}

window.addEventListener('scroll', () => {
  const footer = document.querySelector('footer');
  if (isScrolledToBottom()) {
    footer.classList.add('show');
  } else {
    footer.classList.remove('show');
  }
});

// Inicializa carrossel
showSlide(currentIndex);
startAutoPlay();

const carouselContainer = document.querySelector('.carousel-container');
const buttonsContainer = document.querySelector('.carousel-buttons');
let buttonTimeout;

function showButtons() {
  buttonsContainer.classList.add('visible');
  clearTimeout(buttonTimeout);
  buttonTimeout = setTimeout(() => {
    buttonsContainer.classList.remove('visible');
  }, 2000);
}

carouselContainer.addEventListener('mousemove', showButtons);
carouselContainer.addEventListener('touchstart', showButtons);

window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Menu hambúrguer
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('show');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('show');
  });
});

// Submenus
const submenuParents = document.querySelectorAll('nav li.has-submenu > a');

submenuParents.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const parentLi = link.parentElement;
    parentLi.classList.toggle('submenu-open');
  });
});

// Lista de personagens
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

// Ordena alfabeticamente
personagens.sort((a, b) => a.nome.localeCompare(b.nome));

// Filtro
let personagensFiltrados = personagens;
const perPage = 6;
let currentPage = 1;

document.querySelectorAll('.filtro-btn').forEach(btn => {
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

// Renderização com transição
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

document.getElementById('prevBtn').onclick = () => {
  if (currentPage > 1) {
    currentPage--;
    renderPage(currentPage);
  }
};

document.getElementById('nextBtn').onclick = () => {
  const totalPages = Math.ceil(personagensFiltrados.length / perPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderPage(currentPage);
  }
};

// Inicializa página
renderPage(currentPage);
