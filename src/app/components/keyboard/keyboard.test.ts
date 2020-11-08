import { shallowMount, mount } from '@vue/test-utils';
import Keyboard from './keyboard.vue';

describe('Keyboard', () => {
  const buttonsSets = [
    [{ modelValue: 'A', disabled: false }, { modelValue: 'B' }],
    [{ modelValue: 'C', disabled: true }],
  ];

  test('should render keyboard with passed buttons', () => {
    // @ts-ignore
    const wrapper = shallowMount(Keyboard, {
      propsData: { buttonsSets },
    });

    const buttons = wrapper.findAll('button-stub');

    expect(buttons).toHaveLength(3);
  });

  test('should not render when passed incorrect buttons', () => {
    // @ts-ignore
    const wrapper = shallowMount(Keyboard, {
      propsData: { buttonsSets: [] },
    });

    const buttons = wrapper.findAll('button-stub');

    expect(buttons).toHaveLength(0);
  });

  test('should emit event on button click', async () => {
    // @ts-ignore
    const wrapper = mount(Keyboard, {
      propsData: { buttonsSets },
    });

    const buttons = wrapper.findAll('.btn');

    await buttons[1].trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('keyboard-click')[0]).toEqual(['B']);
  });
});
