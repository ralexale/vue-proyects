<template>
  <section class="mt-4 mb-10">
    <h3 class="text-2xl">Counter: {{ counter }}</h3>
    <h3 data-testid="square-label" class="text-2xl">Square: {{ squareCounter }}</h3>
    <!-- <span>{{ text }}</span> -->

    <div class="buttons">
      <button @click="counter++" class="text-white rounded-lg bg-green-500 px-4 text-xl">+1</button>
      <button @click="counter--" class="text-white rounded-lg bg-red-500 px-4 text-xl">-1</button>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useCounter } from '@/composables/userCounter';

interface Props {
  value: number;
  // text?: string;
}

const props = defineProps<Props>();

const { counter, squareCounter } = useCounter(props.value);
</script>
