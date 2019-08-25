import React from 'react';
import { MicLevelControl } from './components/MicLevelControl'
import { RangeSelector } from './components/RangeSelector';

// import { string, func } from 'prop-types';

// use it on dev
const ConfigBar = ({ config }) => (
  <div className="d-flex flex-column justify-content-center align-items-center">

    <p>Config:  </p>
    <p>Url: {config.url} </p>
    <p>Mic Rate: {config.mic.rate} </p>
    <p>Mic Channels: {config.mic.channels} </p>
    <p>Mic Name: {config.mic.device} </p>
    <p>Time To Listen: {config.timeToListen} </p>
    <p>Min RateDif: {config.minRateDif} </p>
    <p>Sinewave Scale: {config.sinewaveScale} </p>
  </div>
);

// todo mic refactor

const InfoBarComponent = ({ spectrumInfo, config, distance, socket }) =>
  <div className="d-flex flex-column align-items-t flex-fill">
    <MicLevelControl socket={socket} />
    { spectrumInfo.timeLeft <= 0 ?
      <div>
        <h1 className="text-center" style={{color: spectrumInfo.color}}>
          {distance !== null ? `${distance} mm`: '-'  }
        </h1>
        <div className="d-flex flex-column " >
          <h3 className="text-center">
            <small className="text-muted">Spectrum: </small>
            {spectrumInfo.meanOfBreath} / {spectrumInfo.mean} = {spectrumInfo.meanOfBreathR} %
          </h3>
          <RangeSelector />
          <h5 className="text-center">
            <small className="text-muted">Range: </small>{config.minRateDif}  / {config.maxRateDif}
          </h5>
        </div>
      </div>:
      <div className="flex-fill d-flex flex-column">
        <h1 className="text-center">{spectrumInfo.timeLeft }</h1>
      </div>
    }
  </div>;

InfoBarComponent.propTypes = {

};

export { InfoBarComponent };
