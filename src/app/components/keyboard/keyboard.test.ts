import { shallowMount } from '@vue/test-utils';
import Keyboard from './keyboard.vue';

describe('Keyboard', () => {
  const buttonsSets = [
    [{ modelValue: 'A', disabled: false }, { modelValue: 'B' }],
    [{ modelValue: 'C', disabled: true }],
  ];

  test('should render keyboard with passed buttons', () => {
    // @ts-ignore
    const wrapper = shallowMount(Keyboard, {
      propsData: {
        buttonsSets,
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
        buttonsSets: [],
        onClick: jest.fn(),
      },
    });

    const buttons = wrapper.findAll('button-stub');

    expect(buttons).toHaveLength(0);
  });
});
