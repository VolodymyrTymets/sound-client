const Speaker = require('speaker');
const NodeSynth = require('nodesynth');


class SoundNotifier {
	constructor() {
	  this._FREQ = 2000;      // Hz
	  this._soundConfig = {
      channels: 2,          // 2 channels
      bitDepth: 16,         // 16-bit samples
      sampleRate: 44100,    // 44,100 Hz sample rate
    };

    this._spekers = [
      new Speaker({ device: 'hw:0', ...this._soundConfig}),
      new Speaker({ device: 'plughw:0', ...this._soundConfig}),
      new Speaker({ device: 'plughw:1', ...this._soundConfig}),
      new Speaker({ device: 'plughw:2', ...this._soundConfig}),
    ];
    this._source = new NodeSynth.Oscillator('sin',
        t => this._FREQ + ((t) % 220));
    this._ns = new NodeSynth.Synth(this._soundConfig);

    this._spekers.forEach(speaker => this._ns.pipe(speaker));

    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
	}

	play() {
    this._ns.source = this._source;
  }
  stop() {
    this._ns.source = null;
  }
}

const soundNotify = new SoundNotifier();

module.exports = { soundNotify };
