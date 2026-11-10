const { iniciarServidor } = require('./servidor-teste');

module.exports = async () => {
  globalThis.__SERVIDOR_SAIDINHAS__ = await iniciarServidor();
};
