module.exports = {
  verbose: true,
  testSequencer: '<rootDir>/apoio/ordem-alfabetica.js',
  projects: [
    {
      displayName: 'unitarios',
      rootDir: __dirname,
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/unitarios/**/*.test.js']
    },
    {
      displayName: 'automatizados',
      rootDir: __dirname,
      testEnvironment: 'node',
      testMatch: ['<rootDir>/automatizados/**/*.test.js'],
      globalSetup: '<rootDir>/apoio/iniciar-servidor.js',
      globalTeardown: '<rootDir>/apoio/encerrar-servidor.js'
    }
  ]
};