module.exports = async () => {
  const servidor = globalThis.__SERVIDOR_SAIDINHAS__;
  if (servidor) {
    await new Promise((resolve) => servidor.close(resolve));
  }
};
