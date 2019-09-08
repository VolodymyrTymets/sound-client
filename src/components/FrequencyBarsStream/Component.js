import React from 'react';
import { number } from 'prop-types';
import {Loader} from "../Common/Loader";

const FrequencyBarsComponent = ({  frequencyHeight, frequencyWidth, isLoading }) => (
  <div className="d-flex flex-row">
    <canvas className="frequency-bars" width={frequencyWidth} height={frequencyHeight}></canvas>
    <Loader isLoading={isLoading} height={frequencyHeight} width={frequencyWidth} />
  </div>
);

FrequencyBarsComponent.propTypes = {
  frequencyWidth: number,
  frequencyHeight: number
};

export { FrequencyBarsComponent };
