import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame';
import { GameStatus } from '@/modules/pokemon/interfaces';
import PokemonGame from '@/modules/pokemon/pages/PokemonGame.vue';
import { mount } from '@vue/test-utils';
import type { Mock } from 'vitest';

vi.mock('@/modules/pokemon/composables/usePokemonGame', () => ({
  usePokemonGame: vi.fn(),
}));

const options = [
  {
    name: 'bulbasaur',
    id: '1',
    url: 'https://pokeapi.co/api/v2/pokemon/1/',
  },
  {
    name: 'ivysaur',
    id: '2',
    url: 'https://pokeapi.co/api/v2/pokemon/2/',
  },
  {
    name: 'venusaur',
    id: '3',
    url: 'https://pokeapi.co/api/v2/pokemon/3/',
  },
  {
    name: 'charmander',
    id: '4',
    url: 'https://pokeapi.co/api/v2/pokemon/4/',
  },
];

describe('<PokemonGame />', () => {
  test('shold initialize with default values', () => {
    (usePokemonGame as Mock).mockReturnValue({
      gameStatus: GameStatus.Playing,
      isLoading: true,
      loses: 0,
      wins: 0,
      pokemonOptions: [],
      winOption: undefined,
      nextRound: vi.fn(),
      checkAnswer: vi.fn(),
    });

    const wrapper = mount(PokemonGame);

    expect(wrapper.find('h1').text()).toBe('Espere un poco');
    expect(wrapper.find('h1').classes()).toEqual(['text-3xl']);
    expect(wrapper.find('h3').text()).toContain('Cargando Pókemons');
    expect(wrapper.find('h3').classes()).toContain('animate-pulse');
  });

  test('should render PokemonPictures correc', () => {
    const pokemonPic =
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg';

    (usePokemonGame as Mock).mockReturnValue({
      gameStatus: GameStatus.Playing,
      isLoading: false,
      loses: 0,
      wins: 0,
      pokemonOptions: options,
      winOption: options[0],
      nextRound: vi.fn(),
      checkAnswer: vi.fn(),
    });

    const wrapper = mount(PokemonGame);

    const buttons = wrapper.findAll('[data-test-id="option-button"]');

    expect(wrapper.find('h1').text()).toBe('¿Quién es este Pokemon?');
    expect(wrapper.find('img').attributes('src')).toBe(pokemonPic);
    expect(buttons).toHaveLength(options.length);

    buttons.forEach((button, index) => {
      expect(button.text()).toBe(options[index].name);
    });
  });

  test('should call nextRound when click on button', async() => {
    const spyNextRound = vi.fn();


    (usePokemonGame as Mock).mockReturnValue({
      gameStatus: GameStatus.Playing,
      isLoading: false,
      loses: 0,
      wins: 0,
      pokemonOptions: options,
      winOption: options[0],
      nextRound: spyNextRound,
      checkAnswer: vi.fn(),
    });

    const wrapper = mount(PokemonGame);
    const newGameOption = wrapper.find(
      '.bg-blue-500.hover\\:bg-blue-700.text-white.font-bold.text-2xl',
    );

    expect(newGameOption.text()).toBe('Continuar');

    await newGameOption.trigger('click');

    expect(spyNextRound).toHaveBeenCalled();
    expect(spyNextRound).toHaveBeenCalledWith(4);

    


  });
});
