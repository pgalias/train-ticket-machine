import { shallowMount } from '@vue/test-utils';
import Button from './Button.vue';

describe('Button', () => {
  test('should render button', () => {
    // @ts-ignore
    const wrapper = shallowMount(Button, {
      propsData: {
        value: 'foo',
        onClick: jest.fn(),
      },
    });

    const button = wrapper.find('button');

    expect(button.text()).toBe('foo');
  });

  test('should call passed onClick callback when button was clicked', async () => {
    const onClick = jest.fn();
    // @ts-ignore
    const wrapper = shallowMount(Button, {
      propsData: {
        onClick,
        value: 'foo',
      },
    });

    const button = wrapper.find('button');
    await button.trigger('click');

    expect(onClick).toHaveBeenCalledWith('foo');
  });

  describe('disabled prop', () => {
    test('should render not disabled button when disabled prop is false', () => {
      // @ts-ignore
      const wrapper = shallowMount(Button, {
        propsData: {
          value: 'foo',
          onClick: jest.fn(),
          disabled: false,
        },
      });

      const button = wrapper.find('button');

      expect(button.attributes('disabled')).toBeUndefined();
    });

    test('should render not disabled button when disabled prop is not passed', () => {
      // @ts-ignore
      const wrapper = shallowMount(Button, {
        propsData: {
          value: 'foo',
          onClick: jest.fn(),
        },
      });

      const button = wrapper.find('button');

      expect(button.attributes('disabled')).toBeUndefined();
    });

    test('should render disabled button when disabled prop is true', () => {
      // @ts-ignore
      const wrapper = shallowMount(Button, {
        propsData: {
          value: 'foo',
          onClick: jest.fn(),
          disabled: true,
        },
      });

      const button = wrapper.find('button');

      expect(button.attributes('disabled')).toBeDefined();
    });
  });
});
