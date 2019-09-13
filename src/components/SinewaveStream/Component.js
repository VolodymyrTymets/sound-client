import * as R from 'ramda';
import React from 'react';
import { number } from 'prop-types';

const SinewaveComponent = ({ sineWaveHeight, sineWaveWidth, chunkCount, imgUrls, isLoading }) =>  {
  return (
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
  )
}


SinewaveComponent.propTypes = {
  sineWaveHeight: number,
  sineWaveWidth: number,
};

export { SinewaveComponent };
