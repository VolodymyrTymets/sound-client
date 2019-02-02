import React from 'react';
// import { string, func } from 'prop-types';

// use it on dev
const ConfigBar = ({ config }) => (
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
);

const InfoBarComponent = ({ spectrumInfo, config }) =>
  spectrumInfo.timeLeft <= 0 ? (
    <div >
      <div className="d-flex flex-column justify-content-center" >
        <h1 className="text-center">
           {spectrumInfo.meanOfBreathR} %
        </h1>
        <h1 className="text-center">
          {spectrumInfo.mean} / {spectrumInfo.meanOfBreath}
        </h1>
      </div>
      {/*{<ConfigBar config={config}>}*/}
    </div>
    ) : (<h1 className="text-center">{spectrumInfo.timeLeft }</h1>);

InfoBarComponent.propTypes = {

};

export { InfoBarComponent };
