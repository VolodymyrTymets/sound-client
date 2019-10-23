const mic = require('mic');
const WavDecoder = require('wav-decoder');
const header = require('waveheader');
const { socketClients } = require('../utils/SocketClients');

class Mic {
	constructor(config, onData) {
		this.log = this.log.bind(this);
		this._config = config;
		// this._startDate =  null;
		this._onData = onData;

	}

	_createInstance () {
		delete  this._micInputStream;
		delete  this._micInstance;
		this._micInstance = mic(this._config.mic);
		this._micInputStream = this._micInstance.getAudioStream();
    this._micInputStream.on('error', this.log);

	}
	getMicInputStream () {
	  return this._micInputStream;
    }

	log(message) {
		console.log(`-> [Mic]: ${message.message || message}`);
		if (message.message) {
			console.log(message);
		}
	}


	start() {
		try {
			// this._startDate = startDate;
			this._createInstance();
			this._micInputStream.on('data', buffer => {
				/** Calculate on server only if no clients is connected*/
``	    	// if(!socketClients.isOneConnected()) {
				// 	WavDecoder.decode(Buffer.concat([header(this._config.mic.rate), buffer]))
				// 		.then(audioData => this._onData(audioData))
				// 		.catch(this._catch);
				// }

			});
			this._micInstance.start();
		} catch (error) {
			this.log(error);
		}
	}

	stop() {
    this._micInstance && this._micInstance.stop();
	}
}


module.exports = { Mic };
