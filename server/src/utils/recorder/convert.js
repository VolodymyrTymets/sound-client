const path = require('path');
const { exec } = require('child_process');

const fileName = process.argv[2];
const filePath =  path.resolve('./private/records', fileName);

exec(`sox -t raw -b 16 -e signed-integer -r 44100 -c 1 ${filePath}.raw ${filePath}.wav`);

console.log('--> end');