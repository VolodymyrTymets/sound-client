import { expect } from 'chai';
import { getDistance } from './get-distance';

describe('utils - method => [getDistance]', () => {
  const MIN = 50, MAX = 90, range = 6;
  it('should return distance 6 mm, where rating [50]', () => {
    const distance = getDistance(MIN, MAX,50, range);
    expect(distance).to.be.equal(6);
  });
  it('should return distance 0 mm, where rating [60]', () => {
    const distance = getDistance(MIN, MAX,90, range);
    expect(distance).to.be.equal(0);
  });
  it('should return distance 0 mm, where rating [100]', () => {
    const distance = getDistance(MIN, MAX,100, range);
    expect(distance).to.be.equal(0);
  });
  it('should return distance null, where rating [40]', () => {
    const distance = getDistance(MIN, MAX,40, range);
    expect(distance).to.be.equal(null);
  });

  it('should return distance null, where rating [55]', () => {
    const distance = getDistance(MIN, MAX,55, range);
    expect(distance).to.be.equal(5);
  });
  it('should return distance null, where rating [65]', () => {
    const distance = getDistance(MIN, MAX,65, range);
    expect(distance).to.be.equal(4);
  });
  it('should return distance null, where rating [75]', () => {
    const distance = getDistance(MIN, MAX,75, range);
    expect(distance).to.be.equal(2);
  });
  it('should return distance null, where rating [85]', () => {
    const distance = getDistance(MIN, MAX,85, range);
    expect(distance).to.be.equal(1);
  });
  it('should return distance null, where rating [63.21212]', () => {
    const distance = getDistance(MIN, MAX,63.21212, range);
    expect(distance).to.be.equal(4);
  });
});