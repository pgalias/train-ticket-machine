import StationRepository from '../../domain/repository/station-repository';
import Station from '../../domain/model/station';
import Cache from '../../infrastructure/cache/cache';
import { STATIONS_CACHE_KEY } from '../../infrastructure/constants';

export default class InMemoryStationRepository implements StationRepository {
  constructor(private cache: Cache) {}

  fetch(): Promise<Station[]> {
    const stations = this.cache.get(STATIONS_CACHE_KEY);

    if (!stations || stations.length === 0) {
      return Promise.resolve([]);
    }

    return Promise.resolve(stations);
  }
}
