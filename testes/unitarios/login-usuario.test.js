const { carregarPagina, simularApi } = require('./apoio/carregar-pagina');

const USUARIOS = [
  { id: '1', nome: 'Krycia', email: 'kry@gmail.com', senha: '123' }
];

describe('Login do usuário cliente', () => {
  beforeEach(() => {
    carregarPagina('modulos/login/loginUsuario.html', 'assets/js/loginResgistroUsuario.js');
    window.alert = jest.fn();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('CTU01 - exibe mensagem de sucesso quando e-mail e senha estão corretos', async () => {
    simularApi(USUARIOS);
    document.getElementById('username').value = 'kry@gmail.com';
    document.getElementById('password').value = '123';

    await loginUsuario({ preventDefault: jest.fn() });

    expect(window.alert).toHaveBeenCalledWith('Login realizado com sucesso!');
  });

  test('CTU02 - exibe mensagem de erro quando a senha está incorreta', async () => {
    simularApi(USUARIOS);
    document.getElementById('username').value = 'kry@gmail.com';
    document.getElementById('password').value = 'senha-errada';

    await loginUsuario({ preventDefault: jest.fn() });

    expect(window.alert).toHaveBeenCalledWith('Usuário ou senha incorretos. Tente novamente.');
  });
});
