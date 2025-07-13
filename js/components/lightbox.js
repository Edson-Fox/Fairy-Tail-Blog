export function iniciarLightboxGaleria() {
  const galeriaImagens = document.querySelectorAll(".galeria img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.querySelector(".lightbox-img");
  const closeBtn = document.querySelector(".lightbox .close");
  const somVento = document.getElementById("som-vento");

  if (!lightbox || !lightboxImg || !closeBtn) return;

  function tocarSomVento() {
    if (somVento) {
      somVento.volume = 0.15;
      somVento.play();
    }
  }

  function pausarSomVento() {
    if (somVento) {
      somVento.pause();
      somVento.currentTime = 0;
    }
  }

  galeriaImagens.forEach(img => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightbox.classList.add("active");
      lightbox.classList.remove("closing");
      tocarSomVento();
      document.body.style.overflow = "hidden"; // trava scroll
    });
  });

  function fecharLightbox() {
    lightbox.classList.add("closing");
    lightbox.classList.remove("active");
    pausarSomVento();
    document.body.style.overflow = ""; // libera scroll
    setTimeout(() => {
      lightbox.classList.add("hidden");
      lightbox.classList.remove("closing");
      lightboxImg.src = "";
    }, 400); // tempo igual ao transition
  }

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target === closeBtn) {
      fecharLightbox();
    }
  });
}
