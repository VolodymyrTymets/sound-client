import React from 'react';
import { Range } from 'react-range';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophoneAlt } from '@fortawesome/free-solid-svg-icons';
import './style.css';

const MicLevelControlComponent = ({ micRate, setMicRate }) =>
  <div className="d-flex flex-row">
    <p className="icon-container"><FontAwesomeIcon icon={faMicrophoneAlt} className="icon" /></p>
    <p className="indicator">-</p>
    <div className="range-container">
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
            }}
            className='line'
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            className='toggle'
            style={{
              ...props.style,

            }}
          >
              <div className="circle-container">
              <div className="circle"> </div>
              <div className="circle"> </div>
              <div className="circle"> </div>
              </div>
          </div>
        )}
      />
    </div>
    <p className="indicator">+</p>
  </div>;


MicLevelControlComponent.propTypes = {

};

export { MicLevelControlComponent };
