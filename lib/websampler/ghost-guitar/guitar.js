'use strict';

const samples = [
  '01-solo-Bmaj-1',
  '01-solo-Bmaj-2',
  '01-solo-Emaj',
  '01-solo-F#maj-1',
  '01-solo-F#maj-2-ext',
  '01-solo-G#min',
  '02-strum-Bmaj',
  '02-strum-Emaj',
  '02-strum-F#maj',
  '02-strum-G#min',
  '03-bridge-C#min',
  '03-bridge-D#min',
  '03-bridge-Emaj',
  '03-bridge-F#maj',
  '03-bridge-G#min',
  '04-solo-Bmaj',
];

function buildPads(document) {
  let container = document.querySelector('.Soundpad');
  for (let i = 0; i < samples.length; i++) {
    let sample = samples[i];
    let name = sample;
    let newEl = document.createElement("div");
    newEl.setAttribute("class", "Soundpad_key");
    newEl.setAttribute("data-key", i);
    newEl.setAttribute("data-sample", sample);
    newEl.innerHTML = `<div id="${sample}">${name}</div>`;
    container.appendChild(newEl);
  }
}

(function(window, document) {
  init(window, document, 'elec', samples, false);
})(window, document);
