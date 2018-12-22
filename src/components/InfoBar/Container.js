import * as R from 'ramda';
import { compose, lifecycle, mapProps } from 'recompose';
import { observer, inject } from 'mobx-react';
import { InfoBarComponent } from './Component';

const InfoBarContainer = compose(
  inject('store'),
  mapProps(R.applySpec({
    spectrumInfo: R.path(['store','spectrumInfo']),
  })),
)(observer(InfoBarComponent));

export const InfoBar = inject('store')(InfoBarContainer);
