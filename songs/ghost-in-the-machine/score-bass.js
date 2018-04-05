const LEADIN = ['r1 r1'];
const INTRO = ['r1 '.repeat(8)];
const VERSE = [
  'b4. b2 r8 ', 'f#4. C#2 r8 ',
  'e4. b2 r8 ', 'b4. b2 r8 ',
  'g#4. D#2 r8 ', 'f#4. b2 r8 ',
  'f#4. C#2 r8 ', 'f#4. C#2 r8 ',
];

const BRIDGE_PART = [
  'E2 E4 F#4', 'C#2 C#2',
  'a#2 a#4 C#4', 'b2 b2'
];

const BRIDGE = BRIDGE_PART.concat(BRIDGE_PART, [
  'E2 E4 F#4', 'C#2 C#2',
  'a#2 a#4 b4', 'C#2 C#2',
  'g#4 g#2.', 'b2 b4 e4',
  'f#2 f#2', 'r4 f#4 f#4 f#4',
]);

const CHORUS_PART = [
  'b4 F#4 b2', 'b4 F#8 D#4. b4',
  'a4 F#4 B2', 'a4 F#8 B4.  A4',
  'e4 b4  E2', 'e4 b8  E4.  b4',
  'e4 b4  E2', 'e4 b8  G4.  E4',
];

const CHORUS = CHORUS_PART.concat(CHORUS_PART);

const TAG_PART = [
  'f#2 D#4 b4', 'f2 C#2',
  'e2 b2. e4 E4 b4',
];

const TAG = TAG_PART.concat(
  TAG_PART,
  TAG_PART,
  TAG_PART,
  TAG_PART,
  ['e2 b2']
);

const BREAK = VERSE;

const TAG_2 = TAG_PART.concat(
  TAG_PART,
  TAG_PART,
  TAG_PART,
  TAG_PART,
  ['e2 b2', 'e1', 'e2 b2. b4 b4 b4']
);

const OUTRO = [
  'b4 b4. b8 b4', 'f#4 C#4. f#8 C#4',
  'e4 b2 r8 b8', 'b4 b2 b4',
  'g#4 D#2 g#4', 'f#4 b4. f#8 b4',
  'e4 b2 e2 e4 b4 e4',
  'b0', 'r0'
];

const SONG = [].concat(
  LEADIN,
  INTRO,
  VERSE,
  VERSE,
  BRIDGE,
  CHORUS,
  TAG,
  BREAK,
  VERSE,
  BRIDGE,
  CHORUS,
  TAG_2,
  OUTRO,
).join(" ");

module.exports = SONG;
