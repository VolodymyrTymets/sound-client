import React from 'react';
// import { string, func } from 'prop-types';

const InfoBarComponent = ({ spectrumInfo, config, backgroundColor }) =>
  spectrumInfo.timeLeft <= 0 ? (
    <div style={{ backgroundColor }}>
    <div className="d-flex flex-row justify-content-between" >
      <p>Mean: {spectrumInfo.mean} </p>
      <p>Max: {spectrumInfo.max} </p>
      <p>MB:{spectrumInfo.meanOfBreath} / {spectrumInfo.meanOfBreathR} %</p>
      <p>M:</p>
    </div>
      <div className="d-flex flex-column justify-content-between">
        <p>Config:  </p>
        <p>Url: {config.url} </p>
        <p>Mic Rate: {config.mic.rate} </p>
        <p>Mic Channels: {config.mic.channels} </p>
        <p>Mic Name: {config.mic.device} </p>
        <p>Time To Listen: {config.timeToListen} </p>
        <p>Min RateDif: {config.minRateDif} </p>
        <p>Sinewave Scale: {config.sinewaveScale} </p>
      </div>
    </div>
    ) : (<h1 className="text-center">{spectrumInfo.timeLeft }</h1>);

InfoBarComponent.propTypes = {

};

export { InfoBarComponent };
