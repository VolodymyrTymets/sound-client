const getBackgroundColor = (ratting, timeLeft, config) => {
  if(timeLeft !== 0) {
    return 'white';
  }
  if(ratting > config.minRateDif) {
    console.log(100 - ratting || 0)
    return `rgb(255, ${155 - (ratting + 15) || 0},  ${155 - (ratting + 15) || 0})`; // red
  } else {
    return `rgb(${155 + ratting}, 255, ${155 + ratting})`; // green
  }
};

export { getBackgroundColor };
