const BASIC_C = 'r4 E/G/C8 E/G/C4. E/G/C4 ';
const BASIC_AM = 'r4 E/A/C8 E/A/C4. E/A/C4 ';
const BASIC_F = 'r4 F/A/C8 F/A/C4. F/A/C4 ';
const BASIC_G = 'r4 d/G/B8 d/G/B4. d/G/B4 ';
const BASIC_EM = 'r4 E/G/B8 E/G/B4. E/G/B4 ';
const BASIC_E = 'r4 E/G#/B8 E/G#/B4. E/G#/B4 ';
const BASIC_DM = 'r4 F/A/D8 F/A/D4. F/A/D4 ';

const INTRO = [
  BASIC_C.repeat(2),
  BASIC_AM.repeat(2)
];
const VERSE = INTRO.concat([
  BASIC_F.repeat(2),
  BASIC_C,
  BASIC_G
]);
const BRIDGE = [
  BASIC_EM.repeat(2),
  BASIC_E.repeat(2),
  BASIC_DM,
  BASIC_AM,
  BASIC_E.repeat(2)
];
const CHORUS = [
  BASIC_F.repeat(2),
  BASIC_C.repeat(2),
  BASIC_F.repeat(2),
  BASIC_AM, BASIC_G,
  BASIC_F.repeat(2),
  BASIC_C.repeat(2),
  BASIC_F.repeat(2),
  BASIC_AM, BASIC_E
];
const CHORUS_OUT = [
  BASIC_F.repeat(2),
  BASIC_AM.repeat(2),
  BASIC_F.repeat(2),
  BASIC_AM, BASIC_G
];
const INTRO_2 = BASIC_C.repeat(2);
const OUTRO = INTRO_2.concat([
  BASIC_C,
  'E/G/C1 E/G/C1'
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
