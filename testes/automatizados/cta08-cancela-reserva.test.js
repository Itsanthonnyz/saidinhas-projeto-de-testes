const { By, until } = require('selenium-webdriver');
const {
  BASE_URL,
  TIMEOUT,
  abrirNavegador,
  aguardarPasso,
  aceitarAlerta,
  criarReservaDeTeste,
  excluirReserva
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

describe('CTA08 - cancela uma reserva', () => {
  test('cancela uma reserva existente e remove-a da lista', async () => {
    const observacao = `CTA08 Selenium ${Date.now()}`;
    const reserva = await criarReservaDeTeste(observacao);

    try {
      await driver.get(`${BASE_URL}/modulos/cliente/reserva.html`);
      await aguardarPasso(driver);
      await driver.wait(until.elementLocated(By.id(`excluir-${reserva.id}`)), TIMEOUT);
      await driver.findElement(By.id(`excluir-${reserva.id}`)).click();
      await aguardarPasso(driver);

      expect(await aceitarAlerta(driver)).toBe('Tem certeza que deseja cancelar sua reserva?');
      expect(await aceitarAlerta(driver)).toBe('Sua reserva foi cancelada!');

      await driver.wait(async () => {
        const resposta = await fetch(`${BASE_URL}/reservas/${reserva.id}`);
        return resposta.status === 404;
      }, TIMEOUT);
      await driver.wait(async () => {
        const itens = await driver.findElements(By.css('.reserva-obs'));
        for (const item of itens) {
          if ((await item.getText()).includes(observacao)) {
            return false;
          }
        }
        return true;
      }, TIMEOUT);
      await aguardarPasso(driver);
    } finally {
      await excluirReserva(reserva.id);
    }
  });
});
