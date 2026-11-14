describe('Cadastro de usuário pelo questionário', () => {

    beforeEach(() => {
        localStorage.clear();

        const fs = require('fs');
        const path = require('path');

        const caminho = path.join(
            __dirname,
            '..',
            '..',
            'codigo',
            'public',
            'assets',
            'js',
            'cliente',
            'pergunta.js'
        );

        const codigo = fs.readFileSync(caminho, 'utf8');

        document.body.innerHTML = `
            <div class="continuar">
                <a href="./perfil.html">Continuar</a>
            </div>
        `;

        (0, eval)(codigo);
    });

    test('CT01 - cadastra usuário com nome válido', () => {
        const id = cadastrarUsuario('João Teste');

        const dadosSalvos = localStorage.getItem(`usuario_${id}`);
        const usuario = JSON.parse(dadosSalvos);

        expect(id).toBeDefined();
        expect(usuario.id).toBe(id);
        expect(usuario.nome).toBe('João Teste');
        expect(usuario.respostas).toEqual({});
    });

    test('CT02 - recupera os dados de um usuário existente', () => {
        const id = cadastrarUsuario('Maria');

        const usuario = obterUsuario(id);

        expect(usuario).not.toBeNull();
        expect(usuario.id).toBe(id);
        expect(usuario.nome).toBe('Maria');
        expect(usuario.respostas).toEqual({});
    });

    test('CT03 - retorna null ao buscar um usuário inexistente', () => {
        const usuario = obterUsuario('id-inexistente');

        expect(usuario).toBeNull();
    });
}); 
