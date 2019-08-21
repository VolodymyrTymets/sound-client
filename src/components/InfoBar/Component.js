import React from 'react';
import { Range } from 'react-range';

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

const InfoBarComponent = ({ spectrumInfo, config, distance, micRate, setMicRate }) =>
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
      <Range
        step={0.1}
        min={0}
        max={100}
        values={[micRate]}
        onChange={rate => setMicRate(rate[0])}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '6px',
              width: '100%',
              backgroundColor: '#ccc'
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '42px',
              width: '42px',
              backgroundColor: '#999'
            }}
          />
        )}
      />
    </div>
    ) : (<div className="flex-fill d-flex flex-column"><h1 className="text-center">{spectrumInfo.timeLeft }</h1></div>);

InfoBarComponent.propTypes = {

};

export { InfoBarComponent };
