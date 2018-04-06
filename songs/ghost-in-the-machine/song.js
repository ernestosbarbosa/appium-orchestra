const { asyncify } = require('asyncbox');
const Sampler = require('../../instruments/websampler');
const Bass = require('../../instruments/org2018');
const Director = require('../../lib/director');
const LyricWriter = require('../../instruments/writer');
const Promise = require('bluebird');

const TEMPO = 140;

const SCORE_ELECS = require('./score-elecs');
const CAPS_ELECS = {
  browserName: 'safari',
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
const LYRICS = require('./lyrics');

async function run () {
  let eg = new Sampler({
    port: 4444, name: 'Electrics', staticDelayMs: 100,
    endpoint: 'ghost-guitar', caps: CAPS_ELECS,
    rect: {width: 840, height: 525, x: 0, y: 525},
  });
  let drums = new Sampler({
    port: 4723, name: 'Drums', endpoint: 'drums',
    caps: CAPS_DRUMS, tapByPos: true
  });
  let bass = new Bass({
    port: 4750, name: 'Bass',
    udid: 'ce041604b0facf2404'
  });
  let lyrics = new LyricWriter({
    port: 4444, caps: {browserName: "chrome"},
    rect: {width: 840, height: 525, x: 0, y: 0},
  });
  let d = new Director(TEMPO, true);
  drums.analysis = d.addPart(drums, SCORE_DRUMS);
  eg.analysis = d.addPart(eg, SCORE_ELECS);
  bass.analysis = d.addPart(bass, SCORE_BASS);
  d.addLyrics(lyrics, LYRICS);
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
