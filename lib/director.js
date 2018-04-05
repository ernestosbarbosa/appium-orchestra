const Promise = require('bluebird');

class Director {

  constructor (tempo, swing = false) {
    this.tempo = tempo || 60;
    this.swing = swing;
    this.parts = [];
  }

  addPart (instrument, score) {
    if (typeof instrument === "undefined" || typeof score === "undefined") {
      throw new Error("Adding a part requires an instrument and a score");
    }

    let analysis = instrument.analyzeScore(score, this.tempo, this.swing);
    this.parts.push({instrument, score, analysis});
    return analysis;
  }

  validate () {
    if (this.parts.length < 1) {
      throw new Error("Nothing to play! use director.addPart()");
    }
    for (let part of this.parts) {
      let beats = part.analysis.totalBeats;
      let expectedBeats = this.parts[0].analysis.totalBeats;
      if (beats !== expectedBeats) {
        throw new Error(`Part for instrument '${part.instrument.name}' ` +
                        `had ${beats} beats but we expected ${expectedBeats}`);
      }
    }
  }

  async assemble () {
    this.validate();
    await Promise.all(this.parts.map(p => p.instrument.start()));
  }

  async play () {
    this.validate();
    let plays = [];
    for (let part of this.parts) {
      plays.push(part.instrument.playScore(part.score, this.tempo, this.swing));
    }

    await Promise.all(plays);
  }

  async dismiss () {
    try {
      await Promise.all(this.parts.map(p => p.instrument.driver.quit()));
    } catch (ign) {}
  }

}

module.exports = Director;
