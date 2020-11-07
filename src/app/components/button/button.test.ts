import { shallowMount } from '@vue/test-utils';
import Button from './button.vue';

describe('Button', () => {
  test('should render button', () => {
    // @ts-ignore
    const wrapper = shallowMount(Button, {
      propsData: {
        modelValue: 'foo',
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
        modelValue: 'foo',
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
          modelValue: 'foo',
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
          modelValue: 'foo',
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
          modelValue: 'foo',
          onClick: jest.fn(),
          disabled: true,
        },
      });

      const button = wrapper.find('button');

      expect(button.attributes('disabled')).toBeDefined();
    });

    describe('button inner text', () => {
      test('should put viewValue as text when is passed', () => {
        // @ts-ignore
        const wrapper = shallowMount(Button, {
          propsData: {
            modelValue: 'foo',
            viewValue: 'bar',
            onClick: jest.fn(),
          },
        });

        const button = wrapper.find('button');

        expect(button.text()).toBe('bar');
      });

      test('should put modelValue as text when viewValue is not passed', () => {
        // @ts-ignore
        const wrapper = shallowMount(Button, {
          propsData: {
            modelValue: 'foo',
            onClick: jest.fn(),
          },
        });

        const button = wrapper.find('button');

        expect(button.text()).toBe('foo');
      });
    });

    describe('button size', () => {
      test.each(['md', 'lg'])('should add btn-%s class when passed with size prop', (size) => {
        // @ts-ignore
        const wrapper = shallowMount(Button, {
          propsData: {
            size,
            modelValue: 'foo',
            onClick: jest.fn(),
          },
        });

        const button = wrapper.find('button');

        expect(button.classes().includes(`btn-${size}`)).toBeTruthy();
      });

      test('should not add additional class when size prop is not passed', () => {
        // @ts-ignore
        const wrapper = shallowMount(Button, {
          propsData: {
            modelValue: 'foo',
            onClick: jest.fn(),
          },
        });

        const button = wrapper.find('button');

        expect(button.classes()).toHaveLength(1);
        expect(button.classes()[0]).toEqual('btn');
      });
    });
  });
});
