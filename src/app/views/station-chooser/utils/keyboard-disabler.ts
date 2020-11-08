import { uniq } from 'lodash-es';
import Button from '../../../components/button/button';
import Station from '../../../../domain/model/station';

export default (charAt: number, stations: Station[]) => (buttons: Button[]): Button[] => {
  const availableCharacters = uniq(stations.map(({ name }) => name.charAt(charAt).toUpperCase()));

  const isDisabled = (value: string) => {
    if (value === '[space]') {
      return !availableCharacters.includes(' ');
    }

    if (value === '[backspace]') {
      return false;
    }

    return !availableCharacters.includes(value.toUpperCase());
  };

  return buttons.map(({ modelValue, ...rest }) => ({
    ...rest,
    modelValue,
    disabled: isDisabled(modelValue),
  }));
};
