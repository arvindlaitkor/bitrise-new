/**
 * Tests of Utils
 */
import * as utils from '../utils';

beforeAll(() => {
  console.error = (error) => {
    throw new Error(error);
  };
});

describe('(Utils) uid()', () => {
  it('should be different', () => {
    expect(utils.uid()).not.toEqual(utils.uid());
  });
});

describe('(Utils) isValidEmail', () => {
  it('should be valid', () => {
    expect(utils.isValidEmail('name@example.com')).toBeTruthy();
  });

  it('should be invalid', () => {
    expect(utils.isValidEmail('name@@examplecom.')).not.toBeTruthy();
  });
});

describe('(Utils) numberWithCommas', () => {
  it('should be with comma', () => {
    expect(utils.numberWithCommas(0)).toEqual('0');
    expect(utils.numberWithCommas(1000)).toEqual('1,000');
    expect(utils.numberWithCommas(10000)).toEqual('10,000');
    expect(utils.numberWithCommas(100000)).toEqual('100,000');
  });
});

describe('(Utils) isTouchDevice', () => {
  it('should be false', () => {
    expect(utils.isTouchDevice()).toBeFalsy();
  });
});
