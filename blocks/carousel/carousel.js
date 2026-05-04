export default function decorate(block) {
  const slides = [...block.children];
  block.textContent = '';

  // Container para os slides
  const slidesWrapper = document.createElement('div');
  slidesWrapper.classList.add('slides-wrapper');

  slides.forEach((row, index) => {
    const slide = document.createElement('div');
    slide.classList.add('carousel-slide');
    if (index === 0) slide.classList.add('active');

    // O EDS gera: row > div (imagem) e row > div (texto)
    const imageContent = row.children[0];
    const textContent = row.children[1];

    if (imageContent) imageContent.classList.add('slide-image');
    if (textContent) {
      textContent.classList.add('slide-text');
      // No seu template, o local (Toronto) tem um estilo de tag
      const span = textContent.querySelector('p');
      if (span) span.classList.add('location-tag');
    }

    slide.append(...row.children);
    slidesWrapper.append(slide);
  });

  block.append(slidesWrapper);

  // Botões de Navegação (Simulando o Owl Carousel do template)
  const nav = document.createElement('div');
  nav.classList.add('carousel-nav');
  nav.innerHTML = `
    <button class="prev">❮</button>
    <button class="next">❯</button>
  `;
  block.append(nav);

  // Lógica simples de clique
  nav.querySelector('.next').onclick = () => moveSlide(block, 1);
  nav.querySelector('.prev').onclick = () => moveSlide(block, -1);
}

function moveSlide(block, direction) {
  const slides = block.querySelectorAll('.carousel-slide');
  const active = block.querySelector('.carousel-slide.active');
  let nextIndex = [...slides].indexOf(active) + direction;

  if (nextIndex >= slides.length) nextIndex = 0;
  if (nextIndex < 0) nextIndex = slides.length - 1;

  active.classList.remove('active');
  slides[nextIndex].classList.add('active');
}