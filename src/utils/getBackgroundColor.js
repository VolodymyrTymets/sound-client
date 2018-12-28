const getBackgroundColor = (ratting, timeLeft) => {
  if(timeLeft !== 0) {
    return 'white';
  }
  if(ratting > 30) {
    return `rgb(255, ${100 - ratting || 0},  ${100 - ratting || 0})`; // red
  } else {
    return `rgb(${155 + ratting}, 255, ${155 + ratting})`; // green
  }
};

export { getBackgroundColor };
