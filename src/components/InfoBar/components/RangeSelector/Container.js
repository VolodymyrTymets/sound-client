import { compose, withState, withPropsOnChange } from 'recompose';
import { RangeSelectorComponent } from './Component';
import {inject} from "mobx-react";

const RangeSelector = compose(
  inject('store'),
  withState('rate', 'setRate', ({ store }) => [
    store.config.minRateDif,
    store.config.maxRateDif,
  ]),
  withPropsOnChange(['rate'], ({ rate, store }) => {
      store.config.setRate(rate[0], rate[1]);
      store.spectrumInfo.changeConfig({ minRateDif: rate[0] });
  }),
)(RangeSelectorComponent);

export { RangeSelector }
