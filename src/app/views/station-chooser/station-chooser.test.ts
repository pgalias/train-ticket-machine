import { shallowMount, mount, DOMWrapper } from '@vue/test-utils';
import StationChooser from './station-chooser.vue';
import Station from '../../../domain/model/station';

describe('StationChooser', () => {
  const stations: Station[] = [
    { code: 'FOO', name: 'Foo' },
    { code: 'BAR', name: 'Bar' },
  ];

  let fetchMock: jest.Mock;

  beforeEach(() => {
    fetchMock = jest.fn();
  });

  const createWrapper = (mock: jest.Mock, mountMethod = shallowMount) =>
    mountMethod(StationChooser, {
      global: {
        provide: {
          repository: { fetch: mock },
        },
      },
    });

  test('should render received stations list', async () => {
    fetchMock.mockReturnValue(Promise.resolve(stations));
    const wrapper = createWrapper(fetchMock);
    await wrapper.vm.$nextTick();

    const list = wrapper.find('list-stub');
    const userInput = wrapper.find('user-input-stub');
    const keyboard = wrapper.find('keyboard-stub');

    expect(list).toBeDefined();
    expect(userInput).toBeDefined();
    expect(keyboard).toBeDefined();
  });

  test('should filter list when user is typing letters on keyboard', async () => {
    fetchMock.mockReturnValue(Promise.resolve(stations));
    const wrapper = createWrapper(fetchMock, mount);
    await wrapper.vm.$nextTick();

    const buttonF = wrapper.findAll('.btn').find((button: DOMWrapper<Element>) => button.text() === 'F');
    const input = wrapper.find('.user-input');

    expect(wrapper.vm.visibleStations).toEqual(stations);

    buttonF?.trigger('click');
    await wrapper.vm.$nextTick();

    expect((input.element as HTMLInputElement).value).toEqual('F');
    expect(wrapper.vm.visibleStations).toEqual([stations[0]]);
  });

  test('clicking on station name should select that station', async () => {
    fetchMock.mockReturnValue(Promise.resolve(stations));
    const wrapper = createWrapper(fetchMock, mount);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.selectedStation).toEqual('');

    wrapper
      .findAll('.station')
      .find((station: DOMWrapper<Element>) => station.text() === 'Foo')
      ?.trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.selectedStation).toEqual('FOO');
  });

  test('should show no results found when filtered list is empty', async () => {
    fetchMock.mockReturnValue(Promise.resolve([]));
    const wrapper = createWrapper(fetchMock);
    await wrapper.vm.$nextTick();

    const list = wrapper.findAll('list-stub');
    const noResult = wrapper.find('no-results-stub');
    const userInput = wrapper.find('user-input-stub');
    const keyboard = wrapper.find('keyboard-stub');

    expect(list).toHaveLength(0);
    expect(noResult).toBeDefined();
    expect(userInput).toBeDefined();
    expect(keyboard).toBeDefined();
  });

  test('should show loader during loading stations list', async () => {
    fetchMock.mockReturnValue(
      new Promise((resolve) => {
        setTimeout(() => resolve([{ code: 'FOO', name: 'Bar' }]), 2000);
      }),
    );
    const wrapper = createWrapper(fetchMock);
    await wrapper.vm.$nextTick();

    const loader = wrapper.find('loader-stub');

    expect(loader).toBeDefined();
  });

  test('should show error toast when error occurred during loading stations list', async () => {
    fetchMock.mockReturnValue(Promise.reject());
    const wrapper = createWrapper(fetchMock);
    await wrapper.vm.$nextTick();

    const toast = wrapper.find('toast-stub');

    expect(toast).toBeDefined();
  });
});
