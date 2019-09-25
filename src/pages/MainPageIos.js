import * as R from "ramda";
import React from 'react';
import { compose, lifecycle, mapProps, withState, branch, renderComponent } from "recompose";
import { inject, observer } from "mobx-react";
import ss from 'socket.io-stream';
import socketClient from 'socket.io-client';


import { Sinewave } from '../components/ios/SinewaveStream';
import { FrequencyBars } from '../components/ios/FrequencyBarsStream';
import { InfoBar } from '../components/InfoBar';
import { Loader } from '../components/Loader';
import { InteractWindow } from '../components/InteractWindow';

const url = process.env.NODE_ENV === 'production' ?
	`${window.location.hostname}:${window.location.port}` : `${window.location.hostname}:3001`;
const socket = socketClient(url);

const AppComponent = ({ windowInfo, navigatorMicStream, spectrumInfo, config }) => {
	const className = windowInfo.isFrequencyFullScreen ? 'flex-column' : 'flex-row';
	return config.mic.rate ? (
		<div className="container-fluid" style={{padding: 5}}>
			<Sinewave navigatorMicStream={navigatorMicStream} color={spectrumInfo.color} />
			<div className={`d-flex ${className}`}>
			  <InfoBar socket={socket} />
				<FrequencyBars navigatorMicStream={navigatorMicStream} color={spectrumInfo.color}  socket={socket} />
			</div>
		</div>) : <Loader />
};


const AppBranch = compose(
	branch(({ windowInfo }) => !windowInfo.isInteracted, renderComponent(InteractWindow)),
)(AppComponent);

export const App = compose(
	inject('store'),
	mapProps(R.applySpec({
		spectrumInfo: R.path(['store','spectrumInfo']),
		windowInfo: R.path(['store','windowInfo']),
		config: R.path(['store','config']),
	})),
	withState('navigatorMicStream', 'setStream', null),
	lifecycle({
		componentDidMount() {
			this.props.windowInfo.init();
			this.props.config.setUrl(url);
			ss(socket).on('mic-stream', (stream, {
				mic,
				minRateDif,
				minBreathTime,
				maxRateDif
			}) => {
				this.props.setStream(stream);
				this.props.config.setRate(minRateDif, maxRateDif);
				this.props.config.setMinBreathTime(minBreathTime);
				this.props.config.setMic(mic.rate, mic.channels, mic.device);
				this.props.spectrumInfo.changeConfig({ minRateDif, minBreathTime });
				this.props.spectrumInfo.saveSocket(socket)
			});
		}
	}),
)(observer(AppBranch));

export default App;
