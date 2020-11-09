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
        @button-click="$emit('keyboard-click', modelValue)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { isNil } from 'lodash-es';
import Button from '../button/button.vue';
import { default as IButton } from '../button/button';

export default {
  name: 'Keyboard',
  components: { Button },
  emits: ['keyboard-click'],
  props: {
    buttonsSets: {
      type: Object,
      required: true,
      validator: function (buttonSets: Array<IButton[]>) {
        return buttonSets.length > 0 && buttonSets.flat().every(({ modelValue }) => !isNil(modelValue));
      },
    },
  },
};
</script>
