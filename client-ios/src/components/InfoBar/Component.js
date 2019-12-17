import React from 'react';
import * as R from 'ramda';
import { isNumber } from 'lodash';
import { MicLevelControl } from './components/MicLevelControl'
import { RangeSelector } from './components/RangeSelector';
import { useWindowSize } from '../../hooks/useWindowSize';
import { getDistance } from '../../utils/distance-getter/get-distance';


const InfoBarComponent = ({ spectrumInfo, config, socket }) => {
    const size = useWindowSize();
    const style = {
       maxWidth: size.width,
       maxHeight: size.height
    };
    const min = R.path(['minRateDif'], config);
    const max = R.path(['maxRateDif'], config);
    const ratting = R.path(['meanOfBreathR'], spectrumInfo);
    const distance = getDistance(min, max, ratting || 0);
    return (
      <div className="d-flex flex-column align-items-t flex-fill" style={style}>
        <h1 className="text-center" style={{color: spectrumInfo.color}}>
            {isNumber(distance) ? `${distance} mm` : '-'}
        </h1>
        <MicLevelControl socket={socket}/>
        {spectrumInfo.timeLeft <= 0 ?
          <div>

              <div className="d-flex flex-column ">
                  <h3 className="text-center">
                      <small className="text-muted">Spectrum:</small>
                      {Math.round(spectrumInfo.meanOfBreath)} / {Math.round(spectrumInfo.mean)} = {spectrumInfo.meanOfBreathR} %
                  </h3>
                  <h5 className="text-center">
                      <small className="text-muted">Range:</small>
                      {config.minRateDif} / {config.maxRateDif}
                  </h5>
                  <RangeSelector/>
              </div>
          </div> :
          <div className="flex-fill d-flex flex-column">
              <h1 className="text-center">{spectrumInfo.timeLeft}</h1>
          </div>
        }
    </div>
    );
};

InfoBarComponent.propTypes = {

};

export { InfoBarComponent };
