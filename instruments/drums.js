const Instrument = require('../lib/instrument');
const path = require('path');
const Promise = require('bluebird');
const _ = require('lodash');

const WIDTH = 2048;
const HEIGHT = 1440;

const POS_PCT_MAP = {
  'k': [51.8, 62.9],
  's': [32.1, 45.8],
  'h': [13.3, 30.8],
  'i': [77.9, 21.2],
  'c': [29.2, 11.5],
  'ta': [44.8, 22.5],
  'tb': [60.3, 20.2],
  'tc': [73.5, 51.1],
};

function p2x (p) {
  return parseInt(p / 100 * WIDTH, 10);
}

function p2y (p) {
  return parseInt(p / 100 * HEIGHT, 10);
}

let POS_MAP = {};
for (let [note, pcts] of _.toPairs(POS_PCT_MAP)) {
  POS_MAP[note] = [p2x(pcts[0]), p2y(pcts[1])];
}

const STARTUP_POS_PCT = {
  drumBeats: [49.6, 45.6],
  style: [59.7, 24],
  level: [78.2, 24],
  substyle: [93.2, 24],
};

const STARTUP_POS_MAP = {};
for (let [btn, pcts] of _.toPairs(STARTUP_POS_PCT)) {
  STARTUP_POS_MAP[btn] = [p2x(pcts[0]), p2y(pcts[1])];
}


class Drums extends Instrument {

  constructor (opts) {
    const defaults = {
      name: 'unnamed drums',
      caps: {
        platformName: 'Android',
        deviceName: 'Android Emulator',
        app: path.resolve(__dirname, '..', 'apps', 'master-drum-beats-1.6.apk'),
        appPackage: 'com.RIGZ_PRODUCIONS.Master_Drum_Beats',
        appActivity: 'com.unity3d.player.UnityPlayerActivity',
        automationName: 'UiAutomator2',
        noReset: true
      }
    };
    super(Object.assign({}, defaults, opts));
  }

  async start () {
    await super.start();
    await this.driver.setImplicitWaitTimeout(5000);
    let el = await this.driver.elementByXPath("//android.widget.TextView[@text='Master Drum Beats']");
    await el.click();
    await Promise.delay(4000);
    await this.tapPos(...STARTUP_POS_MAP.drumBeats);
    await Promise.delay(1000);
    await this.tapPos(...STARTUP_POS_MAP.style);
    await Promise.delay(2000);
    await this.tapPos(...STARTUP_POS_MAP.level);
    await Promise.delay(2000);
    await this.tapPos(...STARTUP_POS_MAP.substyle);
    await Promise.delay(1000);
  }

  async playNote (note) {
    await this.tapPos(...POS_MAP[note]);
  }
}

module.exports = Drums;
