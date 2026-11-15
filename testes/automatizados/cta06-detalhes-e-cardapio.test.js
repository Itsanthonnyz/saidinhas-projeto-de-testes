const { By, until } = require('selenium-webdriver');
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

describe('CTA06 - detalhes do restaurante e cardápio', () => {
  test('abre os detalhes de um restaurante e acessa seu cardápio', async () => {
    await driver.get(`${BASE_URL}/modulos/cliente/infoRestaurante.html?id=1`);
    await aguardarPasso(driver);

    const nomeRestaurante = await driver.wait(
      until.elementLocated(By.css('#perfil-restaurante h2')),
      TIMEOUT
    );
    expect(await nomeRestaurante.getText()).toBe('Restaurante Mineiro');

    const botaoCardapio = await driver.wait(
      until.elementLocated(By.id('acessar-cardapio')),
      TIMEOUT
    );
    await botaoCardapio.click();
    await aguardarPasso(driver);

    await driver.wait(until.urlContains('/modulos/cliente/cardapio.html'), TIMEOUT);
    await driver.wait(until.elementLocated(By.css('.menu-section h2')), TIMEOUT);
    await aguardarPasso(driver);
    expect(await driver.findElement(By.css('.menu-section h2')).getText()).toBe('Entradas');
    expect(await driver.findElement(By.xpath("//h3[normalize-space()='Sanduíche natural']")).isDisplayed())
      .toBe(true);
  });
});
