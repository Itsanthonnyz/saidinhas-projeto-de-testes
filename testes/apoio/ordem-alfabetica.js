const Sequencer = require('@jest/test-sequencer').default;

class OrdemAlfabetica extends Sequencer {
  sort(testes) {
    return [...testes].sort((a, b) => a.path.localeCompare(b.path));
  }
}

module.exports = OrdemAlfabetica;
