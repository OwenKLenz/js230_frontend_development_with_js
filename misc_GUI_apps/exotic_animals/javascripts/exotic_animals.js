document.addEventListener('DOMContentLoaded', () => {
  [...document.querySelectorAll('figure')].forEach(addMouseOverListeners);
});

function addMouseOverListeners(figure) {
  let timer = null;

  figure.addEventListener('mouseenter', () => {
    timer = setTimeout(() => {
      figure.lastElementChild.classList.toggle('visible'); 
      timer = null;
    }, 2000);
  });

  figure.addEventListener('mouseleave', () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    } else {
      figure.lastElementChild.classList.toggle('visible'); 
    }
  });
}
