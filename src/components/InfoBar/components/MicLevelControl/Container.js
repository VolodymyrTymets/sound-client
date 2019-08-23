import { compose, withState, withPropsOnChange } from 'recompose';
import { MicLevelControlComponent } from './Component';

const MicLevelControl = compose(
  withState('micRate', 'setMicRate', 100),
  withPropsOnChange(['micRate'], ({ micRate, socket }) => {
    socket.emit('micRate', { micRate: parseInt(micRate) })
  }),
)(MicLevelControlComponent);

export { MicLevelControl }
