import React from 'react';
import { number } from 'prop-types';

const FrequencyBarsComponent = ({  frequencyHeight, frequencyWidth }) => (
  <canvas className="frequency-bars" width={frequencyWidth} height={frequencyHeight}></canvas>
);

FrequencyBarsComponent.propTypes = {
  frequencyWidth: number,
  frequencyHeight: number
};

export { FrequencyBarsComponent };
