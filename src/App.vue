<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div class="container">
    <user-input :value="inputValue" :on-change="bar" />
    <keyboard
      :on-click="foo"
      :symbols="[
        { value: 'A', disabled: false },
        { value: 'B' },
        { value: 'C', disabled: true },
        { value: 'D', disabled: false },
        { value: 'E' },
        { value: 'F', disabled: true },
        { value: 'G', disabled: false },
        { value: 'H' },
        { value: 'I', disabled: true },
        { value: 'J', disabled: false },
        { value: 'K' },
        { value: 'L', disabled: true },
      ]"
    />
  </div>
  <div class="w-16 bg-gray-500">Test</div>
</template>

<script>
import Keyboard from './app/components/keyboard/keyboard.vue';
import UserInput from './app/components/user-input/user-input.vue';

export default {
  name: 'App',
  components: {
    Keyboard,
    UserInput,
  },
  data() {
    return {
      inputValue: '',
    };
  },
  methods: {
    foo(v) {
      console.log(v, 'foo::v');
      this.inputValue += v;
    },
    bar(v) {
      console.log(v, 'v');
    },
  },
};
</script>
