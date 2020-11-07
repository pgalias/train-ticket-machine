import { LETTERS_1_ROW, LETTERS_2_ROW, LETTERS_3_ROW, SPECIAL_4_ROW } from '../symbols';
import Backspace from '../../../../assets/backspace.svg';

const createLetterButton = (modelValue: string) => ({ modelValue });
const createSpecialButton = (modelValue: string) => ({
  modelValue,
  viewValue:
    (modelValue === '[space]' && ' ') ||
    (modelValue === '[backspace]' && `<img src="${Backspace}" alt="backspace icon" style="height:100%;width:100%;"/>`),
  size: (modelValue === '[space]' && 'lg') || (modelValue === '[backspace]' && 'md'),
});

export default () => [
  LETTERS_1_ROW.map(createLetterButton),
  LETTERS_2_ROW.map(createLetterButton),
  LETTERS_3_ROW.map(createLetterButton),
  SPECIAL_4_ROW.map(createSpecialButton),
];
