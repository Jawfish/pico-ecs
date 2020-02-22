import * as Util from '../../src/lib/Util';

describe('containsEvery', () => {
  it('should return true if the first array contains every item in the second array', () => {
    const containsEveryTestFun = (
      // tslint:disable
      compareAgainst: any[],
      toCompare: any[]
    ) => {
      let bool = true;
      for (let i = 0; i < toCompare.length; i++) {
        const item = toCompare[i];
        bool = bool && !!~compareAgainst.indexOf(item);
      }
      return bool;
    };
    const thoroughCaseOne = [
      [3202, 2466, 4971, 6688, 7148, 2402, 3197, 9300],
      [2466, 6688, 7148, 2402, 3197, 9300, 3202],
    ];
    const thoroughCaseTwo = [
      [3202, 2466, 4971, 6688, 3678, 3197, 9300],
      [2466, 4971, 6688, 7148, 1234, 3197, 9300, 3202],
    ];
    expect(Util.containsEvery([1], [1])).toEqual(true);
    expect(Util.containsEvery([1, 2], [1, 2])).toEqual(true);
    expect(Util.containsEvery([1, 2, 3, 4], [1, 2, 4])).toEqual(true);
    expect(Util.containsEvery([1, 2], [1, 2, 3])).toEqual(false);
    expect(Util.containsEvery(thoroughCaseOne[0], thoroughCaseOne[1])).toEqual(
      containsEveryTestFun(thoroughCaseOne[0], thoroughCaseOne[1])
    );
    expect(Util.containsEvery(thoroughCaseTwo[0], thoroughCaseTwo[1])).toEqual(
      containsEveryTestFun(thoroughCaseTwo[0], thoroughCaseTwo[1])
    );
  });
});
