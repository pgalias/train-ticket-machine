<template>
  <teleport to="#alert">
    <div v-if="validate && visible" class="toast" :class="{ [type]: true }">{{ message }}</div>
  </teleport>
</template>

<script>
import './toast.css';

const TOAST_DELAY_MS = 7000;

export default {
  name: 'Toast',
  data() {
    return {
      visible: true,
    };
  },
  created() {
    setTimeout(() => {
      this.visible = false;
    }, this.delay);
  },
  props: {
    type: {
      validator(value) {
        return ['success', 'warning', 'danger'].includes(value);
      },
    },
    message: {
      type: String,
      required: true,
    },
    delay: {
      type: Number,
      default: TOAST_DELAY_MS,
    },
  },
  computed: {
    validate() {
      return this.isCorrectType();
    },
  },
  methods: {
    isCorrectType() {
      return ['success', 'warning', 'danger'].includes(this.type);
    },
  },
};
</script>
