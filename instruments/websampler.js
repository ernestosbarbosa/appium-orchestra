const Instrument = require('../lib/instrument');
const path = require('path');
const Promise = require('bluebird');
const _ = require('lodash');
const wd = require('wd');

const SAMPLER_HOST = "http://localhost:9080";

class Sampler extends Instrument {

  constructor (opts) {
    const defaults = {
      name: 'Sampler Instrument',
      endpoint: '',
      tapByPos: false,
      rect: null,
      caps: {
        platformName: 'iOS',
        platformVersion: '11.2',
        deviceName: 'iPad Simulator',
        browserName: 'Safari',
      }
    };
    super(Object.assign({}, defaults, opts));
    this.sampleEls = {};
  }

  async start () {
    await super.start();
    if (this.rect) {
      let handle = await this.driver.windowHandle();
      await this.driver.setWindowSize(this.rect.width, this.rect.height, handle);
      await this.driver.setWindowPosition(this.rect.x, this.rect.y, handle);
    }
    await this.driver.get(`${SAMPLER_HOST}/${this.endpoint}`);
    await this.findSamplesFromScoreAnalysis();
    //await this.playNote('{00-silence}');
    await Promise.delay(1000);
  }

  async findSamples (samples) {
    //samples.push('00-silence');
    for (let sample of _.uniq(samples)) {
      if (sample === 'r') continue;
      console.log(`Finding position of ${sample}...`);
      let el = await this.driver.elementById(sample);
      let loc = await el.getLocation();
      let size = await el.getSize();
      this.sampleEls[sample] = {el, x: loc.x + size.width / 2, y: loc.y + size.height / 2};
    }
  }

  async findSamplesFromScoreAnalysis () {
    if (!this.analysis) {
      throw new Error("Need to set analysis before playing");
    }

    let samples = [];
    for (let spec of this.analysis.notes) {
      if (spec.note) {
        samples.push(spec.note.replace(/{|}/g, ''));
      } else if (spec.chord) {
        for (let note of spec.chord) {
          samples.push(note.replace(/{|}/g, ''));
        }
      }
    }
    await this.findSamples(samples);
  }

  async playNote (note) {
    // in our case a note is actually a sample name, so just remove { and }
    note = note.replace(/{|}/g, '');
    if (!this.sampleEls[note]) {
      throw new Error(`Must prepopulate sample element ids: could not find ${note}`);
    }
    if (this.tapByPos) {
      let {x, y} = this.sampleEls[note];
      let action = new wd.TouchAction();
      action.press({x, y}).release();
      await this.driver.performTouchAction(action);
    } else {
      await this.sampleEls[note].el.click();
    }
  }

  async playChord (chord) {
    const positions = chord.map(note => {
      note = note.replace(/{|}/g, '');
      return {
        x: this.sampleEls[note].x,
        y: this.sampleEls[note].y
      };
    });
    await this.multiPos(positions);
  }
}

module.exports = Sampler;
