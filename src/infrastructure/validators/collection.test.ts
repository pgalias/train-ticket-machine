import { values, isString, isNumber } from 'lodash-es';
import collectionValidator from './collection';

describe('isCollectionValid', () => {
  test.each`
    collection                          | validator                                       | isValid
    ${[]}                               | ${() => true}                                   | ${false}
    ${undefined}                        | ${() => true}                                   | ${false}
    ${[0, 1, 2]}                        | ${(v: number) => v <= 2}                        | ${true}
    ${[0, 1, 2]}                        | ${(v: number) => v > 2}                         | ${false}
    ${[{ foo: 'bar' }, { foo: 'baz' }]} | ${(obj: object) => values(obj).every(isString)} | ${true}
    ${[{ foo: 'bar' }, { foo: 'baz' }]} | ${(obj: object) => values(obj).every(isNumber)} | ${false}
  `('should return $isValid for $collection', ({ collection, validator, isValid }) => {
    expect(collectionValidator(collection, validator)).toBe(isValid);
  });
});
