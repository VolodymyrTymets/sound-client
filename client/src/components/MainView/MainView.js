import React, { useState, useEffect } from 'react';
import ss from 'socket.io-stream';
import socketClient from 'socket.io-client';
import mainConfig from '../../config';

import { Sinewave } from '../SinewaveStream';
import { FrequencyBars } from '../FrequencyBarsStream';
import { InfoBar } from '../InfoBar';
import { Loader } from '../Loader';

import { getByteTimeDomainData } from "../SinewaveStream/utils";
import { getByteFrequencyData } from "../FrequencyBarsStream/utils";
import { meanSpectrumOfBreath } from "../../utils/MeanSpectrumOfBreath";
import { getSpectrumInfo } from './utils';
import './style.css';

const url = process.env.NODE_ENV === 'production' ?
	`${window.location.hostname}:${window.location.port}` : `${window.location.hostname}:3001`;
const socket = socketClient(url);

const MainView = ({ windowInfo }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [wave, setWave] = useState([]);
	const [spectrum, setSpectrum] = useState([]);
	const [config, setConfig] = useState(mainConfig);
	const [spectrumInfo, setSpectrumInfo] = useState({});

	useEffect(() => meanSpectrumOfBreath.changeConfig(config), [config])
	useEffect(() => {
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

				const spectrumInfo =  getSpectrumInfo(spectrum);
				setSpectrumInfo(spectrumInfo);
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
				<div className="container-fluid main-view" style={{padding: 0}}>
					<Sinewave windowInfo={windowInfo} color={spectrumInfo.color} wave={wave} />
					<div
						className={`d-flex ${className}`}>
						{socket &&  <InfoBar meanSpectrumOfBreath={meanSpectrumOfBreath} color={spectrumInfo.color} spectrumInfo={spectrumInfo} socket={socket} config={config} onRateChange={onRateChange}/> }
						<FrequencyBars windowInfo={windowInfo} color={spectrumInfo.color} spectrum={spectrum}/>
					</div>
				</div>) : (<Loader />)
			}
		</>
	);
};

export { MainView };