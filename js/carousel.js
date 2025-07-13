export function iniciarCarrossel() {
  const items = document.querySelectorAll('.carousel-item');
  const indicators = document.querySelectorAll('.indicator');
  const prevBtn = document.querySelector('.carousel-button.prev');
  const nextBtn = document.querySelector('.carousel-button.next');
  const carouselContainer = document.querySelector('.carousel-container');
  const buttonsContainer = document.querySelector('.carousel-buttons');
  let currentIndex = 0;
  let autoPlayInterval;
  let buttonTimeout;

  function showSlide(index) {
    if (index < 0) currentIndex = items.length - 1;
    else if (index >= items.length) currentIndex = 0;
    else currentIndex = index;

    items.forEach((item, i) => item.classList.toggle('active', i === currentIndex));
    indicators.forEach((indicator, i) => indicator.classList.toggle('active', i === currentIndex));
  }

  function moveCarousel(step) {
    showSlide(currentIndex + step);
  }

  function startAutoPlay() {
    autoPlayInterval = setInterval(() => moveCarousel(1), 7000);
  }

  function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
  }

  prevBtn?.addEventListener('click', () => {
    moveCarousel(-1);
    resetAutoPlay();
  });

  nextBtn?.addEventListener('click', () => {
    moveCarousel(1);
    resetAutoPlay();
  });

  indicators.forEach((indicator, i) => {
    indicator.addEventListener('click', () => {
      showSlide(i);
      resetAutoPlay();
    });
  });

  function showButtons() {
    buttonsContainer.classList.add('visible');
    clearTimeout(buttonTimeout);
    buttonTimeout = setTimeout(() => {
      buttonsContainer.classList.remove('visible');
    }, 2000);
  }

  carouselContainer?.addEventListener('mousemove', showButtons);
  carouselContainer?.addEventListener('touchstart', showButtons);

  // Inicializa o carrossel
  showSlide(currentIndex);
  startAutoPlay();
}
