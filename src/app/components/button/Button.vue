<template>
  <button
    @click="click"
    @mouseover="hovered = true"
    @mouseleave="hovered = false"
    :disabled="disabled"
    class="h-10 w-10 m-1 text-xs rounded bg-opacity-50 text-white font-semibold focus:outline-white"
    :class="{
      'shadow-sm': hovered,
      shadow: !hovered,
      'bg-gray-400 cursor-not-allowed': disabled,
      'bg-blue-500': !disabled,
    }"
  >
    {{ value }}
  </button>
</template>

<script>
export default {
  name: 'Button',
  data() {
    return {
      hovered: false,
    };
  },
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
