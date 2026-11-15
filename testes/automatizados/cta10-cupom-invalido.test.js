const { By } = require('selenium-webdriver');
const {
  BASE_URL,
  abrirNavegador,
  aguardarPasso
} = require('./apoio/fluxos-cliente');

let driver;

jest.setTimeout(60000);

beforeAll(async () => {
  driver = await abrirNavegador();
});

afterAll(async () => {
  if (driver) {
    await driver.quit();
  }
});

describe('CTA10 - cupom inválido', () => {
  test('rejeita cupom inválido sem alterar a pontuação', async () => {
    await driver.get(`${BASE_URL}/modulos/cliente/indexgame.html`);
    await aguardarPasso(driver);
    await driver.findElement(By.id('codigoCupom')).sendKeys('CUPOM-INVALIDO');
    await aguardarPasso(driver);
    await driver.findElement(By.id('aplicarCupomBtn')).click();
    await aguardarPasso(driver);

    expect(await driver.findElement(By.id('mensagemCupom')).getText())
      .toBe('Cupom inválido. Tente novamente.');
    expect(await driver.findElement(By.id('pontos')).getText()).toBe('0');
    await aguardarPasso(driver);
  });
});
