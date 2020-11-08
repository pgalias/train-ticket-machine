import { shallowMount } from '@vue/test-utils';
import NoResults from './no-results.vue';

describe('NoResults', () => {
  test('should render component with default message when message prop was not passed', () => {
    // @ts-ignore
    const wrapper = shallowMount(NoResults);

    expect(wrapper.html()).toMatchSnapshot();
  });

  test('should render component with passed message', () => {
    // @ts-ignore
    const wrapper = shallowMount(NoResults, {
      propsData: {
        message: 'Not any foo found',
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test('should render component with message without emoji when showEmoji prop is false', () => {
    // @ts-ignore
    const wrapper = shallowMount(NoResults, {
      propsData: {
        message: 'Not any foo found',
        showEmoji: false,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
