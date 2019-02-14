const path = require('path');
const { exec } = require('child_process');
const wavFileInfo = require('wav-file-info');


const filePathN = path.resolve(__dirname ,'./private/assets', './n.wav');

console.log('filePathN ->', filePathN);

wavFileInfo.infoByFilename(filePathN, function(err, info){
  if (err) throw err;
  console.log(info);
  const duration = info.duration * 4; //0.2;
  const play = () => exec(`afplay ${filePathN}`)

  let statOfPlay = null;
  const playint = setInterval(() => {
    if(!statOfPlay) {
      play();
    }
    statOfPlay = statOfPlay || new Date().getTime();
    const diff = (new Date().getTime() - statOfPlay) / 1000;
    if(diff >= duration) {
      statOfPlay = new Date().getTime();
      play()
    }
  }, 100);

  setTimeout(() => clearInterval(playint), 2000);
});

