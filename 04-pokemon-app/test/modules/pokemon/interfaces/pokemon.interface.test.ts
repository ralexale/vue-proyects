import type { Pokemon } from '@/modules/pokemon/interfaces';

describe('Pokemon interface', () => {
  const pokemon: Pokemon = {
    id: '1',
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon/1',
  };
  test('should have a id property of string', () => {
    expect(pokemon.id).toString();
  });
  test('should have a name property of string', () => {
    expect(pokemon.name).toString();
  });
  test('should have a url property of string and contain  https', () => {
    expect(pokemon.url).toContain('https');
    expect(pokemon.url).toString();
  });
});
