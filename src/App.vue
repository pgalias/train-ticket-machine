<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <Keyboard
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
  <div class="w-16 bg-gray-500">Test</div>
</template>

<script>
import Keyboard from './app/components/keyboard/Keyboard.vue';

export default {
  name: 'App',
  components: {
    Keyboard,
  },
  methods: {
    foo(v) {
      console.log(v);
    },
  },
};
</script>
