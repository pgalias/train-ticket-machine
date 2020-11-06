import { shallowMount } from '@vue/test-utils';
import Loader from './loader.vue';

describe('Loader', () => {
  test('should render loading component', () => {
    // @ts-ignore
    const wrapper = shallowMount(Loader);

    expect(wrapper.exists()).toBeTruthy();
  });
});
