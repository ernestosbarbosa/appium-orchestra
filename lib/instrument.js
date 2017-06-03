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

const LATENESS_TOLERANCE = 50;

class Instrument {

  constructor (opts) {
    const defaults = {
      name: 'unnamed instrument',
      curOctave: 0,
      host: 'localhost',
      port: 4723,
      caps: {},
    };
    Object.assign(this, defaults, opts);
    if (this.udid) {
      this.caps.udid = this.udid;
      delete this.udid;
    }
    if (this.uiaPort) {
      this.caps.systemPort = this.uiaPort;
      delete this.uiaPort;
    }
  }

  async start () {
    this.driver = wd.promiseChainRemote(this.host, this.port);
    await this.driver.init(this.caps);
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

  async multiPos (positions, duration = null) {
    let actions = [];
    let multi = new wd.MultiAction();
    duration = parseInt((duration || 0) * 1000, 10);
    for (let pos of positions) {
      let action = new wd.TouchAction();
      action.longPress({x: pos.x, y: pos.y, duration});
      action.release();
      actions.push(action);
    }
    multi.add(...actions);
    await this.driver.performMultiAction(multi);
  }

  async playNote (note) {
    throw new Error("Must implement playNote");
  }

  async playChord (chord) {
    throw new Error("Must implement playChord");
  }

  async chooseOctave (oct) {
    throw new Error("chooseOctave is not implemented for this instrument");
  }

  analyzeScore (score, tempo) {
    let analysis = {notes: []};
    let totalBeats = 0;
    let timeFromStart = 0;
    const notes = score.trim().split(" ").filter(n => n.trim());
    const beatDur = 60 / tempo;
    for (let i = 0; i < notes.length; i++) {
      const fullNote = notes[i].trim();
      const match = NOTE_REGEX.exec(fullNote);
      if (!match) {
        throw new Error(`Couldn't parse note data from ${fullNote}`);
      }
      let [note, dur, half, shift] = match.slice(1);
      let chord = note.split("/");
      if (chord.length === 1) {
        chord = null;
      } else {
        note = null;
      }
      half = half === "." ? 1.5 : 1;
      const beats = DURATIONS[dur] * half;
      const noteDur = beatDur * beats;
      analysis.notes.push({
        note,
        fullNote,
        chord,
        shift,
        durationSecs: noteDur,
        startsAt: timeFromStart
      });
      totalBeats += beats;
      timeFromStart += noteDur * 1000;
    }
    analysis.totalBeats = totalBeats;
    analysis.totalTime = timeFromStart;
    return analysis;
  }

  async playScore (score, tempo) {
    let analysis = this.analyzeScore(score, tempo);
    const scoreStartTime = Date.now();
    for (let noteSpec of analysis.notes) {
      let {note, chord, fullNote, shift, durationSecs, startsAt} = noteSpec;
      let latenessMs = 0;
      const start = Date.now();
      if (start > (startsAt + scoreStartTime)) {
        latenessMs = start - (startsAt + scoreStartTime);
        if (latenessMs > LATENESS_TOLERANCE) {
          console.warn(`Instrument ${this.name} is ${latenessMs}ms ` +
                       `late playing note ${note}!`);
        }
      }
      const desiredEnd = start + (durationSecs * 1000);
      if (note !== 'r') {
        if (chord) {
          await this.playChord(chord, durationSecs);
        } else {
          await this.playNote(note, durationSecs);
        }
        if (shift) {
          if (shift === 'v' && this.curOctave > 1) {
            await this.chooseOctave(this.curOctave - 1);
          } else if (shift === '^' && this.curOctave < 8) {
            await this.chooseOctave(this.curOctave + 1);
          }
        }
      }
      const end = Date.now();
      if (desiredEnd > end) {
        const desiredDelay = desiredEnd - end - latenessMs;
        if (desiredDelay > 0) {
          await Promise.delay(desiredDelay);
        }
      } else if (end > desiredEnd) {
        console.warn(`Note '${fullNote}' took too long to play!`);
      }
    }
  }
}

module.exports = Instrument;
