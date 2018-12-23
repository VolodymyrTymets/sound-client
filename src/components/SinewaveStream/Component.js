import * as R from 'ramda';
import React from 'react';
import { number } from 'prop-types';

const SinewaveComponent = ({ sineWaveHeight, sineWaveWidth }) => (
  <div className="d-flex flex-row">
    <canvas className="sinewave" width={sineWaveWidth} height={sineWaveHeight}></canvas>
  </div>
);

SinewaveComponent.propTypes = {
  sineWaveHeight: number,
  sineWaveWidth: number,
};

export { SinewaveComponent };
