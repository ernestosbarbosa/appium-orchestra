const Instrument = require('../lib/instrument');
const path = require('path');

class Piano extends Instrument {

  constructor () {
    super(4);
  }

  async start (host, port, udid = null) {
    let caps = {
      platformName: 'Android',
      deviceName: 'Android Emulator',
      app: path.resolve(__dirname, '..', 'apps', 'souvey.musical.pro_6.0.7.apk'),
      automationName: 'UiAutomator2'
    };
    if (udid) {
      caps.udid = udid;
    }
    await super.start(caps, host, port);
  }

  async chooseOctave (oct) {
  }

  async playNote (note) {
  }
}

module.exports = Piano;
