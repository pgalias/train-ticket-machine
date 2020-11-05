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
    <list :stations="stations" :selected-station="selectedStation" :on-station-select="baz" />
  </div>
  <div class="w-16 bg-gray-500">Test</div>
</template>

<script>
import Keyboard from './app/components/keyboard/keyboard.vue';
import UserInput from './app/components/user-input/user-input.vue';
import List from './app/components/list/list.vue';
import LocalStorage from './infrastructure/cache/local-storage';

export default {
  name: 'App',
  components: {
    Keyboard,
    UserInput,
    List,
  },
  provide() {
    return {
      cache: new LocalStorage(),
    };
  },
  data() {
    return {
      inputValue: '',
      selectedStation: null,
      stations: [
        {
          code: 'DFD',
          name: 'Dartford',
        },
        {
          code: 'FOK',
          name: 'Four Oaks',
        },
        {
          code: 'PAD',
          name: 'London Paddington',
        },
      ],
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
    baz(code) {
      console.log(code, 'code');
      this.selectedStation = code;
    },
  },
};
</script>
