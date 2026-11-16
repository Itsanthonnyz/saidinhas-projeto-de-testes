const { By } = require('selenium-webdriver');
const {
  abrirNavegador,
  abrirPagina,
  preencherCampos,
  aguardarPagina,
  lerAlerta
} = require('./apoio/navegador');
const { garantirRegistro } = require('./apoio/api');
const { RESTAURANTE } = require('./apoio/dados-de-teste');

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

describe('CTA05 - login de restaurante válido', () => {
  beforeAll(async () => {
    await garantirRegistro('usuariosRestaurante', RESTAURANTE);
  });

  test('realiza o login com credenciais válidas e abre o perfil do restaurante', async () => {
    await abrirPagina(navegador, '/modulos/login/loginRestaurante.html');
    await preencherCampos(navegador, { email: RESTAURANTE.email, password: RESTAURANTE.senha });
    await navegador.findElement(By.css('#login-form input[type="submit"]')).click();

    expect(await lerAlerta(navegador)).toBe('Login realizado com sucesso!');
    await aguardarPagina(navegador, '/modulos/restaurante/perfil.html');
  });
});
