import { compose, withState, withPropsOnChange } from 'recompose';
import { RangeSelectorComponent } from './Component';
import {inject} from "mobx-react";

const RangeSelector = compose(
  inject('store'),
  withState('rate', 'setRate', [50 ,90]),
  withPropsOnChange(['rate'], ({ rate, store }) => {
      store.config.setRate(rate[0], rate[1]);
  }),
)(RangeSelectorComponent);

export { RangeSelector }
