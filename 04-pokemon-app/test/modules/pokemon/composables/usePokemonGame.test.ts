import { flushPromises } from '@vue/test-utils';
import MockAdapter from 'axios-mock-adapter';
import confetti from 'canvas-confetti';

import { GameStatus } from '@/modules/pokemon/interfaces';
import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame';
import { withSetup } from '../../../utils/with-setup';
import { pokemonApi } from '@/modules/pokemon/api/pokemon-api';
import { fakePokemons } from '../../../data/fake-pokemons';

const mockPokemonApi = new MockAdapter(pokemonApi);

mockPokemonApi.onGet('/?limit=151').reply(200, {
  results: fakePokemons,
});

vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

describe('usePokemonGame', () => {
  test('should initialize with the correct default values', async () => {
    const [results, app] = withSetup(usePokemonGame);

    expect(results.gameStatus.value).toBe(GameStatus.Playing);
    expect(results.isLoading.value).toBe(true);
    expect(results.wins.value).toBe(0);
    expect(results.loses.value).toBe(0);
    expect(results.pokemonOptions.value).toEqual([]);
    expect(results.winOption.value).toBe(undefined);

    await flushPromises();
    expect(results.isLoading.value).toBe(false);
    expect(results.pokemonOptions.value.length).toBe(4);
    expect(results.winOption.value).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      url: expect.any(String),
    });
  });

  test('should correctly handle nextRound', async () => {
    const [results, app] = withSetup(usePokemonGame);

    results.gameStatus.value = GameStatus.Won;

    await flushPromises();

    // Estimulo
    results.nextRound(5);

    expect(results.gameStatus.value).toBe(GameStatus.Playing);
    expect(results.pokemonOptions.value).toHaveLength(5);
  });

  test('should correctly handle nextRound and return diferent options', async () => {
    const [results, app] = withSetup(usePokemonGame);
    await flushPromises();

    const firstOPtions = [...results.pokemonOptions.value].map((pokemon) => pokemon.name);

    // Estimulo
    results.nextRound();
    const pokemonOptions = [...results.pokemonOptions.value];

    // first form to do
    pokemonOptions.forEach((pokemon) => {
      expect(firstOPtions).not.toContain(pokemon.name);
    });

    // second form to do
    results.nextRound();
    expect(results.pokemonOptions.value).not.toEqual(pokemonOptions);
  });

  test('should correctly handle incorrect checkAnswer', async () => {
    const [results, app] = withSetup(usePokemonGame);
    await flushPromises();

    const { winOption, gameStatus } = results;
    // Estimulo
    results.checkAnswer(winOption.value.id);
    expect(gameStatus.value).toBe(GameStatus.Won);

    results.checkAnswer('10000');
    expect(gameStatus.value).toBe(GameStatus.Lost);
  });

  test('should hanlde correctly confettin if checkAnswer is won', async () => {
    const [results, app] = withSetup(usePokemonGame);

    await flushPromises();

    // Estimulo
    results.checkAnswer(results.winOption.value);
    expect(confetti).toHaveBeenCalled();
    expect(confetti).toHaveBeenCalledWith({
      particleCount: 300,
      spread: 150,
      origin: { y: 0.6 },
    });
  });
});
