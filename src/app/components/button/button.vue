<template>
  <button @click="click" :disabled="disabled" class="btn" :class="{ [`btn-${size}`]: ['md', 'lg'].includes(size) }">
    <span v-html="viewValue ?? modelValue"></span>
  </button>
</template>

<script>
import './button.css';

export default {
  name: 'Button',
  props: {
    modelValue: { type: String, required: true },
    onClick: { type: Function, required: true },
    disabled: { type: Boolean, default: false },
    viewValue: { type: String },
    size: { type: String },
  },
  methods: {
    click() {
      this.onClick(this.modelValue);
    },
  },
};
</script>
