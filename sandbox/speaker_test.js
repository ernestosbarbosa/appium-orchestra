const { asyncify } = require('asyncbox');
const Speaker = require('../lib/speaker');

async function run () {
  let s = new Speaker();
  let lyrics = [
    [4, "I used to write the code", 120],
    [4, "that made the world go round"],
    [4, "but now it gets on just fine"],
    [4, "without anyone"],
  ];
  await s.speakLyrics(lyrics, 100);
}

if (require.main === module) {
  asyncify(run);
}
