<template>
  <button @click="click" class="btn" :class="{ [`btn-${size}`]: ['md', 'lg'].includes(size), disabled }">
    <span v-html="viewValue ?? modelValue"></span>
  </button>
</template>

<script>
import { isString } from 'lodash-es';
import './button.css';

export default {
  name: 'Button',
  emits: {
    'button-click'(payload) {
      return isString(payload);
    },
  },
  props: {
    modelValue: { type: String, required: true },
    disabled: { type: Boolean, default: false },
    viewValue: { type: String },
    size: { type: String },
  },
  methods: {
    click() {
      this.$emit('button-click', this.modelValue);
    },
  },
};
</script>
