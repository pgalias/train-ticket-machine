import { shallowMount } from '@vue/test-utils';
import Keyboard from './Keyboard.vue';

describe('Keyboard', () => {
  const symbols = [{ value: 'A', disabled: false }, { value: 'B' }, { value: 'C', disabled: true }];

  test('should render keyboard with passed buttons', () => {
    // @ts-ignore
    const wrapper = shallowMount(Keyboard, {
      propsData: {
        symbols,
        onClick: jest.fn(),
      },
    });

    const buttons = wrapper.findAll('button-stub');

    expect(buttons).toHaveLength(3);
  });

  test('should not render when passed incorrect buttons', () => {
    // @ts-ignore
    const wrapper = shallowMount(Keyboard, {
      propsData: {
        symbols: [],
        onClick: jest.fn(),
      },
    });

    const buttons = wrapper.findAll('button-stub');

    expect(buttons).toHaveLength(0);
  });
});
