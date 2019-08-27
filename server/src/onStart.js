const { colors } = require('./utils/colors');
const { NERVE, MUSCLE } = require('./constants');
const { Mic } = require('./utils/Mic');
const { SpectrumWorker } = require('./utils/SpectrumWorker');
const { notify } = require('./utils/notifier');
const { initControllers } =  require('./controllers/index');


const onStart = (config, io) => {
  let switcher = null;

  const spectrumWorker = new SpectrumWorker(config);
  spectrumWorker.on(NERVE, () => notify.nerveNotify());
  spectrumWorker.on(MUSCLE,() => notify.muscleNotify());

  const stopRecord = () => {
    if(global.mic) {
      mic.stop();
      spectrumWorker.stop();
      notify.gpioOff();
    }
  };
  const startRecord = () => {
    if(global.mic) {
      console.log(`Run: mic:${config.mic.device} gpio: [mic:${config.gpio.mic} nerve:${config.gpio.nerve} muscle:${config.gpio.muscle}]`)
      mic.start();
      notify.micNotify(1);
    }
  };

  global.mic = new Mic(config,
    (audioData) => spectrumWorker.start(audioData.channelData[0]));

  initControllers(config, io);

  try {
    const Gpio = require('onoff').Gpio;
    switcher  = new Gpio(config.gpio.switcher, 'in', 'both');
    config.DEBUG_MODE && console.log(colors.FgBlue, `[Switch start] ---> [${switcher.readSync()}]`);
    switcher.watch((err, value) => {
      if (err) { console.log(err) }
      if (value) {
        config.DEBUG_MODE && console.log(colors.FgBlue, `[Switch] ---> [${value}]`);
        startRecord();
      } else {
        config.DEBUG_MODE && console.log(colors.FgBlue, `[Switch] ---> [${value}]`);
        stopRecord();
      }
    });
  } catch (e) {
    console.log('----> !!Error -> GPIO is not detected!!!');
    startRecord();
  }
  notify.muscleNotify();

  process.on('exit', () => {
    stopRecord();
    notify.gpioOff();
    notify.clear();
    switcher && switcher.unexport();
    console.log(colors.FgWhite,'<----by by----->');
  });
  process.on('SIGINT', async () => process.exit());
};

module.exports = { onStart };
