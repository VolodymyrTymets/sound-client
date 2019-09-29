import React from 'react';
import { number } from 'prop-types';

const FrequencyBarsComponent = ({  frequencyHeight, frequencyWidth }) => (
  <div className="d-flex flex-row">
    <canvas className="frequency-bars" width={frequencyWidth} height={frequencyHeight}></canvas>
  </div>
);

FrequencyBarsComponent.propTypes = {
  frequencyWidth: number,
  frequencyHeight: number
};

export { FrequencyBarsComponent };
