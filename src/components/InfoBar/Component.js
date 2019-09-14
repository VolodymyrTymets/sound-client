import React from 'react';
import { MicLevelControl } from './components/MicLevelControl'
import { RangeSelector } from './components/RangeSelector';
import { useWindowSize } from '../../hooks/useWindowSize';

const InfoBarComponent = ({ spectrumInfo, config, distance, socket }) => {
    const size = useWindowSize();
    console.log('size ->', size)
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
