const BASIC_C = 'c8 G8 C8 G8^ e8v C8 G8 C8 ';
const BASIC_AM = 'a8 E8 A8 E8 C8 A8 E8 A8 ';
const BASIC_F = 'f8 c8 F8 c8 A8 F8 c8 F8 ';
const BASIC_G = 'g8 d8 G8 d8 B8 G8 d8 G8 ';
const BASIC_EM = 'e8 B8 E8 B8^ g8v E8 B8 E8 ';
const BASIC_E = 'e8 B8 E8 B8^ g#8v E8 B8 E8 ';
const BASIC_DM = 'd8 A8 D8 A8^ f8v D8 A8 D8 ';

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
const INTRO_2 = [BASIC_C.repeat(2)];
const OUTRO = INTRO_2.concat([
  BASIC_C,
  'c1 '
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
