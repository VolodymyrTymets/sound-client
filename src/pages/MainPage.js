import React, { useState, useEffect } from 'react';
import { compose, renderComponent, branch } from "recompose";
import { inject, observer, useObserver } from "mobx-react";
import ss from 'socket.io-stream';
import socketClient from 'socket.io-client';

import { Sinewave } from '../components/SinewaveStream';
import { FrequencyBars } from '../components/FrequencyBarsStream';
import { InfoBar } from '../components/InfoBar';
import { Loader } from '../components/common/Loader';
import { InteractWindow } from '../components/InteractWindow';

import { getByteTimeDomainData } from "../components/SinewaveStream/utils";
import { getByteFrequencyData } from "../components/FrequencyBarsStream/utils";

const url = process.env.NODE_ENV === 'production' ?
	`${window.location.hostname}:${window.location.port}` : `${window.location.hostname}:3001`;

const socket = socketClient(url);
const WAVE_FFT_SIZE = 32768;
const SPECTRUM_FFT_SIZE = 256;
const MainPage = ({ store }) => {
	const { config, spectrumInfo, windowInfo} = store;
	const [wave, setWave] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [spectrum, setSpectrum] = useState([]);

	useEffect(() => {
		windowInfo.init();
		config.setUrl(url);
		const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
		const analyser = audioCtx.createAnalyser();
		const audioCtxSpectrum = new (window.AudioContext || window.webkitAudioContext)();
		const analyserSpectrum = audioCtxSpectrum.createAnalyser();

		ss(socketClient(url)).on('mic-stream', (stream, {
			mic,
			minRateDif,
			minBreathTime,
			maxRateDif
		}) => {
			config.setRate(minRateDif, maxRateDif);
			config.setMinBreathTime(minBreathTime);
			config.setMic(mic.rate, mic.channels, mic.device);
			spectrumInfo.changeConfig({ minRateDif, minBreathTime });
			spectrumInfo.saveSocket(socket);

			stream.on('data', async buffer => {
				const wave = await getByteTimeDomainData(audioCtx, analyser, buffer, WAVE_FFT_SIZE, mic.rate, mic.channels, config.sinewaveScale);
				const spectrum = await getByteFrequencyData(audioCtxSpectrum, analyserSpectrum, buffer, SPECTRUM_FFT_SIZE, mic.rate, mic.channels);
				setSpectrum(spectrum);
				setWave(wave);
				spectrumInfo.setMean(spectrum);
				setIsLoading(false);
			})
		})
	}, []);

	const className =  windowInfo.isFrequencyFullScreen ? 'flex-column' : 'flex-row';
	return useObserver( () => (
		<>
			{ !isLoading ? (
					<div className="container-fluid" style={{padding: 5}}>
							<Sinewave color={spectrumInfo.color} wave={wave} />
						<div className={`d-flex ${className}`}>
							<InfoBar socket={socket}/>
							<FrequencyBars color={spectrumInfo.color} spectrum={spectrum}/>
						</div>
					</div>) : (<Loader />)
			}
	  </>
	));
};

export default compose(
	inject('store'),
	// observer,
	// branch(({ store }) => !store.windowInfo.isInteracted, renderComponent(InteractWindow)),
)(MainPage);


