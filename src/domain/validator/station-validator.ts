import { isArray, isObject, isString } from 'lodash-es';
import Station from '../model/station';

export default (station: Station): boolean => {
  if (!isObject(station) || isArray(station)) {
    return false;
  }

  const { name, code } = station;

  return isString(name) && isString(code);
};
