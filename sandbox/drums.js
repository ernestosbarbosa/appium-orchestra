const { asyncify } = require('asyncbox');
const Drums = require('../instruments/drums');
const Promise = require('bluebird');

const BASE = 'k8 k8 s8 k8 ';
const OFF = 'k8 k8 s8 h8 ';
const SCORE = (BASE.repeat(3) + OFF).repeat(2);

async function run () {
  let d = new Drums({name: 'test'});
  await d.start();
  try {
    await d.playScore(SCORE, 80);
  } finally {
    await d.stop();
  }
}

if (require.main === module) {
  asyncify(run);
}
