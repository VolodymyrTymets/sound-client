import React from 'react';
import { compose, lifecycle, withState } from "recompose";
import { inject } from "mobx-react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Sinewave } from './components/SinewaveStream';
import { FrequencyBars } from './components/FrequencyBarsStream';
import { InfoBar } from './components/InfoBar';
import ss from 'socket.io-stream';
import socket from './utils/socket';


const AppComponent = ({ navigatorMicStream }) =>
  <div className="container-fluid">
    <Sinewave navigatorMicStream={navigatorMicStream} />
    <FrequencyBars navigatorMicStream={navigatorMicStream} />
    <InfoBar />
  </div>;

export const App = compose(
  inject('store'),
  withState('navigatorMicStream', 'setStream', null),
  lifecycle({
    componentDidMount() {
      this.props.store.windowInfo.init();
      ss(socket).on('mic-stream', (stream) => {
        this.props.setStream(stream);
      });
    }
  })
)(AppComponent);

export default App;
