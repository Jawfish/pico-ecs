/**
 *
 * @param compareAgainst The array to check for items
 * @param toCompare The items to check in the array
 */
export function containsEvery(
  // tslint:disable-next-line:no-any
  compareAgainst: any[],
  // tslint:disable-next-line:no-any
  toCompare: any[]
): boolean {
  return toCompare.every(item => compareAgainst.includes(item));
}
