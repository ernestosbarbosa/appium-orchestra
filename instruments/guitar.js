const Instrument = require('../lib/instrument');
const path = require('path');
const Promise = require('bluebird');
const _ = require('lodash');
const wd = require('wd');

const COLS = {1: 100, 2: 282};
const ROWS = {1: 240, 2: 364, 3: 520, 4: 663};

const STRUM_X = 728;
const STRUM_START_Y = 126;
const STRUM_END_Y = 666;
const STRUM_MS = 200;

const REMIND_X = 591;
const REMIND_Y = 474;

class Guitar extends Instrument {

  constructor (opts) {
    const defaults = {
      name: 'unnamed guitar',
      caps: {
        platformName: 'Android',
        deviceName: 'Android Emulator',
        app: path.resolve(__dirname, '..', 'apps', 'real-guitar-4.21.apk'),
        noReset: true, // this app has chords set by user so don't blow them away
        automationName: 'UiAutomator2'
      }
    };
    super(Object.assign({}, defaults, opts));
    if (!this.chordMap) {
      throw new Error("Must send in 'chordMap' with opts");
    }
    this.chordPosMap = {};
    for (let [chord, rowColSpec] of _.toPairs(this.chordMap)) {
      let [row, col] = rowColSpec.split('-');
      this.chordPosMap[chord] = {x: COLS[col], y: ROWS[row]};
    }
  }

  async start () {
    await super.start();
    await Promise.delay(4000); // let remind dialog come up
    await this.tapPos(REMIND_X, REMIND_Y); // get rid of remind dialog
    await Promise.delay(5000);
  }

  async doShift (shift) {
    // shift is changing a chord, should be of form "(<chord>)"
    const chordRegex = /\(([^\)]+)\)/;
    const match = shift.match(chordRegex);
    if (!match) {
      throw new Error(`Couldn't match chord from shift ${shift}`);
    }
    const chord = match[1];
    const {x, y} = this.chordPosMap[chord];
    await this.tapPos(x, y);
  }

  async playNote () {
    // playing a note is strumming. we don't even care what the note is since
    // the chord is set in 'doShift'
    let action = new wd.TouchAction();
    action.press({x: STRUM_X, y: STRUM_START_Y})
      .wait({ms: STRUM_MS})
      .moveTo({x: STRUM_X, y: STRUM_END_Y})
      .release();
    await this.driver.performTouchAction(action);
  }

}

module.exports = Guitar;
