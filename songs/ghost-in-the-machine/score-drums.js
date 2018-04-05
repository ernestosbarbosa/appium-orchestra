const LEADIN = ['{hihat}4 '.repeat(8)];
const INTRO = ['r2 {kick}4 r4 '.repeat(8)];
const VERSE = ['{kick}4 {kick}4 {hihat}2 '.repeat(8)];
const BRIDGE = [
  '{kick/ridebell}4 {snare/ridebell}4 {kick/ridebell}4 {snare/ridebell}4 '.repeat(16)
];

const CHORUS = [
  '{kick/ridebell}4 {snare/ridebell}8 {snare}8 {kick/ridebell}4 {snare/ridebell}4 '.repeat(16)
];

const TAG_BASE = [
  ('{kick/ridebell}4 {ridebell}4 {snare/ridebell}4 {ridebell}4      ' +
   '{ridebell}4      {ridebell}4 {snare/ridebell}4 {ridebell}4      ' +
   '{kick/ridebell}4 {ridebell}4 {snare/ridebell}4 {ridebell}4      ' +
   '{ridebell}4      {ridebell}4 {snare/ridebell}4 {kick/ridebell}4 '
  ).repeat(5)
];

const TAG = TAG_BASE.concat([
  '{kick}4 {hihat}4 {snare}4 {snare}8 {snare}8'
]);

const BREAK = [
  '{kick/ridebell}4 {snare/ridebell}8 {snare}8 {kick/ridebell}4 {snare/ridebell}4 '.repeat(8)
];

const TAG_2 = TAG_BASE.concat([
   '{kick/ridebell}4     {kick/ridebell}4 {snare/ridebell}4 {kick/ridebell}4 ',
   '{ridebell}4     {kick/ridebell}4 {snare/ridebell}4 {kick/ridebell}4 ',
   '{ridebell}4     {kick/ridebell}4 {snare/ridebell}4 {kick/ridebell}4 ',
   '{ridebell}4     {kick/ridebell}4 {kick/snare/ridebell}4 {kick/ridebell}4 ',
]);

const OUTRO = [
  '{kick/ridebell}4 {snare/ridebell}8 {snare}8 {ridebell}8 {kick}8 {snare/ridebell}4 '.repeat(8),
  '{ride/ridecrash}0', 'r0'
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
