// lucy.js
// Script exclusivo para a página da Lucy Heartfilia

document.addEventListener("DOMContentLoaded", () => {
  console.log("Página da Lucy carregada com sucesso!");

  // Animação de entrada dos elementos
  const elementosAnimados = document.querySelectorAll(".animar-entrada");
  elementosAnimados.forEach((el, index) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(50px)";
    setTimeout(() => {
      el.style.transition = "all 0.8s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, index * 200);
  });

  // Efeito de brilho dourado no título
  const titulo = document.querySelector(".titulo-lucy");
  if (titulo) {
    setInterval(() => {
      titulo.classList.toggle("brilho-dourado");
    }, 1000);
  }

  // Animação nas imagens das chaves
  const chaves = document.querySelectorAll(".chave-celestial");
  chaves.forEach(chave => {
    chave.addEventListener("mouseenter", () => {
      chave.style.transform = "scale(1.1) rotate(5deg)";
      chave.style.transition = "transform 0.3s ease";
    });
    chave.addEventListener("mouseleave", () => {
      chave.style.transform = "scale(1) rotate(0deg)";
    });
  });

  // Tooltip simples para curiosidades das chaves
  chaves.forEach(chave => {
    chave.addEventListener("click", () => {
      const curiosidade = chave.getAttribute("data-curiosidade");
      if (curiosidade) {
        alert(curiosidade);
      }
    });
  });
});
