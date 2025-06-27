const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('show');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('show');
  });
});

const submenuParents = document.querySelectorAll('nav li.has-submenu > a');
submenuParents.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    link.parentElement.classList.toggle('submenu-open');
  });
});

window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  nav?.classList.toggle('scrolled', window.scrollY > 50);

  const footer = document.querySelector('footer');
  const scrollTop = window.scrollY;
  const clientHeight = document.documentElement.clientHeight;
  const scrollHeight = document.documentElement.scrollHeight;

  if (scrollTop + clientHeight >= scrollHeight - 10) {
    footer?.classList.add('show');
  } else {
    footer?.classList.remove('show');
  }
});
