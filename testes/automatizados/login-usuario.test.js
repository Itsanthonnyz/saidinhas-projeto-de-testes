const { By, until } = require('selenium-webdriver');
const { abrirNavegador, abrirPagina, lerAlerta, TEMPO_LIMITE } = require('./apoio/navegador');

jest.setTimeout(60000);

describe('Login do usuário cliente (Selenium)', () => {
  let navegador;

  beforeAll(async () => {
    navegador = await abrirNavegador();
  });

  afterAll(async () => {
    if (navegador) {
      await navegador.quit();
    }
  });

  beforeEach(async () => {
    await abrirPagina(navegador, '/modulos/login/loginUsuario.html');
  });

  test('CTA01 - realiza login com credenciais válidas e abre o perfil', async () => {
    await navegador.findElement(By.id('username')).sendKeys('kry@gmail.com');
    await navegador.findElement(By.id('password')).sendKeys('123');
    await navegador.findElement(By.css('#login-form input[type="submit"]')).click();

    expect(await lerAlerta(navegador)).toBe('Login realizado com sucesso!');
    await navegador.wait(until.urlContains('/modulos/cliente/perfil.html'), TEMPO_LIMITE);
  });

  test('CTA02 - recusa login com senha incorreta e permanece na tela de login', async () => {
    await navegador.findElement(By.id('username')).sendKeys('kry@gmail.com');
    await navegador.findElement(By.id('password')).sendKeys('senha-errada');
    await navegador.findElement(By.css('#login-form input[type="submit"]')).click();

    expect(await lerAlerta(navegador)).toBe('Usuário ou senha incorretos. Tente novamente.');
    expect(await navegador.getCurrentUrl()).toContain('/modulos/login/loginUsuario.html');
  });
});
