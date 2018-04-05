const { asyncify } = require('asyncbox');
const Sampler = require('../../instruments/websampler');
const Bass = require('../../instruments/org2018');
const Director = require('../../lib/director');
const Promise = require('bluebird');

const TEMPO = 140;

const SCORE_ELECS = require('./score-elecs');
const CAPS_ELECS = {
  browserName: 'Safari',
};
const SCORE_DRUMS = require('./score-drums');
const CAPS_DRUMS = {
  platformName: 'iOS',
  platformVersion: '11.2',
  deviceName: 'iPhone 7',
  browserName: 'Safari',
  useNewWDA: true,
  noReset: true,
};

const SCORE_BASS = require('./score-bass');

async function run () {
  let eg = new Sampler({port: 4797, name: 'Electrics', endpoint: 'ghost-guitar', caps: CAPS_ELECS});
  let drums = new Sampler({port: 4723, name: 'Drums', endpoint: 'drums', caps: CAPS_DRUMS, tapByPos: true});
  let bass = new Bass({port: 4750, name: 'Bass', udid: 'ce041604b0facf2404'});
  let d = new Director(TEMPO, true);
  drums.analysis = d.addPart(drums, SCORE_DRUMS);
  eg.analysis = d.addPart(eg, SCORE_ELECS);
  bass.analysis = d.addPart(bass, SCORE_BASS);
  try {
    await d.assemble();
    await d.play();
  } finally {
    await d.dismiss();
  }
}

if (require.main === module) {
  asyncify(run);
}
