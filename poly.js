class Polybot {
  constructor () {
  }

  fromInput(rawInput, temperature) {
    if (rawInput && temperature) {
      return "Example from input.";
    }else{
      throw "Invalid parameters!";
    }
  }

  fromScratch() {
    return "Example from Scratch.";
  }

  continue(rawInput, temperature) {
    if (rawInput && temperature) {
      return "Example continuation.";
    }else{
      throw "Invalid parameters!";
    }
  }
}

module.exports = Polybot;