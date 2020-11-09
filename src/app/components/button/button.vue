<template>
  <button
    @click="$emit('button-click', this.modelValue)"
    class="btn"
    :class="{ [`btn-${size}`]: ['md', 'lg'].includes(size), disabled }"
  >
    <span v-html="viewValue ?? modelValue"></span>
  </button>
</template>

<script>
import './button.css';

export default {
  name: 'Button',
  emits: ['button-click'],
  props: {
    modelValue: { type: String, required: true },
    disabled: { type: Boolean, default: false },
    viewValue: { type: String },
    size: { type: String },
  },
};
</script>
