<template>
  <section
    v-if="isLoading || winOption?.id === null"
    class="flex m-auto h-screen w-screen flex-col gap-4 items-center justify-center"
  >
    <h1 class="text-3xl">Espere un poco</h1>
    <h3 class="animate-pulse">Cargando Pókemons</h3>
  </section>

  <section v-else class="flex flex-col gap-8 h-screen w-screen items-center justify-center">
    <h1 class="text-3xl font-bold">¿Quién es este Pokemon?</h1>

    <!-- pokemon picture -->
    <PokemonPictures :pokemon-id="winOption.id" :show-picture="gameStatus !== GameStatus.Playing" />

    <!-- pokemon options  -->
    <PokemonOptions
      :correct-option="winOption.id"
      :options="pokemonOptions"
      :block-selection="gameStatus !== GameStatus.Playing"
      @selectedOption="checkAnswer"
    />

    <!-- game status -->
    <section class="flex gap-10 items-center justify-center">
      <span
        class="bg-green-500 pointer-events-none shadow font-semibold text-white text-sm py-2 px-4 rounded-md"
        >Partidas ganadas: {{ wins }}</span
      >
      <button
        @click="nextRound(4)"
        :class="[
          'bg-blue-500 hover:bg-blue-700 text-white font-bold text-2xl  px-4 py-2 rounded transition-colors',
          {
            'pointer-events-none opacity-50 cursor-none': gameStatus === GameStatus.Playing,
          },
        ]"
      >
        Continuar
      </button>
      <span
        class="bg-red-500 text-white shadow pointer-events-none text-sm font-semibold py-2 px-4 rounded-md"
        >Partidas perdidas: {{ loses }}</span
      >
    </section>
  </section>
</template>

<script setup lang="ts">
import PokemonOptions from '../components/PokemonOptions.vue';
import PokemonPictures from '../components/PokemonPictures.vue';
import { usePokemonGame } from '../composables/usePokemonGame';
import { GameStatus } from '../interfaces';

const { isLoading, nextRound, winOption, gameStatus, checkAnswer, pokemonOptions, wins, loses } =
  usePokemonGame();
</script>
