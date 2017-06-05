const BASIC_C = 'c8 G8 C8 G8^ e8v C8 G8 C8 ';
const BASIC_AM = 'a8 E8 A8 E8 C8 A8 E8 A8 ';
const BASIC_F = 'f8 c8 F8 c8 A8 F8 c8 F8 ';
const BASIC_G = 'g8 d8 G8 d8 B8 G8 d8 G8 ';

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
