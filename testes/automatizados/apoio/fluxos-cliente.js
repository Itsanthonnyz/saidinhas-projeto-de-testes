const { Builder, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const BASE_URL = 'http://localhost:3000';
const TIMEOUT = 10000;

async function aguardarPasso(driver) {
  const configuracao = process.env.SELENIUM_DELAY_MS;
  const atraso = configuracao === undefined ? 0 : Number(configuracao);
  if (!Number.isFinite(atraso) || atraso < 0) {
    throw new Error('SELENIUM_DELAY_MS deve ser um número igual ou maior que zero.');
  }
  if (atraso > 0) {
    await driver.sleep(atraso);
  }
}

async function abrirNavegador() {
  const opcoes = new chrome.Options().addArguments('--no-sandbox');
  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(opcoes)
    .build();
  await driver.manage().window().setRect({ width: 1440, height: 1800 });
  return driver;
}

async function requisitarApi(caminho, opcoes) {
  const resposta = await fetch(`${BASE_URL}${caminho}`, opcoes);
  if (!resposta.ok) {
    throw new Error(`Falha na API ${caminho}: ${resposta.status} ${resposta.statusText}`);
  }
  return resposta.json();
}

async function excluirReserva(id) {
  const resposta = await fetch(`${BASE_URL}/reservas/${id}`, { method: 'DELETE' });
  if (!resposta.ok && resposta.status !== 404) {
    throw new Error(`Falha ao limpar a reserva ${id}: ${resposta.status} ${resposta.statusText}`);
  }
}

async function aceitarAlerta(driver) {
  const alerta = await driver.wait(until.alertIsPresent(), TIMEOUT);
  const mensagem = await alerta.getText();
  await alerta.accept();
  await aguardarPasso(driver);
  return mensagem;
}

async function criarReservaDeTeste(obs) {
  return requisitarApi('/reservas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      restauranteId: '1',
      nomeRestaurante: 'Restaurante Mineiro',
      data: '2030-12-31',
      hora: '19:30',
      obs,
      status: true
    })
  });
}

module.exports = {
  BASE_URL,
  TIMEOUT,
  abrirNavegador,
  aguardarPasso,
  aceitarAlerta,
  criarReservaDeTeste,
  excluirReserva,
  requisitarApi
};
