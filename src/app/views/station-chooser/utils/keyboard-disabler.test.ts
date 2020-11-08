import keyboardDisabler from './keyboard-disabler';
import Button from '../../../components/button/button';
import Station from '../../../../domain/model/station';

describe('keyboardDisabler', () => {
  let buttons: Button[];
  let stations: Station[];

  beforeEach(() => {
    buttons = [
      { modelValue: 'A' },
      { modelValue: 'B' },
      { modelValue: 'C' },
      { modelValue: 'F' },
      { modelValue: 'O' },
      { modelValue: 'R' },
      { modelValue: '[space]' },
    ];
    stations = [
      { code: 'aah', name: 'Aahen' },
      { code: 'abe', name: 'Aberystwyth' },
      { code: 'ber', name: 'Bergen' },
      { code: 'cor', name: 'Cordoba' },
      { code: 'cam', name: 'Camden Road' },
      { code: 'foo', name: 'Foo' },
      { code: 'bar', name: 'Bar' },
    ];
  });

  test.each`
    input | expected
    ${1}  | ${[{ modelValue: 'A', disabled: false }, { modelValue: 'B', disabled: false }, { modelValue: 'C', disabled: true }, { modelValue: 'F', disabled: true }, { modelValue: 'O', disabled: false }, { modelValue: 'R', disabled: true }, { modelValue: '[space]', disabled: true }]}
    ${2}  | ${[{ modelValue: 'A', disabled: true }, { modelValue: 'B', disabled: true }, { modelValue: 'C', disabled: true }, { modelValue: 'F', disabled: true }, { modelValue: 'O', disabled: false }, { modelValue: 'R', disabled: false }, { modelValue: '[space]', disabled: true }]}
    ${3}  | ${[{ modelValue: 'A', disabled: true }, { modelValue: 'B', disabled: true }, { modelValue: 'C', disabled: true }, { modelValue: 'F', disabled: true }, { modelValue: 'O', disabled: true }, { modelValue: 'R', disabled: false }, { modelValue: '[space]', disabled: true }]}
    ${5}  | ${[{ modelValue: 'A', disabled: true }, { modelValue: 'B', disabled: false }, { modelValue: 'C', disabled: true }, { modelValue: 'F', disabled: true }, { modelValue: 'O', disabled: true }, { modelValue: 'R', disabled: true }, { modelValue: '[space]', disabled: true }]}
    ${6}  | ${[{ modelValue: 'A', disabled: false }, { modelValue: 'B', disabled: true }, { modelValue: 'C', disabled: true }, { modelValue: 'F', disabled: true }, { modelValue: 'O', disabled: true }, { modelValue: 'R', disabled: true }, { modelValue: '[space]', disabled: false }]}
  `('should set disable property for buttons which cannot be used', ({ input, expected }) => {
    expect(keyboardDisabler(input, stations)(buttons)).toEqual(expected);
  });

  test('should not disable backspace button', () => {
    buttons = [...buttons, { modelValue: '[backspace]' }];
    const results = keyboardDisabler(3, stations)(buttons);
    const backspace = results.find(({ modelValue }) => modelValue === '[backspace]');

    expect(backspace?.disabled).toBeFalsy();
  });
});
