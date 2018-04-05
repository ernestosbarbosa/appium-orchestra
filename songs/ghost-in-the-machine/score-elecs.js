const LEADIN = ['r1 r1'];
const INTRO = [
  '{01-solo-Bmaj-1}1', '{01-solo-F#maj-1}1',
  '{01-solo-Emaj}1', '{01-solo-Bmaj-2}1',
  '{01-solo-G#min}1', '{01-solo-Bmaj-2}1',
  '{01-solo-F#maj-2-ext}0',
];

const VERSE = [
  '{02-strum-Bmaj}1', '{02-strum-F#maj}1',
  '{02-strum-Emaj}1', '{02-strum-Bmaj}1',
  '{02-strum-G#min}1', '{02-strum-Bmaj}1',
  '{02-strum-F#maj}1', '{02-strum-F#maj}1',
];

const BRIDGE = [
  '{03-bridge-Emaj}1', '{03-bridge-F#maj}1',
  '{03-bridge-D#min}1', '{03-bridge-Emaj}1',

  '{03-bridge-Emaj}1', '{03-bridge-F#maj}1',
  '{03-bridge-D#min}1', '{03-bridge-Emaj}1',

  '{03-bridge-Emaj}1', '{03-bridge-F#maj}1',
  '{03-bridge-D#min}1', '{03-bridge-C#min}1',
  '{03-bridge-G#min}1', '{03-bridge-Emaj}1',
  '{03-bridge-F#maj}1', '{03-bridge-F#maj}1',
];

const CHORUS = [
  '{04-chorus-Bmaj}0',
  '{04-chorus-Amaj}0',
  '{04-chorus-Emaj}0',
  '{04-chorus-Emin}0',

  '{04-chorus-Bmaj}0',
  '{04-chorus-Amaj-2}0',
  '{04-chorus-Emaj}0',
  '{04-chorus-Emin}0',
];

const TAG_PART = [
  '{05-tag-Bmaj}1',
  '{05-tag-C#maj7}1',
  '{05-tag-Emaj-ext}0'
];

const TAG = TAG_PART.concat(
  TAG_PART,
  TAG_PART,
  TAG_PART,
  TAG_PART,
  ['{05-tag-Emaj-short}1']
);

const BREAK = INTRO;

const HIGH_TAG_PART = [
  '{06-hightag-Bmaj}1',
  '{06-hightag-C#maj7}1',
  '{06-hightag-Emaj-ext}0'
];
const TAG_2 = TAG_PART.concat(
  TAG_PART,
  TAG_PART,
  HIGH_TAG_PART,
  HIGH_TAG_PART,
  [
    '{06-hightag-Emaj-ext}0', '{06-hightag-Emaj-ext}1',
    '{06-hightag-Emaj-short}2', '{06-hightag-Emaj-short}2'
  ]
);

const OUTRO = [
  '{02-strum-Bmaj}1', '{02-strum-F#maj}1',
  '{02-strum-Emaj}1', '{02-strum-Bmaj}1',
  '{02-strum-G#min}1', '{02-strum-Bmaj}1',
  '{02-strum-Emaj}1', '{02-strum-Emaj}2 {02-strum-Emaj}2',
  '{07-lasthit-Bmaj}0', 'r0'
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
