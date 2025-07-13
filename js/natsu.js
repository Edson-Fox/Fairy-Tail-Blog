export function iniciarNarracaoNatsu() {
  iniciarParticulasFogo();
  iniciarLightbox();

  const btnNarrar = document.getElementById('btn-narrar');
  const audioNarracao = document.getElementById('narracao-natsu');
  const audioFogo = document.getElementById('som-fogo');

  if (!btnNarrar || !audioNarracao) return;

  btnNarrar.addEventListener('click', () => {
    audioNarracao.currentTime = 0;
    audioNarracao.play();

    if (audioFogo) {
      audioFogo.currentTime = 0;
      audioFogo.play();
    }

    btnNarrar.classList.add('animando');
    document.querySelector('h1')?.classList.add('fogo-ativo');
    document.body.classList.add('tremor');

    audioNarracao.onended = () => {
      btnNarrar.classList.remove('animando');
      document.querySelector('h1')?.classList.remove('fogo-ativo');
      document.body.classList.remove('tremor');
      if (audioFogo) audioFogo.pause();
    };
  });
}

// Partículas de fogo animadas
function iniciarParticulasFogo() {
  const container = document.querySelector('.fogo-particles');
  if (!container) return;

  function criarParticula() {
    const span = document.createElement('span');
    span.style.left = Math.random() * 100 + 'vw';
    span.style.animationDuration = 3 + Math.random() * 2 + 's';
    const size = 6 + Math.random() * 8;
    span.style.width = size + 'px';
    span.style.height = size + 'px';
    container.appendChild(span);
    setTimeout(() => span.remove(), 6000);
  }

  setInterval(criarParticula, 180);
}

// Lightbox de imagem da galeria
function iniciarLightbox() {
  const imagens = document.querySelectorAll('.galeria img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const closeBtn = document.querySelector('.lightbox .close');

  if (!lightbox || !lightboxImg || !closeBtn) return;

  imagens.forEach(img => {
    img.addEventListener('click', () => {
      lightbox.classList.remove('hidden');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
    });
  });

  function fecharLightbox() {
    lightbox.classList.add('hidden');
    lightboxImg.src = '';
    lightboxImg.alt = '';
  }

  closeBtn.addEventListener('click', fecharLightbox);
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox || e.target === lightboxImg) {
      fecharLightbox();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') fecharLightbox();
  });
}
// Função para iniciar a narração de Natsu