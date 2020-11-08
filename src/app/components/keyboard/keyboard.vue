<template>
  <div v-for="(buttonSet, index) of buttonsSets" :key="index">
    <div class="flex justify-center">
      <Button
        v-for="{ modelValue, viewValue, disabled, size } in buttonSet"
        :key="modelValue"
        :model-value="modelValue"
        :view-value="viewValue"
        :disabled="disabled"
        :size="size"
        @button-click="onButtonClick"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { isNil, isString } from 'lodash-es';
import Button from '../button/button.vue';
import { default as IButton } from '../button/button';

export default {
  name: 'Keyboard',
  components: { Button },
  emits: {
    'keyboard-click'(payload) {
      return isString(payload);
    },
  },
  props: {
    buttonsSets: {
      type: Object,
      required: true,
      validator: function (buttonSets: Array<IButton[]>) {
        return buttonSets.length > 0 && buttonSets.flat().every(({ modelValue }) => !isNil(modelValue));
      },
    },
  },
  methods: {
    onButtonClick(value: string) {
      this.$emit('keyboard-click', value);
    },
  },
};
</script>
