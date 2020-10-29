import StationRepository from '../../domain/repository/station-repository';
import Station from '../../domain/model/station';
import Cache from '../../infrastructure/cache/cache';
import { STATIONS_CACHE_KEY } from '../../infrastructure/constants';

const URL = 'https://raw.githubusercontent.com/abax-as/coding-challenge/master/station_codes.json';

export default class ApiStationRepository implements StationRepository {
  constructor(private cache: Cache) {}

  fetch(): Promise<Station[]> {
    return fetch(URL)
      .then((res) => res.json())
      .then((res) => {
        this.cache.set(STATIONS_CACHE_KEY, res);

        return res;
      });
  }
}
