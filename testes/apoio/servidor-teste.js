const fs = require('fs');
const os = require('os');
const path = require('path');
const jsonServer = require('json-server');

const PORTA = 3000;
const PASTA_CODIGO = path.join(__dirname, '..', '..', 'codigo');

function iniciarServidor() {
  const bancoTemporario = path.join(os.tmpdir(), `saidinhas-teste-${process.pid}.json`);
  fs.copyFileSync(path.join(PASTA_CODIGO, 'db.json'), bancoTemporario);

  const app = jsonServer.create();
  app.use(jsonServer.defaults({ static: path.join(PASTA_CODIGO, 'public'), logger: false }));
  app.use(jsonServer.router(bancoTemporario));

  return new Promise((resolve, reject) => {
    const servidor = app.listen(PORTA, () => resolve(servidor));
    servidor.on('error', reject);
  });
}

module.exports = { iniciarServidor, PORTA };

if (require.main === module) {
  iniciarServidor()
    .then(() => console.log(`Saidinhas (ambiente de teste) em http://localhost:${PORTA}`))
    .catch((erro) => {
      console.error(`Não foi possível iniciar o servidor na porta ${PORTA}: ${erro.message}`);
      process.exit(1);
    });
}
