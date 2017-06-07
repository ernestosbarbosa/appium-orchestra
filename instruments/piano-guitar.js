const Piano = require('./piano');
const Promise = require('bluebird');

const INST_CHOOSER_X = 610;
const INST_CHOOSER_Y = 60;
const GUITAR_Y = 400;

class PianoGuitar extends Piano {

  async chooseInstrument () {
    await this.tapPos(INST_CHOOSER_X, INST_CHOOSER_Y);
    await Promise.delay(1000);
    await this.tapPos(INST_CHOOSER_X, GUITAR_Y);
  }
}

module.exports = PianoGuitar;
