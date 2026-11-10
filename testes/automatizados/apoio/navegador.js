const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const URL_BASE = 'http://localhost:3000';
const TEMPO_LIMITE = 10000;
const CHAVE_ALERTAS = '__alertas_saidinhas__';

/*
 * As telas do Saidinhas informam o resultado das ações por meio de alert().
 * Em algumas delas a mesma mensagem é disparada mais de uma vez, inclusive
 * durante a troca de página, o que torna a caixa de diálogo nativa instável
 * para o Selenium. Por isso, o alert() é substituído por um registrador que
 * guarda cada mensagem no sessionStorage, de onde os testes fazem a leitura.
 */
const REGISTRADOR_DE_ALERTAS = `
  window.alert = function (mensagem) {
    var lista = JSON.parse(sessionStorage.getItem('${CHAVE_ALERTAS}') || '[]');
    lista.push(String(mensagem));
    sessionStorage.setItem('${CHAVE_ALERTAS}', JSON.stringify(lista));
  };
`;

async function abrirNavegador() {
  const opcoes = new chrome.Options();
  opcoes.addArguments('--window-size=1366,768');
  if (process.env.CHROME_BIN) {
    opcoes.setChromeBinaryPath(process.env.CHROME_BIN);
  }
  if (process.env.HEADLESS === '1') {
    opcoes.addArguments('--headless=new', '--no-sandbox', '--disable-dev-shm-usage');
  }

  const navegador = await new Builder().forBrowser('chrome').setChromeOptions(opcoes).build();
  await navegador.sendDevToolsCommand('Page.addScriptToEvaluateOnNewDocument', {
    source: REGISTRADOR_DE_ALERTAS
  });
  return navegador;
}

async function abrirPagina(navegador, caminho) {
  await navegador.get(`${URL_BASE}${caminho}`);
  await limparAlertas(navegador);
}

async function lerAlertas(navegador) {
  let mensagens = [];
  await navegador.wait(async () => {
    mensagens = await navegador.executeScript(
      `return JSON.parse(sessionStorage.getItem('${CHAVE_ALERTAS}') || '[]');`
    );
    return mensagens.length > 0;
  }, TEMPO_LIMITE, 'Nenhuma mensagem de alerta foi exibida pelo sistema.');
  return mensagens;
}

async function lerAlerta(navegador) {
  const mensagens = await lerAlertas(navegador);
  return mensagens[0];
}

async function limparAlertas(navegador) {
  await navegador.executeScript(`sessionStorage.removeItem('${CHAVE_ALERTAS}');`);
}

module.exports = {
  abrirNavegador,
  abrirPagina,
  lerAlerta,
  lerAlertas,
  limparAlertas,
  URL_BASE,
  TEMPO_LIMITE
};
