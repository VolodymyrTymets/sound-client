/**
* This function return distance in millimeters
* from RN to point of stimulation by sound spectrum value
* @name  getDistance
 * @function
 * @param {Number} - min value of RLN reaction (furthest distance)
 * @param {Number} - min value of RLN reaction (closest distance)
 * @param {Number} - rating of breath in a pint of stimulation
 * @param {Number} - distance range from RLN where reaction are possible
**/
const getDistance = (min, max, rating, range = 4) => {
    if(rating < min ) return null;
    if(rating > max ) return 0;
    // step of value that is changing with distance
    const step = (max - min) / range;
    const distance = (max - rating) / step;
    return Math.round(distance)
};

export { getDistance };