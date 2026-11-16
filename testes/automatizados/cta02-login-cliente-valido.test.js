const { By } = require('selenium-webdriver');
const {
  abrirNavegador,
  abrirPagina,
  preencherCampos,
  aguardarPagina,
  lerAlerta
} = require('./apoio/navegador');
const { garantirRegistro } = require('./apoio/api');
const { CLIENTE } = require('./apoio/dados-de-teste');

let navegador;

jest.setTimeout(60000);

beforeAll(async () => {
  navegador = await abrirNavegador();
});

afterAll(async () => {
  if (navegador) {
    await navegador.quit();
  }
});

describe('CTA02 - login de cliente válido', () => {
  beforeAll(async () => {
    await garantirRegistro('usuarioCliente', CLIENTE);
  });

  test('realiza o login com credenciais válidas e abre o perfil do cliente', async () => {
    await abrirPagina(navegador, '/modulos/login/loginUsuario.html');
    await preencherCampos(navegador, { username: CLIENTE.email, password: CLIENTE.senha });
    await navegador.findElement(By.css('#login-form input[type="submit"]')).click();

    expect(await lerAlerta(navegador)).toBe('Login realizado com sucesso!');
    await aguardarPagina(navegador, '/modulos/cliente/perfil.html');
  });
});
