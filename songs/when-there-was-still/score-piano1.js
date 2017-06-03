const INTRO = [
  'c8 G8 C8 G8^ e8v C8 G8 C8 '.repeat(2),
  'a8 E8 A8 E8 C8 A8 E8 A8 '.repeat(2)
];
const VERSE = [];
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
