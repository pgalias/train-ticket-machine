<template>
  <p class="no-results">
    {{ message }}
    <img v-if="showEmoji" class="emoji" src="../../../assets/confused.svg" alt="sad face emoji" />
  </p>
</template>

<script>
import './no-results.css';

export default {
  name: 'NoResults',
  props: {
    message: {
      type: String,
      default: 'No results found',
    },
    showEmoji: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
