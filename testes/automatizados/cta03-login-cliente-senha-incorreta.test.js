const { By } = require('selenium-webdriver');
const {
  abrirNavegador,
  abrirPagina,
  preencherCampos,
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

describe('CTA03 - login de cliente com senha incorreta', () => {
  beforeAll(async () => {
    await garantirRegistro('usuarioCliente', CLIENTE);
  });

  test('recusa o login com senha incorreta e permanece na tela de login', async () => {
    await abrirPagina(navegador, '/modulos/login/loginUsuario.html');
    await preencherCampos(navegador, { username: CLIENTE.email, password: 'SenhaErrada123' });
    await navegador.findElement(By.css('#login-form input[type="submit"]')).click();

    expect(await lerAlerta(navegador)).toBe('Usuário ou senha incorretos. Tente novamente.');
    expect(await navegador.getCurrentUrl()).toContain('/modulos/login/loginUsuario.html');
  });
});
