<template>
  <button @click="click" :disabled="disabled" class="btn">
    {{ value }}
  </button>
</template>

<script>
import './button.css';

export default {
  name: 'Button',
  props: {
    value: { type: String, required: true },
    onClick: { type: Function, required: true },
    disabled: { type: Boolean, default: false },
  },
  methods: {
    click() {
      this.onClick(this.value);
    },
  },
};
</script>
