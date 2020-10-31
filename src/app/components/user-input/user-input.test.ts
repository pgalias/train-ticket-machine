import { shallowMount } from '@vue/test-utils';
import UserInput from './user-input.vue';

describe('UserInput', () => {
  test('should set passed value to input', () => {
    // @ts-ignore
    const wrapper = shallowMount(UserInput, {
      propsData: {
        value: 'FOO',
      },
    });

    const input = wrapper.find('input');

    expect(input.element.value).toBe('FOO');
  });

  // TODO: Post MVP: Will be to remove
  test('should be disabled', () => {
    // @ts-ignore
    const wrapper = shallowMount(UserInput, {
      propsData: {
        value: 'FOO',
      },
    });

    const input = wrapper.find('input');

    expect(input.attributes('disabled')).toBeDefined();
  });

  // TODO: Post MVP: Implement test
  // test('should fire callback on each keystroke', () => {});
});
