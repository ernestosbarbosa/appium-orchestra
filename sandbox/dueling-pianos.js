const { asyncify } = require('asyncbox');
const Piano = require('../instruments/piano');
const Director = require('../lib/director');
const Promise = require('bluebird');


const THEME = [
  'r2. E8 F8',
  'G4 E4 F4 d4',
  'E4 c4 d4 r4'
];

const P1_SCORE = THEME.concat([
  'r1', 'r1'
]);

const P2_SCORE = [
  'r1',
  'r1'
].concat(THEME);

async function run () {
  let p1 = new Piano({name: 'piano1', port: 4723, udid: 'emulator-5554',
    uiaPort: 4725});
  let p2 = new Piano({name: 'piano2', port: 4783, udid: 'emulator-5556',
    uiaPort: 4785});
  let d = new Director(120);
  d.addPart(p1, P1_SCORE.join(" "));
  d.addPart(p2, P2_SCORE.join(" "));
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
