const { asyncify } = require('asyncbox');
const Guitar = require('../instruments/guitar');
const Promise = require('bluebird');

const SCORE = 'x2 x2(Am) x2 x2(F) x2 x2(C) x2(G) x2 ';

async function run () {
  const chordMap = {C: '1-1', F: '2-1', G: '3-1', Am: '4-1', Em: '1-2', E: '2-2'};
  let g = new Guitar({name: 'test', chordMap});
  await g.start();
  try {
    await g.playScore(SCORE, 100);
  } finally {
    await g.stop();
  }
}

if (require.main === module) {
  asyncify(run);
}
