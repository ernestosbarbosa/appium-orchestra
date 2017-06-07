const Instrument = require('../lib/instrument');
const path = require('path');
const Promise = require('bluebird');

const KEYS_PER_LAYER = 26;
const KEYBOARD_WIDTH = 2036;
const KEY_WIDTH = KEYBOARD_WIDTH / KEYS_PER_LAYER;
const KEYBOARD1_Y = 400; // keyboard one is on top (but lower pitch)
const KEYBOARD2_Y = 1050; // keyboard two is on bottom (but higher pitch)

const K1_OCT_DOWN_BIG = {x: 60, y: 180};
const K1_OCT_UP_SMALL = {x: 1910, y: 180};

const NOTE_INDEXES = { 'd#': 1, 'eb': 1, 'e': 2, 'e#': 3, 'f': 3, 'f#': 4,
  'gb': 4, 'g': 5, 'g#': 6, 'ab': 6, 'a': 7, 'a#': 8, 'bb': 8, 'b': 9, 'b#':
  10, 'c': 10, 'c#': 11, 'db': 11, 'd': 12, 'D#': 13, 'Eb': 13, 'E': 14, 'E#':
  15, 'F': 15, 'F#': 16, 'Gb': 16, 'G': 17, 'G#': 18, 'Ab': 18, 'A': 19, 'A#':
  20, 'Bb': 20, 'B': 21, 'B#': 22, 'C': 22, 'C#': 23, 'Db': 23, 'D': 24,
};

const DURATION_RATIO = 0.75; // what fraction of actual duration to hold key
const DURATION_THRESH = 0.25; // below which to not hold at all

function posForNote (note, keyboard) {
  if (keyboard !== 1 && keyboard !== 2) {
    throw new Error(`Keyboard '${keyboard}' was not 1 or 2`);
  }
  if (!NOTE_INDEXES[note]) {
    throw new Error(`Invalid note '${note}'`);
  }
  let pos = {y: (keyboard === 1 ? KEYBOARD1_Y : KEYBOARD2_Y)};
  // get right-side x value of key
  let xRight = NOTE_INDEXES[note] * KEY_WIDTH;
  // now set x position as in the middle of the key
  pos.x = parseInt(xRight - (KEY_WIDTH / 2), 10);
  return pos;
}


class Piano extends Instrument {

  constructor (opts) {
    const defaults = {
      curOctave: 1,
      name: 'unnamed piano',
      choosesInstrument: false,
      caps: {
        platformName: 'Android',
        deviceName: 'Android Emulator',
        app: path.resolve(__dirname, '..', 'apps', 'souvey.musical_4.0.5.apk'),
        appPackage: 'souvey.musical',
        appActivity: '.activities.Keyboard',
        automationName: 'UiAutomator2'
      }
    };
    super(Object.assign({}, defaults, opts));
  }

  async start () {
    await super.start();
    await this.driver.setImplicitWaitTimeout(5000);
    // tap the down octave button enough times to get to the bottom
    for (let i = 0; i < 2; i++) {
      await this.tapPos(K1_OCT_DOWN_BIG.x, K1_OCT_DOWN_BIG.y);
      await Promise.delay(200);
    }
    // now tap up octave fine-grained 4x to get to correct orientation
    for (let i = 0; i < 4; i++) {
      await this.tapPos(K1_OCT_UP_SMALL.x, K1_OCT_UP_SMALL.y);
      await Promise.delay(200);
    }
    // for some reason the keyboard needs time to warm up
    if (!this.choosesInstrument) {
      await Promise.delay(7000);
    }
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


  async playNote (note, durationSecs) {
    let pos = posForNote(note, this.curOctave);
    await this.tapPos(pos.x, pos.y, this.getRealDuration(durationSecs));
  }

  async playChord (chord, durationSecs) {
    const positions = chord.map(note => posForNote(note, this.curOctave));
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
    let score = 'c4 d8 E8 F8 G8 A8 B8 C4 ' +
                'D8^ e8 f8 g8 a8 b8 c4 ' +
                'd8 E8 F8 G8 A8 B8 C4 ' +
                'B8 A8 G8 F8 E8 d8 c4 ' +
                'b8 a8 g8 f8 e8v D8 C4 ' +
                'B8 A8 G8 F8 E8 d8 c4';
    await this.playScore(score, 80);
  }
}

module.exports = Piano;
