<template>
  <section>
    <ul class="space-y-4 flex flex-col items-center justify-center">
      <button
        data-test-id="option-button"
        @click="emit('selectedOption', option.id)"
        :class="{
          correct: blockSelection && option.id === correctOption,
          incorrect: blockSelection && option.id !== correctOption,
          disabled: blockSelection,
        }"
        v-for="option in options"
        :key="option.id"
      >
        {{ option.name }}
      </button>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { type Pokemon } from '../interfaces';

interface Props {
  correctOption: string;
  options: Pokemon[];
  blockSelection: boolean;
}

const emit = defineEmits<{
  selectedOption: [id: string];
}>();

const { options, correctOption, blockSelection } = defineProps<Props>();
</script>

<style scoped>
button {
  @apply text-xl bg-white capitalize shadow-md rounded-lg p-3 m-2 cursor-pointer w-60 text-center transition-all hover:scale-110 hover:bg-gray-100;
}

.correct {
  @apply !bg-blue-500 text-white;
}

.incorrect {
  @apply !bg-red-500;
}
.disabled {
  @apply pointer-events-none opacity-50;
}
</style>
