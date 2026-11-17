const API_URL = 'http://localhost:3000/menu';

function carregarCardapio(callback) {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            callback(data.categories);
        })
        .catch(error => {
            console.error('Erro ao ler o cardápio via API JSONServer:', error);
        });
}

function criarItem(item, categoryName) {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('card');

    const img = document.createElement('img');
    img.src = item.image_url.includes('http')
        ? item.image_url
        : `/codigo/public/assets/images/${item.image_url}.jpg`;
    img.alt = item.name;
    img.style.width = '200px';
    img.style.borderRadius = '8px';

    const title = document.createElement('h3');
    title.textContent = item.name;

    const criarParagrafo = (texto, classe) => {
        const paragrafo = document.createElement('p');
        paragrafo.textContent = texto;
        if (classe) paragrafo.classList.add(classe);
        return paragrafo;
    };

    itemDiv.appendChild(img);
    itemDiv.appendChild(title);
    itemDiv.appendChild(criarParagrafo(item.description));
    itemDiv.appendChild(criarParagrafo(`Preço: R$ ${item.price}`, 'info'));
    itemDiv.appendChild(criarParagrafo(`Origem: ${item.origin || 'Desconhecida'}`, 'info'));

    return itemDiv;
}

function renderizarCardapio(categories) {
    const itemsList = document.getElementById('items-list');
    const itemsListVazio = document.getElementById('items-list-vazio');

    if (!categories || categories.length === 0) {
        itemsListVazio.innerHTML = '<h2>Nenhum item disponível no cardápio.</h2>';
        return;
    }

    itemsList.innerHTML = '';

    categories.forEach(category => {
        category.items.forEach(item => {
            const itemDiv = criarItem(item, category.name);
            itemsList.appendChild(itemDiv);
        });
    });

    const categoryButtons = document.querySelectorAll('.category-btn');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedCategory = button.dataset.category;
            filterItems(selectedCategory, categories);
        });
    });

    const addBtn = document.querySelector('.add-btn');

    addBtn.onclick = function () {
        abrirModalCadastro()
    };
}

function filterItems(selectedCategory, categories) {
    const itemsList = document.getElementById('items-list');
    itemsList.innerHTML = '';

    const categoriesToRender = selectedCategory === 'all'
        ? categories
        : categories.filter(category => category.name === selectedCategory);

    categoriesToRender.forEach(category => {
        category.items.forEach(item => {
            itemsList.appendChild(criarItem(item, category.name));
        });
    });
}

carregarCardapio(renderizarCardapio);
function mostrarInfo(button) {
    const info = button.nextElementSibling;
    info.style.display = info.style.display === 'block' ? 'none' : 'block';
}
