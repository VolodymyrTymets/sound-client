import * as R from "ramda";
import React from 'react';
import { compose, lifecycle, mapProps, withState } from "recompose";
import { inject, observer } from "mobx-react";
import ss from 'socket.io-stream';
import socketClient from 'socket.io-client';

import { Sinewave } from './components/SinewaveStream';
import { FrequencyBars } from './components/FrequencyBarsStream';
import { InfoBar } from './components/InfoBar';

import 'bootstrap/dist/css/bootstrap.min.css';
import { getBackgroundColor } from '../src/utils/getBackgroundColor';

const url = process.env.NODE_ENV === 'production' ?
  `${window.location.hostname}:${window.location.port}` : `${window.location.hostname}:3001`;
const socket = socketClient(url);

const AppComponent = ({ navigatorMicStream, spectrumInfo, config }) => {
 const fillStyle = getBackgroundColor(spectrumInfo.meanOfBreathR, spectrumInfo.timeLeft, config);
 return  <div className="container-fluid" style={{padding: 0}}>
    {config.mic.rate &&
      <Sinewave navigatorMicStream={navigatorMicStream} fillStyle={fillStyle} />}
    {config.mic.rate &&
      <FrequencyBars navigatorMicStream={navigatorMicStream} fillStyle={fillStyle} />}
    <InfoBar backgroundColor={fillStyle}/>
  </div>;
}

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
      ss(socket).on('mic-stream', (stream, { mic }) => {
        this.props.setStream(stream);
        this.props.config.setMic(mic.rate, mic.channels, mic.device);
      });
    }
  })
)(observer(AppComponent));

export default App;
