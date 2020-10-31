import { AggregateStationRepository, ApiStationRepository, InMemoryStationRepository } from '.';
import Cache from '../../infrastructure/cache/cache';
import { cacheMock } from '../../infrastructure/testUtils';
import Station from '../../domain/model/station';

describe('AggregateStationRepository', () => {
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
  let get1: jest.Mock;
  let cache1: Cache;
  let get2: jest.Mock;
  let cache2: Cache;
  let fetchMock: jest.Mock;
  let apiRepository: ApiStationRepository;
  let inMemoryRepository1: InMemoryStationRepository;
  let inMemoryRepository2: InMemoryStationRepository;

  beforeEach(() => {
    fetchMock = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(list),
      }),
    );
    (window.fetch as jest.Mock) = fetchMock;

    get1 = jest.fn(() => []);
    get2 = jest.fn(() => list);
    cache1 = { ...cacheMock, get: get1 };
    cache2 = { ...cacheMock, get: get2 };

    inMemoryRepository1 = new InMemoryStationRepository(cache1);
    inMemoryRepository2 = new InMemoryStationRepository(cache2);
    apiRepository = new ApiStationRepository(cache1);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should return first occurrence of stations list from repositories array', async () => {
    const aggregatedRepository = new AggregateStationRepository([
      inMemoryRepository1,
      inMemoryRepository2,
      apiRepository,
    ]);
    expect(await aggregatedRepository.fetch()).toEqual(list);
  });

  test('should iterate through repositories array until find stations list', async () => {
    const aggregatedRepository = new AggregateStationRepository([
      inMemoryRepository1,
      inMemoryRepository2,
      apiRepository,
    ]);
    await aggregatedRepository.fetch();

    expect(get1).toHaveBeenCalled();
    expect(get2).toHaveBeenCalled();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  test('should iterate through repositories array until find stations list', async () => {
    const aggregatedRepository = new AggregateStationRepository([
      apiRepository,
      inMemoryRepository1,
      inMemoryRepository2,
    ]);
    await aggregatedRepository.fetch();

    expect(get1).not.toHaveBeenCalled();
    expect(get2).not.toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalled();
  });

  test('should reject promise when stations list cannot be found', async () => {
    const aggregatedRepository = new AggregateStationRepository([inMemoryRepository1]);
    await expect(aggregatedRepository.fetch()).rejects.toBeTruthy();
  });
});
