const Promise = require('bluebird');

class Director {

  constructor (tempo, swing = false) {
    this.tempo = tempo || 60;
    this.swing = swing;
    this.parts = [];
    this.writer = null;
    this.lyrics = null;
  }

  addPart (instrument, score) {
    if (typeof instrument === "undefined" || typeof score === "undefined") {
      throw new Error("Adding a part requires an instrument and a score");
    }

    let analysis = instrument.analyzeScore(score, this.tempo, this.swing);
    this.parts.push({instrument, score, analysis});
    return analysis;
  }

  addLyrics (lyricWriter, lyrics) {
    this.writer = lyricWriter;
    this.lyrics = lyrics;
  }

  validate () {
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
    let starts = this.parts.map(p => p.instrument.start());
    if (this.writer) {
      starts.push(this.writer.start());
    }
    await Promise.all(starts);
  }

  async play () {
    this.validate();
    let plays = [];
    for (let part of this.parts) {
      plays.push(part.instrument.playScore(part.score, this.tempo, this.swing));
    }
    if (this.writer && this.lyrics) {
      plays.push(this.writer.writeLyrics(this.lyrics, this.tempo));
    }

    await Promise.all(plays);
  }

  async dismiss () {
    try {
      await Promise.all(this.parts.map(p => p.instrument.driver.quit()));
      if (this.writer) {
        await this.writer.driver.quit();
      }
    } catch (ign) {}
  }

}

module.exports = Director;
