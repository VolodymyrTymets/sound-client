import * as R from "ramda";
import React from 'react';
import {compose, lifecycle, mapProps, withState} from "recompose";
import { inject, observer } from "mobx-react";
import ss from 'socket.io-stream';

import { Sinewave } from './components/SinewaveStream';
import { FrequencyBars } from './components/FrequencyBarsStream';
import { InfoBar } from './components/InfoBar';
import socket from './utils/socket';

import 'bootstrap/dist/css/bootstrap.min.css';


const AppComponent = ({ navigatorMicStream, spectrumInfo }) =>
  <div className="container-fluid" style={{ backgroundColor: `rgb(255, ${255 - spectrumInfo.mean}, ${255 - spectrumInfo.mean})` }}>
    <Sinewave navigatorMicStream={navigatorMicStream} />
    <FrequencyBars navigatorMicStream={navigatorMicStream} />
    <InfoBar />
  </div>;

export const App = compose(
  inject('store'),
  mapProps(R.applySpec({
    spectrumInfo: R.path(['store','spectrumInfo']),
    windowInfo: R.path(['store','windowInfo']),
  })),
  withState('navigatorMicStream', 'setStream', null),
  lifecycle({
    componentDidMount() {
      this.props.windowInfo.init();
      ss(socket).on('mic-stream', (stream) => {
        this.props.setStream(stream);
      });
    }
  })
)(observer(AppComponent));

export default App;
