const Promise = require('bluebird');
const wd = require('wd');

const DURATIONS = {
  0: 8,
  1: 4,
  2: 2,
  4: 1,
  8: 0.5,
  16: 0.25,
};

const NOTE_REGEX = /^([^{\d]+)(\d+)(\.)?([^ ]+)?$/;
const SAMPLE_REGEX = /^({[^}]+})(\d+)(\.)?$/;

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
    //this.caps.newCommandTimeout = 0;
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

  analyzeScore (score, tempo, swing = false) {
    const swingDelayMs = ((60 / tempo / 2) - (60 / tempo / 3)) * 1000;
    let analysis = {notes: []};
    let totalBeats = 0;
    let timeFromStart = 0;
    const notes = score.trim().split(" ").filter(n => n.trim());
    const beatDur = 60 / tempo;
    let delayNextNoteForSwing = false;
    for (let i = 0; i < notes.length; i++) {
      const fullNote = notes[i].trim();
      let match = NOTE_REGEX.exec(fullNote);
      if (!match) {
        match = SAMPLE_REGEX.exec(fullNote);
        if (!match) {
          throw new Error(`Couldn't parse note data from ${fullNote}`);
        }
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
      let startsAt = timeFromStart;
      let noteDur = beatDur * beats;
      let delayedForSwingMs = 0, extendedForSwingMs = 0;
      if (delayNextNoteForSwing) {
        // this is the swung beat, so start it a little later and make its
        // duration a little less
        startsAt += swingDelayMs;
        delayedForSwingMs = swingDelayMs;
        delayNextNoteForSwing = false;
      }

      totalBeats += beats;

      if (swing && (totalBeats % Math.floor(totalBeats) === 0.5)) {
        // if we're in swing mode and after we end this beat we will fall
        // on an upbeat, then we should extend the duration of this beat a bit
        // upbeat, then we should delay it a bit, and adjust duration
        extendedForSwingMs = swingDelayMs;
        delayNextNoteForSwing = true;
      }
      const actualDuration = noteDur - (delayedForSwingMs / 1000) + (extendedForSwingMs / 1000);
      analysis.notes.push({
        note,
        fullNote,
        chord,
        shift,
        durationSecs: actualDuration,
        startsAt,
        delayedForSwingMs,
        extendedForSwingMs,
      });
      timeFromStart += actualDuration * 1000;
    }
    analysis.totalBeats = totalBeats;
    analysis.totalTime = timeFromStart;
    return analysis;
  }

  async playScore (score, tempo, swing = false) {
    let analysis = this.analyzeScore(score, tempo, swing);
    const scoreStartTime = Date.now();
    for (let noteSpec of analysis.notes) {
      let {note, chord, fullNote, shift, durationSecs, startsAt} = noteSpec;
      let latenessMs = 0;
      const start = Date.now();
      if (start > (startsAt + scoreStartTime)) {
        latenessMs = start - (startsAt + scoreStartTime);
        if (latenessMs > LATENESS_TOLERANCE) {
          console.warn(`Instrument ${this.name} is ${latenessMs}ms ` +
                       `late playing note ${note}! Skipping`);
          note = 'r';
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
          await this.doShift(shift);
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
