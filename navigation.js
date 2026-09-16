document.addEventListener('click', (event) => {
  document.querySelectorAll('.user-menu[open]').forEach((menu) => {
    if (!menu.contains(event.target)) {
      menu.removeAttribute('open');
    }
  });
});