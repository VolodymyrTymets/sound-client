import * as R from 'ramda';
import { compose, lifecycle, withProps, mapProps } from 'recompose';
import { observer, inject } from 'mobx-react';
import { InfoBarComponent } from './Component';

const InfoBarContainer = compose(
  mapProps(R.applySpec({
    barInfo: R.path(['store','barInfo'])
  })),
  lifecycle({
    componentDidMount() {
      const { barInfo } = this.props;
    }
  })
)(observer(InfoBarComponent));

export const InfoBar = inject('store')(InfoBarContainer);
