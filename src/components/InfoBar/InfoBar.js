import React from 'react';
import MicLevelControl from './components/MicLevelControl/MicLevelControl'
import RangeSelector from './components/RangeSelector';
import { useWindowSize } from '../../hooks/useWindowSize';
import { inject, observer } from "mobx-react";
import { compose } from "ramda";
import { getDistance } from '../../utils/distance-getter/get-distance';

const InfoBarComponent = ({ store, socket }) => {
    const { spectrumInfo, config } = store;
    const { minRateDif, maxRateDif } = config;
    const ratting = spectrumInfo.meanOfBreathR || 0;
    const distance = getDistance(minRateDif, maxRateDif, ratting);
    const size = useWindowSize();
    const style = {
       maxWidth: size.width,
       maxHeight: size.height
    };

    return (
      <div className="d-flex flex-column align-items-t flex-fill" style={style}>
        <h1 className="text-center" style={{color: spectrumInfo.color}}>
            {distance !== null ? `${distance} mm` : '-'}
        </h1>
        <MicLevelControl socket={socket}/>
        {spectrumInfo.timeLeft <= 0 ?
          <div>

              <div className="d-flex flex-column ">
                  <h3 className="text-center">
                      <small className="text-muted">Spectrum:</small>
                      {spectrumInfo.meanOfBreath} / {spectrumInfo.mean} = {spectrumInfo.meanOfBreathR} %
                  </h3>
                  <h5 className="text-center">
                      <small className="text-muted">Range:</small>
                      {minRateDif} / {maxRateDif}
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

export default observer(compose(
  inject('store'),
)(InfoBarComponent));
