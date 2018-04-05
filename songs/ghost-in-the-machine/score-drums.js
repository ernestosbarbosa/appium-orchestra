const LEADIN = ['{hihat}4 '.repeat(8)];
const INTRO = ['r2 {kick}4 r4 '.repeat(8)];
const VERSE = ['{kick}4 {kick}4 {hihat}2 '.repeat(8)];
const BRIDGE = [
  '{kick/bell}4 {snare/bell}4 {kick/bell}4 {snare/bell}4 '.repeat(16)
];

const CHORUS = [
  '{kick/bell}4 {snare/bell}8 {snare}8 {kick/bell}4 {snare/bell}4 '.repeat(16)
];

const TAG_BASE = [
  ('{kick/bell}4 {bell}4 {snare/bell}4 {bell}4      ' +
   '{bell}4      {bell}4 {snare/bell}4 {bell}4      ' +
   '{kick/bell}4 {bell}4 {snare/bell}4 {bell}4      ' +
   '{bell}4      {bell}4 {snare/bell}4 {kick/bell}4 '
  ).repeat(5)
];

const TAG = TAG_BASE.concat([
  '{kick}4 {hihat}4 {snare}4 {snare}8 {snare}8'
]);

const BREAK = [
  '{kick/bell}4 {snare/bell}8 {snare}8 {kick/bell}4 {snare/bell}4 '.repeat(8)
];

const TAG_2 = TAG_BASE.concat([
   '{kick/bell}4     {kick/bell}4 {snare/bell}4 {kick/bell}4 ',
   '{bell}4     {kick/bell}4 {snare/bell}4 {kick/bell}4 ',
   '{bell}4     {kick/bell}4 {snare/bell}4 {kick/bell}4 ',
   '{bell}4     {kick/bell}4 {kick/snare/bell}4 {kick/bell}4 ',
]);

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
).join(" ");

module.exports = SONG;
