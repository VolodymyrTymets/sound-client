import React from 'react';
import MicLevelControl from './components/MicLevelControl/MicLevelControl'
import RangeSelector from './components/RangeSelector';
import { useWindowSize } from '../../hooks/useWindowSize';
import { getDistance } from '../../utils/distance-getter/get-distance';
import './style.css';

const InfoBarComponent = ({ meanSpectrumOfBreath, color, spectrumInfo, socket, config, onRateChange }) => {
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
        <h1 className="text-center" style={{ color }}>
            {distance !== null ? `${distance} mm` : '-'}
        </h1>
        <MicLevelControl socket={socket} meanSpectrumOfBreath={meanSpectrumOfBreath} />
        {spectrumInfo.timeLeft <= 0 ?
          <div>

              <div className="d-flex flex-column ">
                  <h3 className="text-center">
                      <small className="text-muted">Spectrum:</small>
	                  {spectrumInfo.meanOfBreath} / <span className="info-bar-spectrum-span"> {spectrumInfo.meanSpectrum} </span> =
                      <span className="info-bar-spectrum-span">{spectrumInfo.meanOfBreathR}</span> %
                  </h3>
                  <h5 className="text-center">
                      <small className="text-muted">Range:</small>
                      {minRateDif} / {maxRateDif}
                  </h5>
                  <RangeSelector meanSpectrumOfBreath={meanSpectrumOfBreath} config={config} onRateChange={onRateChange} />
              </div>
          </div> :
          <div className="flex-fill d-flex flex-column">
              <h1 className="text-center">{spectrumInfo.timeLeft}</h1>
          </div>
        }
    </div>
    );
};

export default InfoBarComponent;
