import { createOptimizedPicture } from '../../scripts/aem.js';

export default async function decorate(block) {
  // 1. Buscamos os dados do índice
  const resp = await fetch('/query-index.json');
  const json = await resp.json();
  const properties = json.data;

  const categories = new Set(['Show All']);
  block.textContent = '';

  const cardsContainer = document.createElement('div');
  cardsContainer.classList.add('properties-container');

  // 2. Criamos os cards com base no JSON
  properties.forEach((prop) => {
    // Filtramos para pegar apenas o que está na pasta /properties/
    if (!prop.path.startsWith('/properties/')) return;

    const card = document.createElement('div');
    card.classList.add('property-card');
    card.dataset.category = prop.category;
    categories.add(prop.category);

    // Otimização de imagem nativa do EDS
    const picture = createOptimizedPicture(prop.image, prop.title, false, [{ width: '750' }]);

    card.innerHTML = `
      <div class="card-image">${picture.outerHTML}</div>
      <div class="card-content">
        <div class="card-header">
          <span class="category-tag">${prop.category}</span>
          <span class="price">${prop.price}</span>
        </div>
        <h4><a href="${prop.path}">${prop.title}</a></h4>
        <p>${prop.description}</p>
        <div class="card-button">
          <a href="${prop.path}">View Details</a>
        </div>
      </div>
    `;
    cardsContainer.append(card);
  });

  // 3. Criar barra de filtros (Mesma lógica anterior)
  const filterNav = document.createElement('ul');
  filterNav.classList.add('properties-filter');

  categories.forEach((cat) => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.textContent = cat;
    if (cat === 'Show All') button.classList.add('is-active');

    button.addEventListener('click', () => {
      filterNav.querySelector('.is-active').classList.remove('is-active');
      button.classList.add('is-active');

      const filter = button.textContent;
      cardsContainer.querySelectorAll('.property-card').forEach((card) => {
        card.style.display = (filter === 'Show All' || card.dataset.category === filter) ? 'block' : 'none';
      });
    });

    li.append(button);
    filterNav.append(li);
  });

  block.append(filterNav, cardsContainer);
}
