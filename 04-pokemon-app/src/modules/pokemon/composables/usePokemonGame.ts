import { computed, onMounted, ref } from 'vue';
import { GameStatus, type Pokemon } from '../interfaces';
import { PokemonService } from '../sevices';
import confetti from 'canvas-confetti';
const pokemonService = new PokemonService();

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.Playing);
  const pokemons = ref<Pokemon[]>([]);
  const pokemonOptions = ref<Pokemon[]>([]);
  const wins = ref<number>(0);
  const loses = ref<number>(0);

  const winOption = computed(() => {
    const randomIndex = Math.floor(Math.random() * pokemonOptions.value.length);
    return pokemonOptions.value[randomIndex];
  });

  const isLoading = computed(() => pokemons.value.length === 0);

  const nextRound = (howMany: number = 4) => {
    gameStatus.value = GameStatus.Playing;
    pokemonOptions.value = pokemons.value.slice(0, howMany);
    pokemons.value = pokemons.value.slice(howMany);
  };

  const checkAnswer = (selectedPokemonId: string) => {
    const hasWon = winOption.value.id === selectedPokemonId;

    if (hasWon) {
      gameStatus.value = GameStatus.Won;
      wins.value++;
      confetti({
        particleCount: 300,
        spread: 150,
        origin: { y: 0.6 },
      });
      return;
    }
    gameStatus.value = GameStatus.Lost;
    loses.value++;
  };

  onMounted(async () => {
    console.log('OnMounted');
    pokemons.value = await pokemonService.getPokemons();
    nextRound();

    console.log(pokemonOptions.value);
    console.log('finish mounted');
  });

  return {
    // attributes
    wins,
    loses,
    gameStatus,
    isLoading,
    pokemonOptions,
    winOption,

    // methods
    checkAnswer,
    nextRound,
  };
};
