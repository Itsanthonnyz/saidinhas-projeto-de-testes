const { By } = require('selenium-webdriver');
const {
  BASE_URL,
  TIMEOUT,
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

describe('CTA09 - cupom válido', () => {
  test('aplica cupom válido e credita os pontos correspondentes', async () => {
    await driver.get(`${BASE_URL}/modulos/cliente/indexgame.html`);
    await aguardarPasso(driver);
    await driver.findElement(By.id('codigoCupom')).sendKeys('DESCONTO10');
    await aguardarPasso(driver);
    await driver.findElement(By.id('aplicarCupomBtn')).click();
    await aguardarPasso(driver);

    await driver.wait(
      async () => (await driver.findElement(By.id('pontos')).getText()) === '10',
      TIMEOUT
    );
    expect(await driver.findElement(By.id('mensagemCupom')).getText())
      .toBe('Cupom aplicado com sucesso! Você ganhou 10 pontos.');
    await aguardarPasso(driver);
  });
});
