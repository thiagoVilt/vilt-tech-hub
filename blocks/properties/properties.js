export default function decorate(block) {
  const properties = [...block.children];
  const categories = new Set(['Show All']); // Set para categorias únicas
  block.textContent = '';

  // Container para os cards
  const cardsContainer = document.createElement('div');
  cardsContainer.classList.add('properties-container');

  properties.forEach((row) => {
    const card = document.createElement('div');
    card.classList.add('property-card');

    // Mapeamento das células (conforme a tabela do Doc)
    const [imgCell, infoCell, titleCell, detailsCell, btnCell] = row.children;
    console.log('Cells:', { imgCell, infoCell, titleCell, detailsCell, btnCell }); // Debug para verificar as células

    // Extrair categoria para o filtro
    const categoryText = infoCell.querySelector('strong')?.nextSibling?.textContent.trim() || 'Other';
    categories.add(categoryText);
    card.dataset.category = categoryText;

    // Estruturação do Card (Villa Agency Style)
    card.innerHTML = `
      <div class="card-image">${imgCell.innerHTML}</div>
      <div class="card-content">
        <div class="card-header">
          <span class="category-tag">${categoryText}</span>
          <span class="price">${infoCell.querySelector('strong:nth-of-type(2)')?.nextSibling?.textContent || ''}</span>
        </div>
        <h4>${titleCell.innerHTML}</h4>
        <div class="details">${detailsCell.innerHTML}</div>
        <div class="card-button">${btnCell.innerHTML}</div>
      </div>
    `;
    cardsContainer.append(card);
  });

  // Criar barra de filtros
  const filterNav = document.createElement('ul');
  filterNav.classList.add('properties-filter');
  categories.forEach((cat) => {
    const li = document.createElement('li');
    li.innerHTML = `<button class="${cat === 'Show All' ? 'is-active' : ''}">${cat}</button>`;
    li.addEventListener('click', (e) => {
      // Lógica de Filtro
      filterNav.querySelector('.is-active').classList.remove('is-active');
      e.target.classList.add('is-active');
      
      const filter = e.target.textContent;
      cardsContainer.querySelectorAll('.property-card').forEach((card) => {
        card.style.display = (filter === 'Show All' || card.dataset.category === filter) ? 'block' : 'none';
      });
    });
    filterNav.append(li);
  });

  block.append(filterNav, cardsContainer);
}