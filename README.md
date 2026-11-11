# Projeto de Testes – Saidinhas

Trabalho técnico da disciplina **Teste e Manutenção de Software**, do curso de Sistemas de Informação da PUC Minas. O grupo elaborou e executou um Projeto de Testes sobre o **Saidinhas**, Trabalho Interdisciplinar concluído em 2024/2, contemplando testes unitários, testes funcionais automatizados com Selenium, testes funcionais manuais e a refatoração de dois métodos.

## Sobre o sistema testado

O Saidinhas é uma aplicação web que sugere restaurantes e locais de lazer aos usuários, com base em suas preferências e em filtros personalizados. A aplicação utiliza gamificação para engajar o público, propondo desafios e recompensas à medida que novos estabelecimentos e pratos são explorados, e oferece aos restaurantes uma forma de divulgar cardápio, promoções e reservas.

## Alunos integrantes da equipe

| Integrante | Responsabilidade |
|---|---|
| Anthony Augusto Neindite Nunes da Silva | Criação e configuração do repositório de testes |
| Beatriz Freitas Coura Silva | Plano do Projeto de Testes |
| Gardenia Iris Anselmo Rodrigues da Fonseca | Plano do Projeto de Testes |
| Geovanna Quezia Oliveira de Cassia | Testes unitários |
| Pedro Oliveira Coelho | Testes funcionais automatizados |
| Sara de Almeida Pasolini | Apresentação |
| Vânia Lourenço Gonçalves | Testes funcionais manuais |

## Professora responsável

* Roselene Henrique Pereira Costa

## Escopo do Projeto de Testes

| Categoria | Quantidade | Ferramenta | Localização |
|---|---|---|---|
| Testes unitários | 10 | Jest com jsdom | [`testes/unitarios`](testes/unitarios) |
| Testes funcionais automatizados | 10 | Selenium WebDriver | [`testes/automatizados`](testes/automatizados) |
| Testes funcionais manuais | 10 | Execução manual com registro de telas | Plano do Projeto de Testes |

## Organização do repositório

```plaintext
├── codigo/     código-fonte original do Saidinhas
├── docs/       documentação original do Trabalho Interdisciplinar
├── testes/     testes unitários, testes automatizados e suíte de testes
└── README.md   este arquivo
```

## Como executar os testes

É necessário ter o [Node.js](https://nodejs.org) (versão 18 ou superior) e o Google Chrome instalados.

```bash
git clone https://github.com/Itsanthonnyz/saidinhas-projeto-de-testes.git
cd saidinhas-projeto-de-testes/testes
npm install
npm test
```

O comando `npm test` executa a suíte completa. As instruções detalhadas, incluindo a execução separada de cada categoria, estão no [README da pasta de testes](testes/README.md).

## Entregas

* Plano do Projeto de Testes, elaborado a partir do template da disciplina;
* este repositório, com os arquivos de teste;
* vídeo narrativo com a execução dos testes e a apresentação dos códigos.

## Créditos do sistema original

O Saidinhas foi desenvolvido na disciplina Trabalho Interdisciplinar: Aplicações Web (2024/2), sob orientação do professor Clóvis Lemos Tavares, pelos alunos:

* Edimar Henrique Caetano
* Gabriel Henrique da Silva Santos
* Geovanna Quezia Oliveira de Cassia
* Krycia Figueiredo Azevedo
* Sara de Almeida Pasolini
* Yasmym Silva Cardoso

Repositório original: [ICEI-PUC-Minas-PBE-ADS-TI/saidinhas](https://github.com/ICEI-PUC-Minas-PBE-ADS-TI/pbe-si-ads-2024-2-tiaw-t1-pbe-si-ads-2024-2-tiaw-t1-saidinhas)
