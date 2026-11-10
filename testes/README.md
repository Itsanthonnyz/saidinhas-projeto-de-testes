# Projeto de Testes – Saidinhas

Este diretório reúne os testes unitários e os testes funcionais automatizados do sistema **Saidinhas**, Trabalho Interdisciplinar desenvolvido em 2024/2 e escolhido pelo grupo como objeto de estudo do Projeto de Testes da disciplina **Teste e Manutenção de Software** (Sistemas de Informação – PUC Minas).

O código-fonte original do sistema permanece na pasta [`codigo/`](../codigo) e não é alterado pela execução dos testes.

## Organização

```plaintext
testes/
├── unitarios/                testes unitários (Jest + jsdom)
│   ├── apoio/                funções auxiliares dos testes unitários
│   └── login-usuario.test.js
├── automatizados/            testes funcionais automatizados (Selenium WebDriver)
│   ├── apoio/                funções auxiliares dos testes com navegador
│   └── login-usuario.test.js
├── apoio/                    servidor usado durante os testes automatizados
├── jest.config.js            definição da suíte de testes
└── package.json              dependências e comandos
```

| Categoria | Ferramenta | O que verifica |
|---|---|---|
| Testes unitários | Jest com jsdom | Cada função JavaScript isoladamente, com a API simulada |
| Testes funcionais automatizados | Selenium WebDriver | O sistema em funcionamento, pelo navegador, como um usuário faria |

Os testes funcionais manuais não ficam neste repositório: seus registros estão no Plano do Projeto de Testes.

## Pré-requisitos

- [Node.js](https://nodejs.org) versão 18 ou superior;
- Google Chrome instalado (o driver do navegador é obtido automaticamente pelo Selenium);
- porta `3000` livre, pois é nela que o sistema é executado durante os testes.

## Instalação

```bash
git clone https://github.com/Itsanthonnyz/saidinhas-projeto-de-testes.git
cd saidinhas-projeto-de-testes/testes
npm install
```

## Execução

Todos os comandos devem ser executados dentro da pasta `testes`.

| Comando | Resultado |
|---|---|
| `npm test` | Executa a suíte completa (unitários e automatizados) |
| `npm run test:unitarios` | Executa somente os testes unitários |
| `npm run test:automatizados` | Executa somente os testes com Selenium |
| `npm run servidor` | Sobe o sistema em `http://localhost:3000` para navegação e testes manuais |

Ao final de cada execução, o Jest apresenta a relação dos casos de teste com a indicação de aprovação ou falha de cada um.

## Suíte de testes

A suíte está definida no arquivo `jest.config.js`, que agrupa os testes em dois projetos, `unitarios` e `automatizados`. Dessa forma, um único comando (`npm test`) executa todos os casos, e cada categoria também pode ser executada separadamente.

Antes dos testes automatizados, a suíte inicia o sistema por conta própria, utilizando uma **cópia temporária** do arquivo `codigo/db.json`. Assim, os cadastros feitos durante os testes não modificam os dados originais do projeto, e cada execução parte sempre do mesmo estado. Por esse motivo, não é necessário, nem recomendado, deixar o servidor ligado em outro terminal enquanto os testes são executados.

## Como adicionar um novo teste

Os identificadores seguem o padrão adotado no Plano do Projeto de Testes: `CTU` para os testes unitários e `CTA` para os testes funcionais automatizados.

### Teste unitário

1. Crie um arquivo terminado em `.test.js` na pasta `unitarios/`.
2. Utilize `carregarPagina` para carregar a tela e o script que contém a função a ser testada.
3. Utilize `simularApi` para definir a resposta que a API devolveria, sem depender do servidor.
4. Chame a função e verifique o resultado com `expect`.

O arquivo `unitarios/login-usuario.test.js` serve de modelo.

### Teste funcional automatizado

1. Crie um arquivo terminado em `.test.js` na pasta `automatizados/`.
2. Utilize `abrirNavegador` uma vez por arquivo e `abrirPagina` no início de cada teste.
3. Interaja com a tela por meio dos comandos do Selenium (`findElement`, `sendKeys`, `click`).
4. Utilize `lerAlerta` para obter a mensagem exibida pelo sistema, ou `lerAlertas` para obter todas as mensagens exibidas.

O arquivo `automatizados/login-usuario.test.js` serve de modelo.

> **Observação sobre as mensagens do sistema.** O Saidinhas comunica o resultado das ações por meio de `alert()`. Durante os testes automatizados, essas mensagens são registradas em vez de abrirem a caixa de diálogo do navegador, o que torna a leitura estável. Por isso, as mensagens devem ser lidas sempre com `lerAlerta` ou `lerAlertas`.

## Equipe

| Integrante | Responsabilidade |
|---|---|
| Anthonny | Criação e configuração do repositório de testes |
| Geovanna | Testes unitários |
| Pedro | Testes funcionais automatizados |
| Vânia | Testes funcionais manuais |
| Gardenia | Plano do Projeto de Testes |
| Sara | Apresentação |
