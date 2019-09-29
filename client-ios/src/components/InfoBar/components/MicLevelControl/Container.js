import { compose, withState, withPropsOnChange } from 'recompose';
import { MicLevelControlComponent } from './Component';
import {inject} from "mobx-react";

const MicLevelControl = compose(
  inject('store'),
  withState('micRate', 'setMicRate', 50),
  withPropsOnChange(['micRate'], ({ micRate, socket, store }) => {
    socket.emit('micRate', { micRate: parseInt(micRate) });
    store.spectrumInfo.refreshListening();
  }),
)(MicLevelControlComponent);

export { MicLevelControl }
