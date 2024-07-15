import { computed, ref } from 'vue';


export const useCounter = (value: number = 5) => {
  const counter = ref(value);
  const squareCounter = computed(() => counter.value * counter.value);
  return {
    counter,

    // read-only
    squareCounter,
  };
};
