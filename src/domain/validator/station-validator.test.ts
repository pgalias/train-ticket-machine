import stationValidator from './station-validator';

describe('stationValidator', () => {
  test.each`
    object                                         | isValid
    ${{ code: 'foo', name: 'bar' }}                | ${true}
    ${{ code: 'foo', bar: 'baz', name: 'foobar' }} | ${true}
    ${{ code: 24, name: () => 'baz' }}             | ${false}
    ${{ code: {}, name: null }}                    | ${false}
    ${{ foo: 'bar' }}                              | ${false}
    ${{}}                                          | ${false}
    ${null}                                        | ${false}
    ${undefined}                                   | ${false}
    ${[]}                                          | ${false}
  `('should return $isValid for $object', ({ object, isValid }) => {
    expect(stationValidator(object)).toBe(isValid);
  });
});
