<template>
  <div class="container flex flex-wrap justify-center">
    <Button
      v-for="(symbol, index) in symbols"
      :key="index"
      :value="symbol.value"
      :on-click="onClick"
      :disabled="symbol.disabled"
    />
  </div>
</template>

<script lang="ts">
import { isNil } from 'lodash-es';
import Button from '../button/button.vue';
import { default as IButton } from '../button/button';

export default {
  name: 'Keyboard',
  components: { Button },
  props: {
    onClick: {
      type: Function,
      required: true,
    },
    symbols: {
      type: Object,
      required: true,
      validator: function (symbols: IButton[]) {
        return symbols.length > 0 && symbols.every(({ value }) => !isNil(value));
      },
    },
  },
};
</script>

<style scoped></style>
