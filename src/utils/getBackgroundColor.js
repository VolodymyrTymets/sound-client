const getBackgroundColor = (ratting) => {
  if(ratting > 30) {
    return `rgb(255, ${100 - ratting || 0},  ${100 - ratting || 0})`; // red
  } else {
    return `rgb(${155 + ratting}, 255, ${155 + ratting})`; // green
  }
};

export { getBackgroundColor };
