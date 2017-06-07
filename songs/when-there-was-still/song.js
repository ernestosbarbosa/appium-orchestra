const { asyncify } = require('asyncbox');
const Piano = require('../../instruments/piano');
const PianoGuitar = require('../../instruments/piano-guitar');
const Drums = require('../../instruments/drums');
const Speaker = require('../../lib/speaker');
const Director = require('../../lib/director');
const Promise = require('bluebird');

const GUITAR = {
  name: 'guitar',
  udid: 'emulator-5554',
  port: 4723,
  uiaPort: 4725,
};

const SCORE_GUITAR = require('./score-piano1');

const PIANO2 = {
  name: 'piano2',
  udid: 'emulator-5556',
  port: 4783,
  uiaPort: 4785,
  curOctave: 2,
};

const SCORE_PIANO2 = require('./score-piano2');

const DRUMS = {
  name: 'drums',
  udid: 'emulator-5558',
  port: 5103,
  uiaPort: 5105,
};

const SCORE_DRUMS = require('./score-drums');

const LYRICS = require('./lyrics');

const TEMPO = 108;

async function run () {
  let p1 = new PianoGuitar(GUITAR);
  let p2 = new Piano(PIANO2);
  let r = new Drums(DRUMS);
  let d = new Director(TEMPO);
  let s = new Speaker(LYRICS, '/tmp/song.txt', 'Alex', 120);
  d.addPart(p1, SCORE_GUITAR);
  d.addPart(p2, SCORE_PIANO2);
  d.addPart(r, SCORE_DRUMS);
  try {
    await d.assemble();
    await Promise.all([d.play(), s.speakLyrics(TEMPO)]);
  } finally {
    await d.dismiss();
  }
}

if (require.main === module) {
  asyncify(run);
}
