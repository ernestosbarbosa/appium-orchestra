const Promise = require('bluebird');
let { exec } = require('child_process');
let { write, open, close } = require('fs');

exec = Promise.promisify(exec);
write = Promise.promisify(write);
open = Promise.promisify(open);

const LATENCY = 200; // time it takes to spin up 'say'

class Speaker {

  constructor (lyrics, file, voice = 'Vicki', defaultWpm = 120) {
    this.lyrics = lyrics;
    this.voice = voice;
    this.defaultWpm = defaultWpm;
    this.filePath = file;
  }

  async speakLyrics (tempo) {
    // lyrics look like:
    // [[BEATS, WORDS, (OPTIONAL)WORD_PER_MIN], ...]
    // e.g. [[4, "fitter, happier"], [4, "more productive", 120]]
    const beatDur = 60 / tempo;
    let first = true;
    let fd = await open(this.filePath, 'w');
    for (let line of this.lyrics) {
      let [beats, words, wpm] = line;
      let lineDur = beats * beatDur;
      let start = Date.now();
      let desiredEnd = start + (lineDur * 1000);
      if (first) {
        first = false;
        desiredEnd -= LATENCY;
      }
      if (words) {
        wpm = wpm || this.defaultWpm;
        await exec(`say -v ${this.voice} -r ${wpm} "${words}"`);
        await write(fd, words + " ");
      }
      let end = Date.now();
      if (desiredEnd > end) {
        await Promise.delay(desiredEnd - end);
      } else if (end > desiredEnd) {
        console.warn(`Line '${words}' took too long to say!`);
      }
    }
    await close(fd);
  }
}

module.exports = Speaker;
