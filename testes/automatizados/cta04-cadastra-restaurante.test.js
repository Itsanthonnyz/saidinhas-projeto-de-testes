const { By } = require('selenium-webdriver');
const {
  abrirNavegador,
  abrirPagina,
  clicarNoLink,
  abrirModal,
  preencherCampos,
  aguardarPagina,
  lerAlerta
} = require('./apoio/navegador');
const { buscarRegistros, removerRegistros } = require('./apoio/api');
const { RESTAURANTE } = require('./apoio/dados-de-teste');

let navegador;

jest.setTimeout(60000);

beforeAll(async () => {
  navegador = await abrirNavegador();
});

afterAll(async () => {
  if (navegador) {
    await navegador.quit();
  }
});

describe('CTA04 - cadastro de restaurante', () => {
  beforeAll(async () => {
    await removerRegistros('usuariosRestaurante', { email: RESTAURANTE.email });
  });

  test('cadastra um restaurante com dados válidos e retorna à tela de login', async () => {
    await abrirPagina(navegador, '/index.html');
    await clicarNoLink(navegador, 'Tenho um CNPJ');
    await aguardarPagina(navegador, '/modulos/login/loginRestaurante.html');
    await abrirModal(navegador, 'Registrar', 'registerModal');

    await preencherCampos(navegador, {
      txt_nome_restaurante: RESTAURANTE.nome,
      txt_cnpj: RESTAURANTE.cnpj,
      txt_email_restaurante: RESTAURANTE.email,
      cep_restaurante: RESTAURANTE.cep,
      txt_logradouro_restaurante: RESTAURANTE.logradouro,
      txt_bairro_restaurante: RESTAURANTE.bairro,
      txt_cidade_restaurante: RESTAURANTE.cidade,
      txt_estado_restaurante: RESTAURANTE.estado,
      txt_senha_restaurante: RESTAURANTE.senha,
      txt_senha2_restaurante: RESTAURANTE.senha
    });
    await navegador.findElement(By.css('#register-form button[type="submit"]')).click();

    expect(await lerAlerta(navegador)).toBe('Restaurante cadastrado com sucesso!');
    await aguardarPagina(navegador, '/modulos/login/loginRestaurante.html');

    const cadastrados = await buscarRegistros('usuariosRestaurante', { email: RESTAURANTE.email });
    expect(cadastrados).toHaveLength(1);
    expect(cadastrados[0].nome).toBe(RESTAURANTE.nome);
  });
});
