<template>
  <div v-for="(buttonSet, index) of buttonsSets" :key="index">
    <div class="flex justify-center">
      <Button
        v-for="({ modelValue, viewValue, disabled, size }, index) in buttonSet"
        :key="index"
        :model-value="modelValue"
        :view-value="viewValue"
        :on-click="onClick"
        :disabled="disabled"
        :size="size"
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
  props: {
    onClick: {
      type: Function,
      required: true,
    },
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

<style scoped></style>
