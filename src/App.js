import React from 'react';
import { compose, lifecycle, withState } from "recompose";
import { Sinewave } from './components/Sinewave';
import { FrequencyBars } from './components/FrequencyBars';


const AppComponent = ({ navigatorMicStream }) =>
  <div className="container-fluid">
    <Sinewave navigatorMicStream={navigatorMicStream} />
    <FrequencyBars navigatorMicStream={navigatorMicStream} />
  </div>;

export const App = compose(
  withState('navigatorMicStream', 'setStream', null),
  lifecycle({
    componentDidMount() {
      navigator.mediaDevices.getUserMedia ({ audio: true })
        .then(this.props.setStream)
        .catch( function(err) { console.log('The following gUM error occured: ' + err);})
    }
  })
)(AppComponent);

export default App;
