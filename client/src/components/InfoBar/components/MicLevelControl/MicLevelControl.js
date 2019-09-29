import React, { useState, useEffect } from 'react';
import { getTrackBackground, Range} from 'react-range';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophoneAlt } from '@fortawesome/free-solid-svg-icons';
import './style.css';

const MicLevelControlComponent = ({  socket, meanSpectrumOfBreath }) => {
  const [micRate, setMicRate] = useState(50);

  useEffect(() => {
    socket.emit('micRate', { micRate: parseInt(micRate) });
    meanSpectrumOfBreath.refreshListening();
  }, [micRate]);

  return (
    <div className="d-flex flex-row">
      <p className="icon-container"><FontAwesomeIcon icon={faMicrophoneAlt} className="icon"/></p>
      <p className="indicator">-</p>
      <div className="range-container">
        <Range
          step={1}
          min={0}
          max={100}
          values={[micRate]}
          onChange={rate => setMicRate(rate[0])}
          renderTrack={({props, children}) => (
            <div
              {...props}
              style={{
                ...props.style,
                background: getTrackBackground({
                  values: [micRate],
                  colors: ['#000000', '#aaa',],
                  min: 0,
                  max: 100,
                }),
              }}
              className='line'
            >
              {children}
            </div>
          )}
          renderThumb={({props, isDragged}) => (
            <div
              {...props}
              className='toggle'
              style={{
                ...props.style,

              }}
            >
              <div className="circle-container">
                <div className={`circle ${isDragged ? 'active' : ''}`}></div>
                <div className={`circle ${isDragged ? 'active' : ''}`}></div>
                <div className={`circle ${isDragged ? 'active' : ''}`}></div>
              </div>
            </div>
          )}
        />
      </div>
      <p className="indicator">+</p>
    </div>
  );
};

export default MicLevelControlComponent;
