const { asyncify } = require('asyncbox');
const Piano = require('../../instruments/piano');
const PianoGuitar = require('../../instruments/piano-guitar');
const Guitar = require('../../instruments/guitar');
const Director = require('../../lib/director');
const Promise = require('bluebird');

const PIANO1 = {
  name: 'piano1',
  udid: 'emulator-5554',
  port: 4723,
  uiaPort: 4725,
};

const SCORE_PIANO1 = require('./score-piano1');

const PIANO2 = {
  name: 'piano2',
  udid: 'emulator-5556',
  port: 4783,
  uiaPort: 4785,
  curOctave: 2,
};

const SCORE_PIANO2 = require('./score-piano2');

const GUITAR = {
  name: 'guitar',
  udid: 'emulator-5558',
  port: 5103,
  uiaPort: 5105,
  chordMap: {C: '1-1', F: '2-1', G: '3-1', Am: '4-1', Em: '1-2', E: '2-2'},
};

const SCORE_GUITAR = require('./score-guitar');

const TEMPO = 110;

async function run () {
  let p1 = new PianoGuitar(PIANO1);
  let p2 = new Piano(PIANO2);
  let g = new Guitar(GUITAR);
  let d = new Director(TEMPO);
  d.addPart(p1, SCORE_PIANO1);
  d.addPart(p2, SCORE_PIANO2);
  //d.addPart(g, SCORE_GUITAR);
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
