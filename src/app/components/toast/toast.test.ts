import { mount } from '@vue/test-utils';
import Toast from './toast.vue';

describe('Toast', () => {
  test.each`
    type         | message
    ${'warning'} | ${'warning occurred'}
    ${'danger'}  | ${'error occurred'}
    ${'success'} | ${'hurray!'}
  `('should be able to render $type toast', ({ type, message }) => {
    const alert = document.createElement('div');
    alert.id = 'alert';
    document.body.appendChild(alert);
    // @ts-ignore
    const wrapper = mount(Toast, {
      propsData: { message, type },
    });
    const toast = document.querySelector('.toast');

    expect(toast?.classList.contains(type)).toBeTruthy();
    expect(toast?.textContent).toContain(message);

    wrapper.unmount();
  });

  test('should not render toast when incorrect type passed', () => {
    // @ts-ignore
    const wrapper = mount(Toast, {
      propsData: { message: 'Foo', type: 'Bar' },
    });

    expect(wrapper.findAll('.toast')).toHaveLength(0);
  });

  test('should hide toast after passed delay in ms', () => {
    jest.useFakeTimers();
    // @ts-ignore
    const wrapper = mount(Toast, {
      propsData: { message: 'Foo', type: 'success', delay: 1000 },
    });

    expect((wrapper.vm.$data as { visible: boolean }).visible).toBeTruthy();
    jest.advanceTimersByTime(1000);
    expect((wrapper.vm.$data as { visible: boolean }).visible).toBeFalsy();

    jest.clearAllTimers();
  });

  test('should hide toast on close button click', async () => {
    const alert = document.createElement('div');
    alert.id = 'alert';
    document.body.appendChild(alert);
    // @ts-ignore
    const wrapper = mount(Toast, {
      propsData: { message: 'Foo', type: 'success' },
    });

    const close = document.querySelector('.toast-close');
    await close?.dispatchEvent(new Event('click'));

    expect((wrapper.vm.$data as { visible: boolean }).visible).toBeFalsy();
  });

  test.each(['success', 'warning', 'danger'])(
    'should not show emoji for %s toast when showEmoji prop is falsy',
    (type) => {
      const alert = document.createElement('div');
      alert.id = 'alert';
      document.body.appendChild(alert);
      // @ts-ignore
      mount(Toast, {
        propsData: { type, message: 'Foo', showEmoji: false },
      });

      expect(document.querySelector('.emoji')).toBeNull();
    },
  );
});
