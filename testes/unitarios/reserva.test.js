
describe('Testes de reservas do cliente', () => {

    beforeEach(() => {
        const fs = require('fs');
        const path = require('path');

        document.body.innerHTML = `
            <button id="confirmarRC"></button>
            <select id="restauranteRC">
                <option value="">Selecione</option>
            </select>
            <input id="dataRC" value="">
            <input id="horaRC" value="">
            <input id="tipoRC" value="">
            <ul id="listaReservas"></ul>
            <div id="mensagemSemReservas"></div>
        `;

        global.fetch = jest.fn();

        jest.spyOn(window, 'alert').mockImplementation(() => { });

        const caminho = path.join(
            __dirname,
            '..',
            '..',
            'codigo',
            'public',
            'assets',
            'js',
            'cliente',
            'reserva.js'
        );

        const codigo = fs.readFileSync(caminho, 'utf8');

        (0, eval)(codigo);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('CT09 - impede cadastro de reserva com campos vazios', async () => {

        await salvarReserva();

        expect(window.alert).toHaveBeenCalledWith(
            'Por favor, preencha todos os campos!'
        );

        expect(fetch).not.toHaveBeenCalled();
    });

    test('CT10 - exibe mensagem quando não existem reservas', async () => {

        fetch.mockResolvedValue({
            ok: true,
            json: async () => []
        });

        carregarReservas();

        await new Promise(resolve => setTimeout(resolve, 0));

        const mensagem = document.getElementById('mensagemSemReservas');
        const lista = document.getElementById('listaReservas');

        expect(mensagem.style.display).toBe('block');
        expect(lista.style.display).toBe('none');
        expect(lista.innerHTML).toBe('');
    });
});
