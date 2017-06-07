const HALF_BASE_1 = 'k/h/c4 s/h8 s8 k/h4 s/h4 ';
const HALF_BASE_2 = 'k/h4 s/h8 s8 k/h4 s/h8 s8 ';
const HALF_BASE = (HALF_BASE_1 + HALF_BASE_2).repeat(2);

const INTRO = HALF_BASE;
const VERSE = HALF_BASE.repeat(2);
const BRIDGE = VERSE;
const CHORUS = [
  'k/c4 k/c4 s8 k8 k8 s/ta8 '.repeat(16)
];
const CHORUS_OUT = VERSE;
const INTRO_2 = HALF_BASE_2.repeat(2);
const OUTRO = INTRO_2.concat([
  HALF_BASE_1,
  'k/h/c1 r1'
]);

const SONG = [].concat(
  INTRO,
  VERSE,
  VERSE,
  BRIDGE,
  CHORUS,
  CHORUS_OUT,

  INTRO_2,
  VERSE,
  BRIDGE,
  CHORUS,
  CHORUS_OUT,
  CHORUS_OUT,
  OUTRO
).join(" ");

module.exports = SONG;
