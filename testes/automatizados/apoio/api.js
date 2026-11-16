const { URL_BASE } = require('./navegador');

async function buscarRegistros(colecao, filtro) {
  const consulta = new URLSearchParams(filtro).toString();
  const resposta = await fetch(`${URL_BASE}/${colecao}?${consulta}`);
  return resposta.json();
}

async function garantirRegistro(colecao, registro) {
  const existentes = await buscarRegistros(colecao, { email: registro.email });
  if (existentes.length > 0) {
    return existentes[0];
  }
  const resposta = await fetch(`${URL_BASE}/${colecao}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(registro)
  });
  return resposta.json();
}

async function removerRegistros(colecao, filtro) {
  const existentes = await buscarRegistros(colecao, filtro);
  for (const registro of existentes) {
    await fetch(`${URL_BASE}/${colecao}/${registro.id}`, { method: 'DELETE' });
  }
}

module.exports = { buscarRegistros, garantirRegistro, removerRegistros };
