import { pokemonApi } from '@/modules/pokemon/api/pokemon-api';

describe('Pokemon Api', () => {
  test('should be configured as expected', () => {
    const baseURL = 'https://pokeapi.co/api/v2/pokemon';

    expect(pokemonApi.defaults.baseURL).toBe(baseURL);
  });
});
