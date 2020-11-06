import InMemoryStationRepository from './in-memory-station-repository';
import Cache from '../../../infrastructure/cache/cache';
import { cacheMock } from '../../../infrastructure/testUtils';
import Station from '../../../domain/model/station';

describe('InMemoryStationRepository', () => {
  let cache: Cache;
  let repository: InMemoryStationRepository;

  beforeEach(() => {
    cache = cacheMock;
    repository = new InMemoryStationRepository(cache);
  });

  test('should return stations list when there are saved stations in cache', async () => {
    const list: Station[] = [
      {
        code: 'PZN',
        name: 'Poznan',
      },
      {
        code: 'WAW',
        name: 'Warsaw',
      },
    ];

    (cache.get as jest.Mock).mockReturnValue(list);

    expect(await repository.fetch()).toEqual(list);
  });

  test('should return empty list when there are not saved stations in cache', async () => {
    (cache.get as jest.Mock).mockReturnValue(undefined);
    expect(await repository.fetch()).toEqual([]);
  });

  test('should return empty list when saved stations list in cache is empty', async () => {
    (cache.get as jest.Mock).mockReturnValue([]);
    expect(await repository.fetch()).toEqual([]);
  });
});
