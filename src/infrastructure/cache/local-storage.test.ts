import LocalStorage from './local-storage';

describe('LocalStorage', () => {
  let locStorage: LocalStorage;
  beforeEach(() => {
    locStorage = new LocalStorage();
  });

  afterEach(() => {
    localStorage.clear();
  });

  test.each(['foo', 2, false, [1, 4, 8], { a: 'b' }])(
    'should be able to retrieve value (%s) by key from storage',
    (value) => {
      localStorage.setItem('key', JSON.stringify(value));
      expect(locStorage.get('key')).toEqual(value);
    },
  );

  test('should be able to save value to storage', () => {
    expect(locStorage.get('key')).toBeNull();
    localStorage.setItem('key', JSON.stringify('value'));
    expect(locStorage.get('key')).not.toBeNull();
  });

  test('should be able to clear storage', () => {
    localStorage.setItem('key', JSON.stringify('value'));
    expect(locStorage.get('key')).not.toBeNull();
    locStorage.clear();
    expect(locStorage.get('key')).toBeNull();
  });
});
