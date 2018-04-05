'use strict';

const samples = [
  [
    '01-solo-Bmaj-1',
    '01-solo-F#maj-1',
    '01-solo-Emaj',
    '01-solo-Bmaj-2',
    '01-solo-G#min',
    '01-solo-F#maj-2-ext',
  ], [
    '02-strum-Bmaj',
    '02-strum-F#maj',
    '02-strum-Emaj',
    '02-strum-G#min',
  ], [
    '03-bridge-Emaj',
    '03-bridge-F#maj',
    '03-bridge-D#min',
    '03-bridge-C#min',
    '03-bridge-G#min',
  ], [
    '04-chorus-Bmaj',
    '04-chorus-Amaj',
    '04-chorus-Emaj',
    '04-chorus-Emin',
    '04-chorus-Amaj-2',
  ], [
    '05-tag-Bmaj',
    '05-tag-C#maj7',
    '05-tag-Emaj-ext',
    '05-tag-Emaj-short',
  ], [
    '06-hightag-Bmaj',
    '06-hightag-C#maj7',
    '06-hightag-Emaj-ext',
    '06-hightag-Emaj-short',
    '07-lasthit-Bmaj',
  ]
];

function buildPads(document) {
  let container = document.querySelector('.Soundpad');
  for (let i = 0; i < samples.length; i++) {
    let numInCategory = samples[i].length;
    for (let j = 0; j < numInCategory; j++) {
      let sample = samples[i][j];
      let name = sample.replace(/^\d\d-/, "");
      let newEl = document.createElement("div");
      newEl.setAttribute("class", `Soundpad_key Soundpad_key_${numInCategory}`);
      newEl.setAttribute("data-key", `${i}_${j}`);
      newEl.setAttribute("data-sample", sample);
      newEl.innerHTML = `<div id="${sample}">${name}</div>`;
      container.appendChild(newEl);
    }
  }
}

function flatSamples() {
  let flat = [];
  for (let sampleSet of samples) {
    for (let sample of sampleSet) {
      flat.push(sample);
    }
  }
  return flat;
}

(function(window, document) {
  init(window, document, 'elec', flatSamples(), false, 0.2);
})(window, document);
