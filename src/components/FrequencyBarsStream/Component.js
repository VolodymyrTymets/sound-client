import React from 'react';

// import { string, func } from 'prop-types';

const FrequencyBarsComponent = ({  frequencyHeight }) => (
  <canvas className="frequency-bars" width="1024" height={frequencyHeight}></canvas>
);

FrequencyBarsComponent.propTypes = {

};

export { FrequencyBarsComponent };
