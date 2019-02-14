const path = require('path');
const { exec } = require('child_process');
const wavFileInfo = require('wav-file-info');

class WavFileNotifier {
  constructor() {
    this._filePath = {
      def: path.resolve(__dirname ,'../../../private/assets', './notification.wav'),
      nerve: path.resolve(__dirname ,'../../assets', './nerve.wav'),
      muscle: path.resolve(__dirname ,'../../assets', './muscle.wav'),
    };
    this._statOfPlay = null;
    this._duration = {};


      Object.keys(this._filePath).forEach((key) => {
        try {
          wavFileInfo.infoByFilename(this._filePath[key], (err, info) => {
            if(err) throw err;
            this._duration[key] = info.duration;
          });
        } catch (err) {
          this.log(err.message);
        }
      });

  }

  log(msg) {
    console.log(`[WavFileNotifier] --> ${msg}`);
  }

  play(type) {
    const filePath = this._filePath[type];
    // for mac
    //exec(`afplay  ${filePath}`);
    // for ubuntu
    exec(`afplay -D plughw:1 ${filePath}`);
    exec(`afplay -D plughw:0 ${filePath}`);
    exec(`afplay -D hw:0 ${filePath}`);
  }
  notify(type = 'def') {
    if(!this._statOfPlay) {
      this.play(type);
    }
    this._statOfPlay =  this._statOfPlay || new Date().getTime();
    const diff = (new Date().getTime() - this._statOfPlay) / 1000;
    if(diff >= this._duration.def) {
      this._statOfPlay = new Date().getTime();
      this.play(type);
    }
  }
}

const wavFileNotifier = new WavFileNotifier();

module.exports = { wavFileNotifier };