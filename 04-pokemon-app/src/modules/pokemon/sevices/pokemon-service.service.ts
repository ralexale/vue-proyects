import { pokemonApi } from '../api/pokemon-api';
import type { Pokemon, PokemonListResponse } from '../interfaces';

export class PokemonService {
  private limit;
  constructor(limit: number = 151) {
    this.limit = limit;
  }

  async getPokemons() {
    try {
      const { data } = await pokemonApi.get<PokemonListResponse>(`/?limit=${this.limit}`);

      const pokemons: Pokemon[] = data.results.map((pokemon) => {
        return {
          name: pokemon.name,
          url: pokemon.url,
          id: pokemon.url.split('/').at(-2)!,
        };
      });

      return pokemons.sort(() => Math.random() - 0.5);
    } catch (error) {
      throw new Error('could not get pokemons');
    }
  }
}
