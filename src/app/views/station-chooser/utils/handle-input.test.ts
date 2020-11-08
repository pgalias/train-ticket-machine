import handleInput from './handle-input';

describe('handleInput', () => {
  test.each`
    value  | expected
    ${'a'} | ${'fooa'}
    ${'p'} | ${'foop'}
    ${'x'} | ${'foox'}
  `('should properly add $value', ({ value, expected }) => {
    expect(handleInput('foo', value)).toBe(expected);
  });

  test('should properly add space', () => {
    expect(handleInput('foo', '[space]')).toBe('foo ');
  });

  test('should handle backspace', () => {
    expect(handleInput('foo', '[backspace]')).toBe('fo');
  });
});
