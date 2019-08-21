import * as R from 'ramda';
import { compose, mapProps, withState, withPropsOnChange } from 'recompose';
import { observer, inject } from 'mobx-react';
import { InfoBarComponent } from './Component';
import { getDistance } from '../../utils/distance-getter/get-distance';

// todo mic refactor
const InfoBarContainer = compose(
  inject('store'),
  withState('micRate', 'setMicRate', 100),
  withPropsOnChange(['micRate'], ({ micRate, socket }) => {
      console.log('---->', micRate)
      socket.emit('micRate', { micRate: parseInt(micRate) })
  }),
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
    ),
    micRate: R.path(['micRate']),
    setMicRate: R.path(['setMicRate']),
  })),
)(observer(InfoBarComponent));

export const InfoBar = inject('store')(InfoBarContainer);
