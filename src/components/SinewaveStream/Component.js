import * as R from 'ramda';
import React from 'react';
import { number } from 'prop-types';
import { Loader } from '../Common/Loader'

const SinewaveComponent = ({ sineWaveHeight, sineWaveWidth, chunkCount, imgUrls, isLoading }) =>  {
  return isLoading ? (
    <div className="d-flex flex-row">
      {R.range(1, chunkCount + 1).map((index) =>
        imgUrls[chunkCount - index] && <img
          src={imgUrls[chunkCount - index]}
          key={`image-${index}`}
          width={(sineWaveWidth ) / (chunkCount + 1)}
          height={sineWaveHeight}
        />)
      }
      <canvas
        className="sinewave"
        width={sineWaveWidth / (chunkCount + 1)}
        height={sineWaveHeight}
      />
    </div>
  ): <Loader />;
}


SinewaveComponent.propTypes = {
  sineWaveHeight: number,
  sineWaveWidth: number,
};

export { SinewaveComponent };
