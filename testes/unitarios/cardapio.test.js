describe('Criação de itens do cardápio', () => {

    beforeEach(() => {
        const fs = require('fs');
        const path = require('path');

        global.fetch = jest.fn(() => new Promise(() => {}));

        const caminho = path.join(
            __dirname,
            '..',
            '..',
            'codigo',
            'public',
            'assets',
            'js',
            'cliente',
            'cardapioRestaurante.js'
        );

        const codigo = fs.readFileSync(caminho, 'utf8');

        (0, eval)(codigo);
    });

    test('CT04 - cria item do cardápio com imagem local', () => {

        const item = {
            name: 'Pizza Teste',
            description: 'Pizza de queijo',
            price: 35,
            image_url: 'pizza-teste',
            origin: 'Itália'
        };

        const elemento = criarItem(item, 'Pizzas');

        expect(elemento.classList.contains('card')).toBe(true);
        expect(elemento.querySelector('img').getAttribute('src'))
            .toBe('/codigo/public/assets/images/pizza-teste.jpg');
        expect(elemento.querySelector('img').alt).toBe('Pizza Teste');
        expect(elemento.querySelector('h3').textContent).toBe('Pizza Teste');
        expect(elemento.querySelectorAll('p')[0].textContent)
            .toBe('Pizza de queijo');
        expect(elemento.querySelectorAll('p')[1].textContent)
            .toBe('Preço: R$ 35');
        expect(elemento.querySelectorAll('p')[2].textContent)
            .toBe('Origem: Itália');
    });

    test('CT05 - define origem desconhecida quando não informada', () => {

    const item = {
        name: 'Hambúrguer Teste',
        description: 'Hambúrguer artesanal',
        price: 28,
        image_url: 'hamburguer-teste'
    };

    const elemento = criarItem(item, 'Hambúrgueres');

    const origem = elemento.querySelectorAll('p')[2].textContent;

    expect(origem).toBe('Origem: Desconhecida');
}); 

test('CT06 - filtra itens do cardápio pela categoria selecionada', () => {

    document.body.innerHTML = `
        <div id="items-list"></div>
    `;

    const categories = [
        {
            name: 'Pizzas',
            items: [
                {
                    name: 'Pizza de Queijo',
                    description: 'Pizza tradicional',
                    price: 35,
                    image_url: 'pizza-queijo',
                    origin: 'Itália'
                },
                {
                    name: 'Pizza de Calabresa',
                    description: 'Pizza com calabresa',
                    price: 40,
                    image_url: 'pizza-calabresa',
                    origin: 'Brasil'
                }
            ]
        },
        {
            name: 'Bebidas',
            items: [
                {
                    name: 'Refrigerante',
                    description: 'Bebida gelada',
                    price: 8,
                    image_url: 'refrigerante',
                    origin: 'Brasil'
                }
            ]
        }
    ];

    filterItems('Pizzas', categories);

    const itensExibidos = document.querySelectorAll('#items-list .card');

    expect(itensExibidos.length).toBe(2);
    expect(itensExibidos[0].querySelector('h3').textContent)
        .toBe('Pizza de Queijo');
    expect(itensExibidos[1].querySelector('h3').textContent)
        .toBe('Pizza de Calabresa');
});


test('CT07 - exibe todos os itens quando a categoria selecionada é all', () => {

    document.body.innerHTML = `
        <div id="items-list"></div>
    `;

    const categories = [
        {
            name: 'Pizzas',
            items: [
                {
                    name: 'Pizza de Queijo',
                    description: 'Pizza tradicional',
                    price: 35,
                    image_url: 'pizza-queijo',
                    origin: 'Itália'
                }
            ]
        },
        {
            name: 'Bebidas',
            items: [
                {
                    name: 'Refrigerante',
                    description: 'Bebida gelada',
                    price: 8,
                    image_url: 'refrigerante',
                    origin: 'Brasil'
                }
            ]
        }
    ];

    filterItems('all', categories);

    const itensExibidos = document.querySelectorAll('#items-list .card');

    expect(itensExibidos.length).toBe(2);

    expect(itensExibidos[0].querySelector('h3').textContent)
        .toBe('Pizza de Queijo');

    expect(itensExibidos[1].querySelector('h3').textContent)
        .toBe('Refrigerante');
});


test('CT08 - exibe mensagem quando o cardápio está vazio', () => {

    document.body.innerHTML = `
        <div id="items-list"></div>
        <div id="items-list-vazio"></div>
    `;

    renderizarCardapio([]);

    const mensagem = document.querySelector('#items-list-vazio h2');

    expect(mensagem).not.toBeNull();

    expect(mensagem.textContent)
        .toBe('Nenhum item disponível no cardápio.');
});


});
