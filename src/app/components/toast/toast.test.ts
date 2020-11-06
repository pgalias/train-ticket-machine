import { shallowMount } from '@vue/test-utils';
import Toast from './toast.vue';

describe('Toast', () => {
  test.each`
    type         | message
    ${'warning'} | ${'warning occurred'}
    ${'danger'}  | ${'error occurred'}
    ${'success'} | ${'hurray!'}
  `('should be able to render $type toast', ({ type, message }) => {
    // @ts-ignore
    const wrapper = shallowMount(Toast, {
      propsData: { message, type },
    });
    const toast = wrapper.find('.toast');

    expect(toast.classes().includes(type)).toBeTruthy();
    expect(toast.text()).toEqual(message);
  });

  test('should not render toast when incorrect type passed', () => {
    // @ts-ignore
    const wrapper = shallowMount(Toast, {
      propsData: {
        message: 'Foo',
        type: 'Bar',
      },
    });

    expect(wrapper.findAll('.toast')).toHaveLength(0);
  });

  test('should hide toast after passed delay in ms', () => {
    jest.useFakeTimers();
    // @ts-ignore
    const wrapper = shallowMount(Toast, {
      propsData: {
        message: 'Foo',
        type: 'success',
        delay: 1000,
      },
    });

    expect((wrapper.vm.$data as { visible: boolean }).visible).toBeTruthy();
    jest.advanceTimersByTime(1000);
    expect((wrapper.vm.$data as { visible: boolean }).visible).toBeFalsy();

    jest.clearAllTimers();
  });
});
