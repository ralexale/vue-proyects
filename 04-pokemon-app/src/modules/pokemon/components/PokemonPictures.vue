<template>
  <section>
    <img v-if="!showPicture" :src="pokemonPicture" alt="pokemon" class="fade-in brightness-0" />
    <img v-else :src="pokemonPicture" alt="pokemon" class="fade-in" />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  showPicture: boolean;
  pokemonId: string;
}

const props = withDefaults(defineProps<Props>(), {
  showPicture: false,
});

const pokemonPicture = computed(() => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.pokemonId}.svg`;
});
</script>

<style scoped>
img {
  width: 200px;
  height: 200px;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
}
</style>
