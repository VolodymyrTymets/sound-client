import * as R from 'ramda';
import { compose, mapProps, withHandlers } from 'recompose';
import { inject } from 'mobx-react';
import { InteractWindowComponent } from './Component';

const InteractWindow = compose(
  inject('store'),
  mapProps(R.applySpec({
    windowInfo: R.path(['store','windowInfo']),
  })),
  withHandlers({
    onInteractWithWindowClick: ({ windowInfo }) => () => windowInfo.interactWithWindow()
  })
)(InteractWindowComponent);

export { InteractWindow }
