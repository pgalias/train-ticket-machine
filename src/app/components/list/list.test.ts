import { shallowMount, mount } from '@vue/test-utils';
import List from './list.vue';
import Station from '../../../domain/model/station';

describe('List', () => {
  const stations: Station[] = [
    {
      code: 'DFD',
      name: 'Dartford',
    },
    {
      code: 'FOK',
      name: 'Four Oaks',
    },
    {
      code: 'PAD',
      name: 'London Paddington',
    },
  ];

  describe('rendering', () => {
    test('should render list from passed station list', () => {
      // @ts-ignore
      const wrapper = shallowMount(List, {
        propsData: {
          stations,
          onStationSelect: jest.fn(),
        },
      });

      const renderedStations = wrapper.findAll('.station');

      expect(renderedStations).toHaveLength(3);
      expect(renderedStations[0].text()).toBe('Dartford');
      expect(renderedStations[1].text()).toBe('Four Oaks');
      expect(renderedStations[2].text()).toBe('London Paddington');
    });

    test('should not render when stations list was not passed', () => {
      // @ts-ignore
      const wrapper = shallowMount(List, {
        propsData: {
          onStationSelect: jest.fn(),
        },
      });

      const renderedStations = wrapper.findAll('.station');
      expect(renderedStations).toHaveLength(0);
    });

    test('should not render when passed stations are incorrect', () => {
      // @ts-ignore
      const wrapper = shallowMount(List, {
        propsData: {
          onStationSelect: jest.fn(),
          stations: [{ foo: 'bar' }],
        },
      });

      const renderedStations = wrapper.findAll('.station');
      expect(renderedStations).toHaveLength(0);
    });
  });

  test('should fire callback on station click', async () => {
    const onStationSelect = jest.fn();

    // @ts-ignore
    const wrapper = shallowMount(List, {
      propsData: {
        stations,
        onStationSelect,
      },
    });

    const renderedStations = wrapper.findAll('.station');

    await renderedStations[1].trigger('click');

    expect(onStationSelect).toHaveBeenCalledWith('FOK');
  });

  test('should select right station when selectedStation prop is present', () => {
    // @ts-ignore
    const wrapper = shallowMount(List, {
      propsData: {
        stations,
        selectedStation: 'PAD',
        onStationSelect: jest.fn(),
      },
    });

    const renderedStations = wrapper.findAll('.station');

    expect(renderedStations[0].classes()).not.toContain('selected');
    expect(renderedStations[1].classes()).not.toContain('selected');
    expect(renderedStations[2].classes()).toContain('selected');
  });

  test.each`
    collection                                   | isValid
    ${[]}                                        | ${false}
    ${['foo']}                                   | ${false}
    ${[{ code: 'PZN' }]}                         | ${false}
    ${[{ name: 'Posen' }]}                       | ${false}
    ${[...stations, { code: 'PZN', name: 543 }]} | ${false}
    ${stations}                                  | ${true}
  `('should stations prop ($collection) validator should work and return $isValid', ({ collection, isValid }) => {
    // @ts-ignore
    const wrapper = mount(List, {
      propsData: {
        onStationSelect: jest.fn(),
        stations: [{ foo: 'bar' }],
      },
    });

    const { validate } = wrapper.vm.$options.props.stations;

    expect(validate(collection)).toBe(isValid);
  });
});
