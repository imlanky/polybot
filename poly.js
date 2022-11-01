const _fromInput = require('./models/frominput.js');
const _continue = require('./models/continue.js');
// ^ these models are not public in the repo

class Polybot {
  constructor () {
  }

  fromInput(rawInput, temperature) {
    if (rawInput && temperature) {
      return _fromInput(rawInput, null, temperature);
    }else{
      throw "Invalid parameters!";
    }
  }

  continue(rawInput, temperature) {
    if (rawInput && temperature) {
      return _continue(rawInput, null, temperature);
    }else{
      throw "Invalid parameters!";
    }
  }
}

module.exports = Polybot;