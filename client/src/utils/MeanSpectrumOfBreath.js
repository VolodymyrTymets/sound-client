import * as R from "ramda";
import { soundStart, soundStop } from './soud-notify';
import config from '../config'

class MeanSpectrumOfBreath {
  constructor(config) {
    this._socket = null;
    this._statOfListen = null;
    this._isListening = true;
    this._time = config.timeToListen; // s
    this._minBreathTime = config.minBreathTime;
    this._minRateDif = config.minRateDif;
    this._maxRateDif = config.maxRateDif;
    this._lastColorNotificationDate = null;
    this._lastSoundNotificationDate = null;
    this._lastSercerNotificationDate = null;
    this._lastServerNotificationType = 'muscle';

    this._means = [];
    this._mean = 0;
    this._maxes = [];
    this._max = 0;
    this.listen = this.listen.bind(this);
  }
  saveSocket(socket){
    this._socket = socket;
  }
  changeConfig(config) {
    this._time = config.timeToListen || this._time; // s
    this._minBreathTime = config.minBreathTime || this._minBreathTime;
    this._minRateDif = config.minRateDif || this._minRateDif;
    this._maxRateDif = config.maxRateDif || this._maxRateDif;
  }
  /** Call to refresh listening from scratch */
  refreshListening () {
    this._isListening = true;
    this._statOfListen = new Date().getTime();
  }
  listen(meanSpectrum, maxSpectrum) {
    if(!this._isListening) return;

    this._statOfListen = this._statOfListen || new Date().getTime();
    const diffInSec = (new Date().getTime() - this._statOfListen ) / 1000;
    const index = parseInt(diffInSec, 10) - 1;

    if(index < 0) return;
    this._means[index] = this._means[index] || [];
    this._maxes[index] = this._maxes[index] || [];
    this._means[index].push(meanSpectrum);
    this._maxes[index].push(maxSpectrum);

    if(diffInSec > this._time) {
      this._isListening = false;
      this._mean = R.mean(this._means.map(R.reduce(R.max, 0)));
      this._max = R.mean(this._maxes.map(R.reduce(R.max, 0)));
    }
  }
  getMean() {
    return this._mean;
  }
  getMax() {
    return this._max;
  }
  getTimeLeft() {
    if(!this._isListening) return 0;
    const diffInSec = (new Date().getTime() - this._statOfListen ) / 1000;
    return this._time - parseInt(diffInSec, 10);
  }
  /** Change color only after little latency breath of people**/
  getColor(meanRating) {
    if(this._isListening) return '#6c757d'; //grey
    this._lastColorNotificationDate = this._lastColorNotificationDate || new Date().getTime();
    const diff = (new Date().getTime() - this._lastColorNotificationDate);
    if(meanRating > this._minRateDif) {
      if(diff >= this._minBreathTime) {
        return 'rgb(255, 155, 155)'; // red
      }
    }
    return 'black'; //`rgb(${155}, 255, ${155})`; // green
  }
  soundNotify(meanRating) {
    this._lastSoundNotificationDate = this._lastSoundNotificationDate || new Date().getTime();
    const diff = (new Date().getTime() - this._lastSoundNotificationDate);
    if(meanRating > this._maxRateDif) {
      if(diff >= this._minBreathTime) {
        return soundStart();
      }
    }
    return soundStop();
  }
  serverNotify(meanRating) {
    this._lastSercerNotificationDate = this._lastSercerNotificationDate || new Date().getTime();
    const diff = (new Date().getTime() - this._lastSercerNotificationDate);
    if(meanRating > this._minRateDif) {
      const nerveType = 'nerve';
      if(diff >= this._minBreathTime) {
        this._lastSercerNotificationDate = new Date().getTime();
        if(this._lastServerNotificationType !== nerveType) {
          this._lastServerNotificationType = nerveType;
          this._socket.emit('rln-type', {type: nerveType})
        }
        return;
      }
    }
    if(meanRating > 1) {
      const muscleType = 'muscle';
      if(diff >= this._minBreathTime) {
        this._lastSercerNotificationDate = new Date().getTime();
        if(this._lastServerNotificationType !== muscleType) {
          this._lastServerNotificationType = muscleType;
          this._socket.emit('rln-type', {type: muscleType})
        }
        return;
      }
    }
  }
}

const meanSpectrumOfBreath = new MeanSpectrumOfBreath(config);
export { meanSpectrumOfBreath };
