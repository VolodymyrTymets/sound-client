import React, { useState, useEffect } from 'react';
import { Range, getTrackBackground } from 'react-range';
import './MicLevelControl/style.css';
import { inject, observer } from "mobx-react";
import { compose } from "ramda";

const STEP = 5;
const MIN = 0;
const MAX = 100;

const RangeSelectorComponent = ({ store }) => {
  const { config, spectrumInfo } = store;
  const [rate, setRate] = useState([config.minRateDif, config.maxRateDif]);

  useEffect(() => {
    config.setRate(rate[0], rate[1]);
    spectrumInfo.changeConfig({ minRateDif: rate[0] });
  }, [rate]);


  return (
    <div className="d-flex flex-row">
      <p className="indicator">0</p>
      <div className="range-container">
        <Range
          step={STEP}
          min={MIN}
          max={MAX}
          values={rate}
          onChange={setRate}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                background: getTrackBackground({
                  values: rate,
                  colors: ['#aaa', '#000000', '#aaa'],
                  min: MIN,
                  max: MAX,
                }),
              }}
              className="line"
            >
              <div
                ref={props.ref}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({props, isDragged}) =>(
            <div
              {...props}
              style={{
                ...props.style,
              }}
              className="toggle"
            >
              <div className="circle-container">
                <div className={`circle ${isDragged ? 'active' : ''}`}> </div>
                <div className={`circle ${isDragged ? 'active' : ''}`}> </div>
                <div className={`circle ${isDragged ? 'active' : ''}`}> </div>
              </div>
            </div>)
          }
        />
      </div>
      <p className="indicator">100</p>
    </div>
  );
};

export default observer(compose(
  inject('store'),
)(RangeSelectorComponent));
