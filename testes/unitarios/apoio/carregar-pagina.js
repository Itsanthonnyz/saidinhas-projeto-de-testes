const fs = require('fs');
const path = require('path');

const PASTA_PUBLICA = path.join(__dirname, '..', '..', '..', 'codigo', 'public');

function carregarPagina(caminhoHtml, caminhoScript) {
  const html = fs.readFileSync(path.join(PASTA_PUBLICA, caminhoHtml), 'utf8');
  const corpo = html.replace(/<script[\s\S]*?<\/script>/gi, '');
  document.documentElement.innerHTML = corpo;

  const script = fs.readFileSync(path.join(PASTA_PUBLICA, caminhoScript), 'utf8');
  (0, eval)(script);
}

function simularApi(resposta, ok = true) {
  global.fetch = jest.fn().mockResolvedValue({
    ok,
    statusText: ok ? 'OK' : 'Erro',
    json: async () => resposta
  });
  return global.fetch;
}

module.exports = { carregarPagina, simularApi };
