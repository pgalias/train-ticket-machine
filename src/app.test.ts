import { shallowMount } from '@vue/test-utils';
import App from './app.vue';

describe('App', () => {
  test('should match snapshot', () => {
    // @ts-ignore
    const wrapper = shallowMount(App);

    expect(wrapper.html()).toMatchSnapshot();
  });
});
