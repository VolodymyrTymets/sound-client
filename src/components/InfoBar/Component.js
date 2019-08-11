import React from 'react';
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

const InfoBarComponent = ({ spectrumInfo, config, distance }) =>
  spectrumInfo.timeLeft <= 0 ? (
    <div className="d-flex flex-column align-items-t flex-fill">
      <h1 className="text-center" style={{color: spectrumInfo.color}}>
        {distance !== null ? `${distance} mm`: '-'  }
      </h1>
      <div className="d-flex flex-column " >
        <h3 className="text-center">
          <small className="text-muted">Spectrum: </small>
          {spectrumInfo.meanOfBreath} / {spectrumInfo.mean} = {spectrumInfo.meanOfBreathR} %
        </h3>
        <h5 className="text-center">
          <small className="text-muted">Range: </small>{config.minRateDif}  / {config.maxRateDif}
        </h5>
      </div>
      {/*{<ConfigBar config={config}>}*/}
    </div>
    ) : (<div className="flex-fill d-flex flex-column"><h1 className="text-center">{spectrumInfo.timeLeft }</h1></div>);

InfoBarComponent.propTypes = {

};

export { InfoBarComponent };
