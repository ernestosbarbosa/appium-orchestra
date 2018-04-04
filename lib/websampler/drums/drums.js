'use strict';

let sampleNameMap = {
  ridebell: 'Bell',
  kick: 'Kick',
  hihatO: 'Hi-Hat Open',
  ridecrash: 'Crash',
  ride: 'Ride',
  snare: 'Snare',
  lowtom: 'Low Tom',
  hitom: 'Hi Tom',
  hihat: 'Hi-Hat Closed'
};

let keyCodeMatrix = [[81, 87, 69],
                     [65, 83, 68],
                     [90, 88, 67]];

let drumPlacement = [['ridebell',  'ride',  'hihatO'],
                     ['ridecrash', 'snare', 'hihat'],
                     ['lowtom',    'kick',  'hitom']];

let kits = {
  pearlkit: "Pearl Kit"
};

function buildPads(document) {
  let container = document.querySelector('.Soundpad');
  for (let i = 0; i < keyCodeMatrix.length; i++) {
    for (let j = 0; j < keyCodeMatrix[i].length; j++) {
      let code = keyCodeMatrix[i][j];
      let sample = drumPlacement[i][j];
      let name = sampleNameMap[sample];
      let newEl = document.createElement("div");
      newEl.setAttribute("class", "Soundpad_key");
      newEl.setAttribute("data-key", code);
      newEl.setAttribute("data-sample", sample);
      newEl.innerHTML = `<div id="${sample}">${name}</div>`;
      container.appendChild(newEl);
    }
  }
}

(function(window, document) {
  init(window, document, 'pearlkit', Object.keys(sampleNameMap), true);
})(window, document);
