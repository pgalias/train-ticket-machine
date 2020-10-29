import StationRepository from '../../domain/repository/station-repository';
import Station from '../../domain/model/station';

export default class AggregateStationRepository implements StationRepository {
  constructor(private repositories: StationRepository[]) {}

  async fetch(): Promise<Station[]> {
    for (const repository of this.repositories) {
      const stations = await repository.fetch();
      if (stations && stations.length > 0) {
        return stations;
      }
    }

    return Promise.reject('Cannot resolve stations');
  }
}
