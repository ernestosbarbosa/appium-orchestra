const BASIC_C = 'r4 E/G/C8 E/G/C4. E/G/C4 ';
const BASIC_AM = 'r4 E/A/C8 E/A/C4. E/A/C4 ';
const BASIC_F = 'r4 F/A/C8 F/A/C4. F/A/C4 ';
const BASIC_G = 'r4 d/G/B8 d/G/B4. d/G/B4 ';

const INTRO = [
  BASIC_C.repeat(2),
  BASIC_AM.repeat(2)
];
const VERSE = INTRO.concat([
  BASIC_F.repeat(2),
  BASIC_C,
  BASIC_G
]);
const BRIDGE = [];
const CHORUS = [];
const CHORUS_OUT = [];
const OUTRO = [];

const SONG = [].concat(
  INTRO,
  VERSE,
  VERSE,
  BRIDGE,
  CHORUS,
  CHORUS_OUT,

  INTRO,
  VERSE,
  BRIDGE,
  CHORUS,
  CHORUS_OUT,
  CHORUS_OUT,
  OUTRO
).join(" ");

module.exports = SONG;
