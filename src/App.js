import React from 'react';
import { compose, lifecycle, withState } from "recompose";
// import { Sinewave } from './components/Sinewave';
// import { FrequencyBars } from './components/FrequencyBars';

import { Sinewave } from './components/SinewaveStream';
import ss from 'socket.io-stream';
import socket from './utils/socket';


const AppComponent = ({ navigatorMicStream }) =>
  <div className="container-fluid">
    <Sinewave navigatorMicStream={navigatorMicStream} />
  </div>;

export const App = compose(
  withState('navigatorMicStream', 'setStream', null),
  lifecycle({
    componentDidMount() {
      // navigator.mediaDevices.getUserMedia ({ audio: true })
      //   .then(this.props.setStream)
      //   .catch( function(err) { console.log('The following gUM error occured: ' + err);})
      ss(socket).on('mic-stream', (stream) => {
        // s.on('data', buffer =>
        //   console.log(buffer))

        this.props.setStream(stream);
      });
    }
  })
)(AppComponent);

export default App;
