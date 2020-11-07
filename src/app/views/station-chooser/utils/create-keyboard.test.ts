import createKeyboard from './create-keyboard';

describe('createKeyboard', () => {
  test('should return array of keyboard rows (as arrays)', () => {
    const keyboard = createKeyboard();

    expect(keyboard).toMatchSnapshot();
  });
});
