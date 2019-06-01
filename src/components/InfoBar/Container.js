import * as R from 'ramda';
import { compose, mapProps } from 'recompose';
import { observer, inject } from 'mobx-react';
import { InfoBarComponent } from './Component';
import { getDistance } from '../../utils/distance-getter/get-distance';

const InfoBarContainer = compose(
  inject('store'),
  mapProps(R.applySpec({
    spectrumInfo: R.path(['store','spectrumInfo']),
    config: R.path(['store','config']),
    distance: R.pipe(
      R.applySpec({
        min: R.path(['store','config', 'minRateDif']),
        max: R.path(['store','config', 'maxRateDif']),
        ratting: R.path(['store','spectrumInfo', 'meanOfBreathR']),
      }),
      ({ min, max, ratting }) => getDistance(min, max, ratting || 0),
    )
  })),
)(observer(InfoBarComponent));

export const InfoBar = inject('store')(InfoBarContainer);
