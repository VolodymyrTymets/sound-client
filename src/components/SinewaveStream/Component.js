import * as R from 'ramda';
import React from 'react';
import { number } from 'prop-types';

const width = 1024;
const SinewaveComponent = ({ wavesCount, sineWaveHeight }) => (
  <div className="d-flex flex-row">
    {
      R.range(0, wavesCount).map(index =>
        (<canvas key={index} className={`sinewave-${index}`} width={width / wavesCount} height={sineWaveHeight}></canvas>)
      )
    }
  </div>
);

SinewaveComponent.propTypes = {
  wavesCount: number,
};

export { SinewaveComponent };
