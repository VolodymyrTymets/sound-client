import React, { useState, useEffect } from 'react';
import * as R from "ramda";
import ss from 'socket.io-stream';
import socketClient from 'socket.io-client';
import mainConfig from '../config';

import { Sinewave } from '../components/SinewaveStream';
import { FrequencyBars } from '../components/FrequencyBarsStream';
import { InfoBar } from '../components/InfoBar';
import { InteractWindow } from "../components/InteractWindow";
import { Loader } from '../components/Loader';

import { getByteTimeDomainData } from "../components/SinewaveStream/utils";
import { getByteFrequencyData } from "../components/FrequencyBarsStream/utils";
import { getWindowSize } from "../utils/getWindowSize";
import { MeanSpectrumOfBreath } from "../utils/MeanSpectrumOfBreath";

const meanSpectrumOfBreath = new MeanSpectrumOfBreath(mainConfig);

const url = process.env.NODE_ENV === 'production' ?
	`${window.location.hostname}:${window.location.port}` : `${window.location.hostname}:3001`;
const socket = socketClient(url);

const MainView = ({ windowInfo }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [wave, setWave] = useState([]);
	const [spectrum, setSpectrum] = useState([]);
	const [config, setConfig] = useState(mainConfig);
	const [color, setColor] = useState('');
	const [meanOfBreathR, setMeanOfBreathR] = useState(0);
	const [spectrumInfo, setSpectruminfo] = useState({});

	useEffect(() => meanSpectrumOfBreath.changeConfig(config), [config])
	useEffect(() => {
		// config.setUrl(url);
		const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
		const analyser = audioCtx.createAnalyser();
		const audioCtxSpectrum = new (window.AudioContext || window.webkitAudioContext)();
		const analyserSpectrum = audioCtxSpectrum.createAnalyser();
		meanSpectrumOfBreath.saveSocket(socket);
		ss(socketClient(url)).on('mic-stream', (stream, {
			mic,
			minRateDif,
			minBreathTime,
			maxRateDif
		}) => {
			setConfig({
				...mainConfig,
				minRateDif,
				maxRateDif,
				minBreathTime,
			});

			stream.on('data', async buffer => {
				const wave = await getByteTimeDomainData(audioCtx, analyser, buffer, config.fftSize, mic.rate, mic.channels, mainConfig.sinewaveScale);
				const spectrum = await getByteFrequencyData(audioCtxSpectrum, analyserSpectrum, buffer, mainConfig.spectrumFftSize, mic.rate, mic.channels);
				setSpectrum(spectrum);
				setWave(wave);

        // todo: move it into util
		    let _meanOfBreathR = meanOfBreath;

				const mean = parseInt(R.mean(spectrum), 10);
				const max = R.reduce(R.max, 0, spectrum);
				meanSpectrumOfBreath.listen(mean, max);
				const meanOfBreath = meanSpectrumOfBreath.getMean();
				const timeLeft = meanSpectrumOfBreath.getTimeLeft();


				if(meanOfBreath) {
					/** taking into account that max spectrum of mic can't be > 100, need to calculate how much spectrum of breath
					 *  of stimulation bigger than spectrum of normal breath, from range that left.*/
					const left = mainConfig.MAX_SPECTRUM_OF_MIC - mean;
					const leftMean = mainConfig.MAX_SPECTRUM_OF_MIC - meanOfBreath;
					const newRating = parseInt(100 - (left * 100) / leftMean, 10) || 0;
					if(leftMean > left) {
						_meanOfBreathR = newRating;
						_meanOfBreathR = _meanOfBreathR > 0 ? _meanOfBreathR : 0;
					}

				}
				const color = meanSpectrumOfBreath.getColor(_meanOfBreathR);
				if(_meanOfBreathR) {
					meanSpectrumOfBreath.soundNotify(_meanOfBreathR);
					meanSpectrumOfBreath.serverNotify(_meanOfBreathR);
				}
				setMeanOfBreathR(_meanOfBreathR);
				setColor(color);
				setSpectruminfo({
					timeLeft,
					meanOfBreath,
					mean,
					meanOfBreathR:_meanOfBreathR
				});
				setIsLoading(false);
			})
		})
	}, []);

	function onRateChange(minRateDif, maxRateDif) {
		setConfig({ ...mainConfig, minRateDif, maxRateDif });
	}

	const className =  windowInfo.isFrequencyFullScreen ? 'flex-column' : 'flex-row';
	return (
		<>
			{ !isLoading ? (
					<div className="container-fluid" style={{padding: 5}}>
						<Sinewave windowInfo={windowInfo} color={color} wave={wave} />
						<div
							className={`d-flex ${className}`}>
							{socket &&  <InfoBar meanSpectrumOfBreath={meanSpectrumOfBreath} color={color} spectrumInfo={spectrumInfo} socket={socket} config={config} onRateChange={onRateChange}/> }
							<FrequencyBars windowInfo={windowInfo} color={color} spectrum={spectrum}/>
						</div>
					</div>) : (<Loader />)
			}
	  </>
	);
};

const XS_SIZE = 568;
const MainPage = () => {
	const [isInteracted, setIsInteracted] = useState(false);
	const [windowInfo, setWindowInfo] = useState({})

	useEffect(() => {
		const windowSize = getWindowSize();
		setWindowInfo({
	 		sineWaveHeight: (windowSize.height * 0.5),
	    frequencyHeight: (windowSize.height * 0.4),
		  sineWaveWidth: windowSize.width,
		  frequencyWidth: windowSize.width < XS_SIZE ? windowSize.width : windowSize.width / 2,
		  isFrequencyFullScreen: windowSize.width < XS_SIZE ? true : false,
		})
	}, []);

	return isInteracted ? <MainView windowInfo={windowInfo} /> : <InteractWindow onClick={() => setIsInteracted(true)} />
};

export default MainPage