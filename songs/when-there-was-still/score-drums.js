const HALF_BASE = 'k/h4 s/h8 s8 k/h4 s/h4 '.repeat(4);

const INTRO = HALF_BASE;
const VERSE = HALF_BASE.repeat(2);
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
