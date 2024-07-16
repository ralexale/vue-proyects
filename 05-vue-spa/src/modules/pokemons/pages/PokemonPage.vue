<template>
  <section class="flex flex-col items-center justify-center gap-8">
    <h1 class="text-3xl font-bold text-center">
      Pókemon <small class="text-blue-500 font-bold">#{{ id }} </small>
    </h1>

    <img :src="pokemonPicture" alt="pókemon" class="size-[200px]" />

    <p class="text-center"></p>

    <RouterLink
      class="text-blue-500 hover:text-blue-700 font-bold bg-white px-4 py-2 rounded-md shadow hover:bg-blue-50 hover:shadow-lg transition-all"
      :to="{
        name: 'pokemon',
        params: { id: id + 1 },
      }"
      >Siguiente pókemon</RouterLink
    >
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

interface Props {
  id: string;
}

const props = defineProps<Props>();

const pokemonPicture = computed(
  () =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.id}.svg`,
);
</script>
