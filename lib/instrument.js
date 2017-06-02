const Promise = require('bluebird');
const wd = require('wd');

const DURATIONS = {
  4: 1,
  2: 2,
  1: 4,
  8: 0.5,
  16: 0.25,
};

const NOTE_REGEX = /^([^\d]+)(\d+)(\.)?(v|\^)?$/;

class Instrument {

  constructor (curOctave = 0) {
    this.curOctave = curOctave;
  }

  async start (caps, host, port) {
    this.driver = wd.promiseChainRemote(host, port);
    await this.driver.init(caps);
  }

  async stop () {
    await this.driver.quit();
  }

  async tapPos (x, y, duration = null) {
    let action = new wd.TouchAction();
    if (duration) {
      action.longPress({x, y, duration: parseInt(duration * 1000, 10)});
      action.release();
    } else {
      action.tap({x, y});
    }
    await this.driver.performTouchAction(action);
  }

  async playNote (note) {
    throw new Error("Must implement playNote");
  }

  async chooseOctave (oct) {
    throw new Error("chooseOctave is not implemented for this instrument");
  }

  async playScore (score, tempo) {
    let notes = score.trim().split(" ");
    let fullNote, match, note, dur, beatDur, noteDur, start, desiredEnd, end,
      shift, half;
    for (let i = 0; i < notes.length; i++) {
      fullNote = notes[i];
      match = NOTE_REGEX.exec(fullNote);
      if (!match) {
        throw new Error(`Couldn't parse note data from ${fullNote}`);
      }
      [note, dur, half, shift] = match.slice(1);
      half = half === "." ? 1.5 : 1;
      beatDur = 60 / tempo;
      noteDur = beatDur * (DURATIONS[dur] * half);
      start = Date.now();
      desiredEnd = start + (noteDur * 1000);
      if (note !== 'r') {
        await this.playNote(note, noteDur);
        if (shift) {
          if (shift === 'v' && this.curOctave > 1) {
            await this.chooseOctave(this.curOctave - 1);
          } else if (shift === '^' && this.curOctave < 8) {
            await this.chooseOctave(this.curOctave + 1);
          }
        }
      }
      end = Date.now();
      if (desiredEnd > end) {
        await Promise.delay(desiredEnd - end);
      } else if (end > desiredEnd) {
        console.warn(`Note '${fullNote}' took too long to play!`);
      }
    }
  }
}

module.exports = Instrument;
