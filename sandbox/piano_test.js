const { asyncify } = require('asyncbox');
const Piano = require('../instruments/piano');

async function run () {
  let p = new Piano();
  await p.start('localhost', 4723);
  await p.stop();
}

if (require.main === module) {
  asyncify(run);
}
