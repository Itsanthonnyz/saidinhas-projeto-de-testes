const { By, until } = require('selenium-webdriver');
const {
  BASE_URL,
  TIMEOUT,
  abrirNavegador,
  aguardarPasso,
  aceitarAlerta,
  excluirReserva,
  requisitarApi
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

describe('CTA07 - registra uma reserva', () => {
  test('registra uma reserva e a exibe na lista', async () => {
    const observacao = `CTA07 Selenium ${Date.now()}`;
    let reserva;

    try {
      await driver.get(`${BASE_URL}/modulos/cliente/reserva.html`);
      await aguardarPasso(driver);
      await driver.wait(
        until.elementLocated(By.css('#restauranteRC option[value="1"]')),
        TIMEOUT
      );
      await driver.findElement(By.id('restauranteRC')).sendKeys('Restaurante Mineiro');
      await aguardarPasso(driver);
      await driver.findElement(By.id('dataRC')).sendKeys('2030-12-31');
      await aguardarPasso(driver);
      await driver.findElement(By.id('horaRC')).sendKeys('19:30');
      await aguardarPasso(driver);
      await driver.findElement(By.id('tipoRC')).sendKeys(observacao);
      await aguardarPasso(driver);
      await driver.findElement(By.id('confirmarRC')).click();
      await aguardarPasso(driver);

      expect(await aceitarAlerta(driver)).toBe('Reserva realizada com sucesso!');
      reserva = await requisitarApi(
        `/reservas?obs=${encodeURIComponent(observacao)}`
      ).then((reservas) => reservas[0]);
      expect(reserva).toBeDefined();

      const reservaNaLista = await driver.wait(async () => {
        const itens = await driver.findElements(By.css('.reserva-obs'));
        for (const item of itens) {
          if ((await item.getText()).includes(observacao)) {
            return item;
          }
        }
        return false;
      }, TIMEOUT);
      expect(await reservaNaLista.getText()).toContain(observacao);
      await aguardarPasso(driver);
    } finally {
      if (reserva) {
        await excluirReserva(reserva.id);
      }
    }
  });
});
