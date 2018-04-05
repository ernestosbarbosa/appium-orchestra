const Instrument = require('../lib/instrument');
const path = require('path');
const Promise = require('bluebird');

const KEY_Y_PCT = 0.61;
const NUM_KEYS = 24;

const NOTE_INDEXES = {
'c': 1, 'c#': 2, 'db': 2, 'd': 3, 'd#': 4, 'eb': 4, 'e': 5, 'e#': 6, 'f': 6,
'f#': 7, 'gb': 8, 'g': 8, 'g#': 9, 'ab': 9, 'a': 10, 'a#': 11, 'bb': 11, 'b':
  12, 'b#': 13, 'C': 13, 'C#': 14, 'Db': 14, 'D': 15, 'D#': 16, 'Eb': 16, 'E':
  17, 'E#': 18, 'F': 18, 'F#': 19, 'Gb': 19, 'G': 20, 'G#': 21, 'Ab': 21, 'A':
  22, 'A#': 23, 'Bb': 23, 'B': 24
};

const DURATION_RATIO = 0.75; // what fraction of actual duration to hold key
const DURATION_THRESH = 0.25; // below which to not hold at all

const INST_CHOOSER_X_PCT = 0.5;
const INST_CHOOSER_Y_PCT = 0.0739;

const OCT_X_PCT = 0.773;
const OCT_Y_PCT_RD = 0.134;
const OCT_Y_PCT_EMU = 0.209;

const OCT_DOWN_X_PCT_EMU = 0.906;
const OCT_DOWN_Y_PCT_EMU = 0.211;
const OCT_DOWN_X_PCT_RD = 0.707;
const OCT_DOWN_Y_PCT_RD = 0.207;

class Org2018 extends Instrument {

  constructor (opts) {
    const defaults = {
      curOctave: 1,
      realDevice: true,
      name: 'unnamed piano',
      caps: {
        platformName: 'Android',
        deviceName: 'Android Emulator',
        app: path.resolve(__dirname, '..', 'apps', 'org-2018-2018-1-5-1.apk'),
        appPackage: 'com.sofeh.android.musicstudio3',
        appActivity: 'com.sofeh.android.musicstudio3.SplashActivity',
        appWaitActivity: 'com.sofeh.android.musicstudio3.MainActivity',
        noReset: true,
        automationName: 'UiAutomator2'
      }
    };
    super(Object.assign({}, defaults, opts));
  }

  async chooseInstrument () {
    for (let i = 0; i < 2; i++) {
      await this.tapPos(
        INST_CHOOSER_X_PCT * this.width,
        INST_CHOOSER_Y_PCT * this.height
      );
      await Promise.delay(750);
    }
    let [octXPct, octYPct] = this.realDevice ?
      [OCT_X_PCT, OCT_Y_PCT_RD] :
      [OCT_X_PCT, OCT_Y_PCT_EMU];
    let [octDownXPct, octDownYPct] = this.realDevice ?
      [OCT_DOWN_X_PCT_RD, OCT_DOWN_Y_PCT_RD] :
      [OCT_DOWN_X_PCT_EMU, OCT_DOWN_Y_PCT_EMU];
    await this.tapPos(octXPct * this.width, octYPct * this.height);
    for (let i = 0; i < 3; i++) {
      await this.tapPos(
        octDownXPct * this.width,
        octDownYPct * this.height
      );
    }
    await Promise.delay(750);
  }

  async start () {
    await super.start();
    await this.driver.setImplicitWaitTimeout(5000);
    let {width, height} = await this.driver.getWindowSize();
    this.width = width;
    this.height = height;
    this.keyWidth = width / NUM_KEYS;
    this.keyY = KEY_Y_PCT * height;
    await Promise.delay(6000);
    await this.chooseInstrument();
  }

  async chooseOctave (oct) {
    this.curOctave = oct;
  }

  getRealDuration (durationSecs) {
    durationSecs *= DURATION_RATIO;
    if (durationSecs < DURATION_THRESH) {
      // if it's going to be quite short, just bypass duration altogether
      durationSecs = null;
    }
    return durationSecs;
  }

  posForNote (note) {
    if (!NOTE_INDEXES[note]) {
      throw new Error(`Invalid note '${note}'`);
    }
    let pos = {y: this.keyY};
    // get right-side x value of key
    let xRight = NOTE_INDEXES[note] * this.keyWidth;
    // now set x position as in the middle of the key
    pos.x = parseInt(xRight - (this.keyWidth / 2), 10);
    return pos;
  }


  async playNote (note, durationSecs) {
    let pos = this.posForNote(note);
    //await this.tapPos(pos.x, pos.y, this.getRealDuration(durationSecs));
    // ignore duration for now, seems to be messed up
    await this.tapPos(pos.x, pos.y);
  }

  async playChord (chord, durationSecs) {
    const positions = chord.map(note => this.posForNote(note));
    await this.multiPos(positions, this.getRealDuration(durationSecs));
  }

  async doShift (shift) {
    if (shift === 'v' && this.curOctave > 1) {
      await this.chooseOctave(this.curOctave - 1);
    } else if (shift === '^' && this.curOctave < 8) {
      await this.chooseOctave(this.curOctave + 1);
    }
  }

  async playScale () {
    let score = 'c4 d8 e8 f8 g8 a8 b8 C4 ' +
                'D8 E8 F8 G8 A8 B8 C4 ' +
                'B8 A8 G8 F8 E8 D8 C4 ' +
                'b8 a8 g8 f8 e8 d8 c4 ';
    await this.playScore(score, 80);
  }
}

module.exports = Org2018;
