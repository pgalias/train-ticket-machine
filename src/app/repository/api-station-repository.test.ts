import ApiStationRepository from './api-station-repository';
import Cache from '../../infrastructure/cache/cache';
import { cacheMock } from '../../infrastructure/testUtils';
import { STATIONS_CACHE_KEY } from '../../infrastructure/constants';

describe('ApiStationRepository', () => {
  let cache: Cache;
  let repository: ApiStationRepository;

  beforeEach(() => {
    cache = cacheMock;
    repository = new ApiStationRepository(cache);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should fetch data from endpoint and save results into cache', async () => {
    const list = [
      {
        code: 'PZN',
        name: 'Poznan',
      },
      {
        code: 'WAW',
        name: 'Warsaw',
      },
    ];

    (window.fetch as jest.Mock) = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(list),
      }),
    );

    expect(await repository.fetch()).toEqual(list);
    expect(cache.set).toHaveBeenCalledWith(STATIONS_CACHE_KEY, list);
  });
});
