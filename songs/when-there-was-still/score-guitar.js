const BASIC_STRUM= 'x2 x2 x2 x2';
const HALF_STRUM = 'x2 x2';

const INTRO = [
  `${BASIC_STRUM}(Am)`,
  `${BASIC_STRUM}(C)`,
];
const VERSE = [
  `${BASIC_STRUM}(Am)`,
  `${BASIC_STRUM}(F)`,
  `${BASIC_STRUM}(C)`,
  `${HALF_STRUM}(G)`, `${HALF_STRUM}(C)`,
];
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
