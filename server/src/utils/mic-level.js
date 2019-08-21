const { uniq } = require('lodash');
const { spawn } = require('child_process');
const ls = spawn('amixer', ['scontrols']);

/**
 * to know card name
 * alsamixer
 * f6
 * then
 *          card   name
 * amixer -c 2 set Mic 80%
   amixer -c 2 set Mic 2db // from 0 to 24
 * */

ls.stdout.on('data', (data) => {
  const paramsStrings = data.toString()
    .replace(/Simple mixer control/g, '')
    .replace(/\'/g, '')
    .split('\n').map(line => ({
       name:line.split(',')[0],
       card: line.split(',')[1],
    }));

  const toCard = ({ card }) => card && parseInt(card) || 0;
  const toName = ({ name }) => name && name || '';
  const cards = uniq(paramsStrings.map(toCard));
  const names = uniq(paramsStrings.map(toName)).filter(v => !!v);
  console.log({ paramsStrings, cards, names });

  const micDown = (level) => cards.forEach(card => names.forEach(name => {
    // spawn('amixer', ['-c', card, 'set', name, level]).stdout.on('data', (data) => {
    //   console.log('----->', data.toString())
    // });

    spawn('amixer', ['-c', 2, 'set', 'Mic', level]).stdout.on('data', (data) => {
      console.log('----->', data.toString())
    });
  }));
 // micDown('mute');

  setInterval(() => micDown('2%'), 1000)

  // // console.log(`stdout: ${data}, card`, data.toString());
  // const card = params[params.length - 1];
  // const name = params[params.length - 2];
  //console.log({card, name });
});