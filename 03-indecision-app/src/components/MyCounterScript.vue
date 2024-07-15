<template>
  <section>
    <h3>Counter: {{ counter }}</h3>
    <h3>Square: {{ squareCounter }}</h3>
    <!-- <span>{{ text }}</span> -->

    <div class="buttons">
      <button @click="counter++">+1</button>
      <button @click="counter--">-1</button>
    </div>
  </section>
</template>

<script lang="ts">
import { useCounter } from '@/composables/userCounter';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    value: { type: Number, required: true },
  },
  setup(props) {
    const { counter, squareCounter } = useCounter(props.value);
    return {
      counter,
      squareCounter,
    };
  },
});
</script>

<style scoped>
h3 {
  font-size: 26px;
}
.buttons {
  display: flex;
  gap: 10px;

  button {
    background: green;
    color: white;
    font-size: 20px;
    padding: 5px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
}
</style>
