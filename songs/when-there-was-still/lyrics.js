const FAST = 160;
const SLOW = 90;
const TACIT = [[16, ""]];
const INTRO = TACIT;
const INTRO1 = [[14, ""], [2, "I"]];
const VERSE1 = [
  [6, "used to write the code"],
  [2, "that", FAST],
  [6, "made the world go round."],
  [2, "Now it", FAST],
  [5, "gets on just fine"],
  [1, ""],
  [2, "without", FAST],
  [7, "anyone."],
  [1, "I", FAST]
];
const VERSE2 = [
  [5, "guess I’ll get out of bed"],
  [1, ""],
  [2, "though there's", FAST],
  [5, "nothing for me to do."],
  [1, ""],
  [2, "I'll have", FAST],
  [5, "automatic toast,"],
  [1, ""],
  [2, "I'll drink", FAST],
  [8, "automatic juice."]
];
const BRIDGE1 = [
  [3, ""],
  [10, "We knew this day would come,"],
  [3, "when all our", FAST],
  [4, "striving", SLOW],
  [4, "would be", SLOW],
  [5, "done."],
  [3, "So where's my", FAST]
];
const CHORUS = [
  [6, "laughter?"],
  [2, "Where's my", FAST],
  [5, "smile?"],
  [3, "Show me the", FAST],
  [4, "hardware"],
  [4, "that makes it worth", FAST],
  [6, "while."],
  [2, "What's the", FAST],
  [5, "point"],
  [3, "of a test driven", FAST],
  [5, "life?"],
  [3, "I need to", FAST],
  [5, "remember"],
  [3, "what it was"],
  [8, "like"]
];
const CHORUS_OUT = [
  [1, ""],
  [3, "when there was", FAST],
  [2, "still", FAST],
  [10, "code to write."],
  [2, ""],
  [2, "When there was", FAST],
  [2, "still", FAST],
  [10, "code to write."]
];
const INTRO2 = [
  [6, ""],
  [2, "My", FAST]
];
const VERSE3 = [
  [8, "quality assured"],
  [6, "breakfast is underway;"],
  [2, "I", FAST],
  [4, "wonder how"],
  [4, "long it will be"],
  [8, "before a robot digests it for"],
];
const BRIDGE2 = [
  [2, "me?", FAST],
  [12, "Then I think, how long will it be"],
  [2, "before a", FAST],
  [4, "robot", SLOW],
  [4, "digests", SLOW],
  [5, "me?"],
  [3, "So where's my", FAST]
];
const OUTRO = [];

const SONG = [].concat(
  INTRO1,
  VERSE1,
  VERSE2,
  BRIDGE1,
  CHORUS,
  CHORUS_OUT,

  INTRO2,
  VERSE3,
  BRIDGE2,
  CHORUS,
  CHORUS_OUT,
  CHORUS_OUT,
  OUTRO
);

module.exports = SONG;
