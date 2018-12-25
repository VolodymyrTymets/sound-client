import * as R from 'ramda';
import { compose, mapProps } from 'recompose';
import { observer, inject } from 'mobx-react';
import { InfoBarComponent } from './Component';

const InfoBarContainer = compose(
  inject('store'),
  mapProps(R.applySpec({
    spectrumInfo: R.path(['store','spectrumInfo']),
    config: R.path(['store','config']),
    backgroundColor: R.path(['backgroundColor']),
  })),
)(observer(InfoBarComponent));

export const InfoBar = inject('store')(InfoBarContainer);
