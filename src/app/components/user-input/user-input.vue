<template>
  <input type="text" :placeholder="label" :value="value" disabled class="user-input" />
</template>

<script>
import './user-input.css';

export default {
  name: 'UserInput',
  props: {
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: 'Type station name',
    },
  },
};
</script>

<style scoped></style>
