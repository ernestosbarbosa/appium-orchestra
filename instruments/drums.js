const Instrument = require('../lib/instrument');
const path = require('path');
const Promise = require('bluebird');
const _ = require('lodash');

const WIDTH = 2048;
const HEIGHT = 1440;

function p2x (p) {
  return parseInt(p / 100 * WIDTH, 10);
}

function p2y (p) {
  return parseInt(p / 100 * HEIGHT, 10);
}

const POS_PCT_MAP = {
  k: [62.1, 75.7],
  s: [36.4, 76.4],
  h: [12.5, 76.2],
  i: [86.4, 26.7],
  c: [12.8, 24.5],
  ta: [86.9, 74.5],
  tb: [36.4, 23.3],
  tc: [61.9, 27.1],
};

let POS_MAP = {};
for (let [note, pcts] of _.toPairs(POS_PCT_MAP)) {
  POS_MAP[note] = [p2x(pcts[0]), p2y(pcts[1])];
}

class Drums extends Instrument {

  constructor (opts) {
    const defaults = {
      name: 'unnamed drums',
      caps: {
        platformName: 'Android',
        deviceName: 'Android Emulator',
        app: path.resolve(__dirname, '..', 'apps', 'souvey.musical_4.0.5.apk'),
        appPackage: 'souvey.musical',
        appActivity: '.activities.Drums',
        automationName: 'UiAutomator2',
        noReset: true
      }
    };
    super(Object.assign({}, defaults, opts));
  }

  async start () {
    await super.start();
    await Promise.delay(1000);
  }

  async playNote (note) {
    await this.tapPos(...POS_MAP[note]);
  }

  async playChord (chord) {
    const ps = chord.map(note => {
      if (!POS_MAP[note]) {
        throw new Error(`No such note '${note}'`);
      }
      return {x: POS_MAP[note][0], y: POS_MAP[note][1]};
    });
    await this.multiPos(ps);
  }

  async doShift (shift) {
    console.warn(`Tried to shift with drums: '${shift}'`);
  }
}

module.exports = Drums;
