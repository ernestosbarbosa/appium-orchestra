'use strict';

const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx;
let buffers = {};

function fetchSamples(category, sampleNames) {
  let request;
  for (let sampleName of sampleNames) {
    request = new XMLHttpRequest();
    request._sampleName = sampleName;
    request.open('GET', `/samples/${category}/${window.encodeURIComponent(sampleName)}.wav`);
    request.responseType = 'arraybuffer';
    request.addEventListener('load', bufferSample, false);
    request.send();
  }
}

function bufferSample(event) {
  let request = event.target;
  audioCtx.decodeAudioData(request.response, function onSuccess(buffer) {
    buffers[request._sampleName] = buffer;
  }, function onFailure() {
    console.error(`Could not decode audio buffer for ${request._sampleName}`);
  });
}

function playSample(sampleName) {
  let source = audioCtx.createBufferSource();
  source.buffer = buffers[sampleName];
  source.connect(audioCtx.destination);
  source.start(0);
}

function playSound(event) {
  event.stopPropagation();
  event.preventDefault();
  let sample, keyCode;
  if (event.keyCode) {
    // we just have a keycode, need to turn that into an element
    let el = document.querySelector(`div[data-key="${event.keyCode}"]`);
    if (!el) {
      return;
    }

    sample = el.dataset.sample;
    keyCode = event.keyCode;
  } else {
    sample = this.dataset.sample;
    keyCode = this.dataset.key;
  }
  playSample(sample);
  lightOn(keyCode);
}

function lightOn(key) {
  let el = document.querySelector(`div[data-key="${key}"]`);
  el.classList.add('is-playing');
}

function lightOff(el) {
  el.classList.remove('is-playing');
}

function removeTransition(e) {
  lightOff(e.target);
}

function bindListeners(window, bindKeys) {
  let els = Array.from(document.querySelectorAll('.Soundpad_key'));
  if (bindKeys) {
    window.addEventListener('keydown', playSound);
  }
  els.forEach(el => el.addEventListener('click', playSound));
  els.forEach(el => el.addEventListener('touchstart', playSound));
  els.forEach(el => el.addEventListener('transitionend', removeTransition));
}

function init(window, document, category, sampleNames, bindKeys) {
  audioCtx = new AudioContext();
  fetchSamples(category, sampleNames);
  buildPads(document);
  bindListeners(window, bindKeys);
}
