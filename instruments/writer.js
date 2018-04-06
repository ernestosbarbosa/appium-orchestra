const Promise = require('bluebird');
const wd = require('wd');

class LyricWriter {
  constructor (opts) {
    const defaults = {
      name: 'Lyrics',
      beatsPerMeasure: 4,
      host: 'localhost',
      port: 9515,
      writerPort: 9090,
      textElId: 'box',
      rect: null,
      caps: {
        browserName: 'Chrome',
      }
    };
    Object.assign(this, defaults, opts);
  }

  async start () {
    this.driver = wd.promiseChainRemote(this.host, this.port);
    await this.driver.init(this.caps);
    if (this.rect) {
      await Promise.delay(1000);
      let handle = await this.driver.windowHandle();
      await this.driver.setWindowSize(this.rect.width, this.rect.height, handle);
      await this.driver.setWindowPosition(this.rect.x, this.rect.y, handle);
    }
    await this.driver.get(`http://localhost:${this.writerPort}`);
    await this.driver.setImplicitWaitTimeout(10000);
    this.textEl = await this.driver.elementById(this.textElId);
  }

  async writeLyrics (segments, tempo) {
    const beatDur = 60 / tempo;
    const msPerBar = beatDur * 1000 * this.beatsPerMeasure;
    for (let [bars, words] of segments) {
      let start = Date.now();
      let desiredDur = bars * msPerBar;
      let desiredEnd = start + desiredDur;
      if (words) {
        words = words.split(" ");
        let desiredDurPerWord = desiredDur / words.length;
        for (let word of words) {
          let innerStart = Date.now();
          let innerDesiredEnd = innerStart + desiredDurPerWord;
          await this.textEl.sendKeys(`${word} `);
          if (word.indexOf("*") !== -1) {
            await this.textEl.clear();
          }
          let innerActualEnd = Date.now();
          if (innerDesiredEnd > innerActualEnd) {
            await Promise.delay(innerDesiredEnd - innerActualEnd);
          }
        }
      }
      let actualEnd = Date.now();
      if (desiredEnd > actualEnd) {
        await Promise.delay(desiredEnd - actualEnd);
      }
    }
  }
}

module.exports = LyricWriter;
