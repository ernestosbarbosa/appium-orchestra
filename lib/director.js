const Promise = require('bluebird');

class Director {

  constructor (tempo) {
    this.tempo = tempo || 60;
    this.parts = [];
  }

  addPart (instrument, score) {
    if (typeof instrument === "undefined" || typeof score === "undefined") {
      throw new Error("Adding a part requires an instrument and a score");
    }

    this.parts.push({instrument, score});
  }

  async playScore () {
    if (this.parts.length < 1) {
      throw new Error("Nothing to play! use director.addPart()");
    }
    let plays = [];
    for (let part of this.parts) {
      part.instrument.tempo = this.tempo;
      plays.push(part.instrument.playScore(part.score));
    }

    await Promise.all(plays);
  }

}

module.exports = Director;
