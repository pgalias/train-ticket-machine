<template>
  <teleport to="#alert">
    <div v-if="validate && visible" class="toast" :class="{ [type]: true }">
      <img v-if="showEmoji && type === 'success'" class="emoji" src="../../../assets/smile.svg" alt="success emoji" />
      <img v-if="showEmoji && type === 'warning'" class="emoji" src="../../../assets/neutral.svg" alt="warning emoji" />
      <img v-if="showEmoji && type === 'danger'" class="emoji" src="../../../assets/sad.svg" alt="danger emoji" />
      <p class="toast-message">{{ message }}</p>
      <button @click="close" class="toast-close" role="button">&times;</button>
    </div>
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
      this.close();
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
    showEmoji: {
      type: Boolean,
      default: true,
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
    close() {
      this.visible = false;
    },
  },
};
</script>
