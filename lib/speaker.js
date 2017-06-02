const Promise = require('bluebird');
let { exec } = require('child_process');

exec = Promise.promisify(exec);

class Speaker {

  async speakLyrics (lyrics, tempo) {
    // lyrics look like:
    // [[BEATS, WORDS], ...]
    // e.g. [[4, "fitter, happier"], [4, "more productive"]]
    const beatDur = 60 / tempo;
    for (let line of lyrics) {
      let [beats, words] = line;
      let lineDur = beats * beatDur;
      let start = Date.now();
      let desiredEnd = start + (lineDur * 1000);
      await exec(`say "${words}"`);
      let end = Date.now();
      if (desiredEnd > end) {
        await Promise.delay(desiredEnd - end);
      } else if (end > desiredEnd) {
        console.warn(`Line '${words}' took too long to say!`);
      }
    }
  }
}

module.exports = Speaker;
