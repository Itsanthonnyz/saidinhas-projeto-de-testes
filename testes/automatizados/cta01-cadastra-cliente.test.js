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
const { CLIENTE } = require('./apoio/dados-de-teste');

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

describe('CTA01 - cadastro de cliente', () => {
  beforeAll(async () => {
    await removerRegistros('usuarioCliente', { email: CLIENTE.email });
  });

  test('cadastra um cliente com dados válidos e abre as perguntas de preferências', async () => {
    await abrirPagina(navegador, '/index.html');
    await clicarNoLink(navegador, 'Buscar Restaurantes');
    await aguardarPagina(navegador, '/modulos/login/loginUsuario.html');
    await abrirModal(navegador, 'Registrar', 'registerModal');

    await preencherCampos(navegador, {
      txt_nome_completo: CLIENTE.nome,
      txt_data_de_nascimento: CLIENTE.data,
      txt_cpf: CLIENTE.cpf,
      txt_email_usuario: CLIENTE.email,
      cep_usuario: CLIENTE.cep,
      txt_logradouro_usuario: CLIENTE.logradouro,
      txt_bairro_usuario: CLIENTE.bairro,
      txt_cidade_usuario: CLIENTE.cidade,
      txt_estado_usuario: CLIENTE.estado,
      txt_senha_usuario: CLIENTE.senha,
      txt_senha2_usuario: CLIENTE.senha
    });
    await navegador.findElement(By.css('#register-form button[type="submit"]')).click();

    expect(await lerAlerta(navegador)).toBe('Usuário cadastrado com sucesso!');
    await aguardarPagina(navegador, '/modulos/cliente/antespergunta.html');

    const cadastrados = await buscarRegistros('usuarioCliente', { email: CLIENTE.email });
    expect(cadastrados).toHaveLength(1);
    expect(cadastrados[0].nome).toBe(CLIENTE.nome);
  });
});
