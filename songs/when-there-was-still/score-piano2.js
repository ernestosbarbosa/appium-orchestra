const INTRO = [
  'r4 G8 E8 G8 G4 E4 r8 G8 E8 G8 G4 A8',
  'r4 A8 G8 A8 A4 A4 r8 A8 G8 A8 G4 E8'
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
