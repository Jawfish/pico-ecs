import { doSomeStuff } from '../src/index';

describe('doSomeStuff', () => {
  it(`should be true"`, () => {
    expect(doSomeStuff()).toBe(true);
  });
});
