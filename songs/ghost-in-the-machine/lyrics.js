const LEADIN = [[2, ""]];
const INTRO = [[8, ""]];
const VERSE_1 = [
  [1, "I believed the"],
  [1, "things I heard,\n"],
  [1, "those that said I'm"],
  [1, "better served\n"],
  [1, "scanning my whole"],
  [1, "brain"],
  [2, "and going digital.\n\n"],
];
const VERSE_2 = [
  [1, "Now that man is"],
  [1, "dead and gone,\n"],
  [1, "but here I am still"],
  [1, "humming along\n"],
  [1, "but I can't shake the"],
  [1, "feeling that"],
  [2, "something's wrong.\n\n"],
];
const BRIDGE = [
  [1, "Cause feeling was the"],
  [1, "first to go\n I"],
  [1, "never thought I'd"],
  [1, "stoop so low\n"],

  [1, "But now I want my"],
  [1, "body back,\n, its"],
  [1, "limits seem a "],
  [1, "welcome fact\n"],

  [1, "I'm hailed a virtual"],
  [1, "deity, but"],
  [1, "still no good at"],
  [5, "being me\n\n"]
];
const CHORUS = [
  [1, "I am the"],
  [1, "ghost in the"],
  [1, "machine,\n god of"],
  [1, "everything I"],
  [1, "see, but in my"],
  [1, "new reality"],
  [1, "eyes are a"],
  [1, "rare commodity.\n\n"],

  [1, "I don't just"],
  [1, "want to be a"],
  [1, "brain,\n I want to"],
  [1, "be a human"],
  [1, "being,\n but my mind's"],
  [1, "stuck in silicon,"],
  [1, "and I'm"],
  [1, "stuck inside my"],
];
const TAG_1 = [
  [1, "mind\n\n"],
  [3, ""],

  [1, "I am the perfect"],
  [1, "simulation"],
  [2, "of\j"],
  [1, "The not-so-perfect"],
  [1, "person that I"],
  [2, "was\n"],

  [1, "I am the perfect"],
  [1, "simulation"],
  [2, "of\j"],
  [1, "The not-so-perfect"],
  [1, "person that I"],
  [2, "was\n"],

  [1, "So won't you get me out of"]
];
const BREAK = [[1, "here\n\n"], [7, ""]];
const VERSE_3 = [
  [1, "I reviewed the"],
  [1, "memories\n"],
  [1, "that I have saved of"],
  [1, "sun and trees\n"],
  [1, "But one thing that I"],
  [1, "cannot do is"],
  [2, "feel them like they're mine.\n\n"],
];
const TAG_2 = [
  [1, "mind\n\n"],
  [3, ""],

  [1, "I am the perfect"],
  [1, "simulation"],
  [2, "of\j"],
  [1, "The not-so-perfect"],
  [1, "person that I"],
  [2, "was\n"],

  [1, "I am the perfect"],
  [1, "simulation"],
  [2, "of\j"],
  [1, "The not-so-perfect"],
  [1, "person that I"],
  [2, "was\n"],

  [2, "So won't you get me out of"],
  [2, "Get me out of"]
];
const OUTRO = [
  [1, "here"],
  [1, "da daaa da"],
  [1, "da da da da"],
  [1, "daaaaa"],
  [1, "da daaaa da"],
  [1, "da daaaa da"],
  [1, "daaa"],
  [1, "daaa daaa"],
  [4, "daaaa"]
];

const SONG = [].concat(
  LEADIN,
  INTRO,
  VERSE_1,
  VERSE_2,
  BRIDGE,
  CHORUS,
  TAG_1,
  BREAK,
  VERSE_3,
  BRIDGE,
  CHORUS,
  TAG_2,
  OUTRO
);

module.exports = SONG;
