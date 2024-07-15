import PokemonOptions from '@/modules/pokemon/components/PokemonOptions.vue';
import { mount } from '@vue/test-utils';

const winOption = {
  id: '1',
  name: 'Bulbasaur',
  url: 'https://pokeapi.co/api/v2/pokemon/1',
};

const pokemonOptions = [
  {
    id: '1',
    name: 'Bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon/1',
  },
  {
    id: '2',
    name: 'Ivysaur',
    url: 'https://pokeapi.co/api/v2/pokemon/2',
  },
  {
    id: '3',
    name: 'Venusaur',
    url: 'https://pokeapi.co/api/v2/pokemon/3',
  },
  {
    id: '4',
    name: 'Charmander',
    url: 'https://pokeapi.co/api/v2/pokemon/4',
  },
];

describe('<PokemonOptions />', () => {
  test('should render the correctly number of buttons', () => {
    const wrapper = mount(PokemonOptions, {
      props: {
        correctOption: winOption.id,
        options: pokemonOptions,
        blockSelection: false,
      },
    });

    const buttons = wrapper.findAll('button');

    expect(buttons.length).toBe(pokemonOptions.length);
  });

  test('should render the correct value for the buttons', () => {
    const wrapper = mount(PokemonOptions, {
      props: {
        correctOption: winOption.id,
        options: pokemonOptions,
        blockSelection: false,
      },
    });

    const buttons = wrapper.findAll('button');

    buttons.forEach((button, index) => {
      expect(button.text()).toEqual(pokemonOptions[index].name);
    });
  });

  test('should emit the selectedOption when a button is clicked', async () => {
    const wrapper = mount(PokemonOptions, {
      props: {
        correctOption: winOption.id,
        options: pokemonOptions,
        blockSelection: false,
      },
    });

    const [b1, b2, b3, b4] = wrapper.findAll('button');
    await b1.trigger('click');
    await b2.trigger('click');
    await b3.trigger('click');
    await b4.trigger('click');

    expect(wrapper.emitted().selectedOption).toBeTruthy();
    expect(wrapper.emitted('selectedOption')?.[0]).toStrictEqual(['1']);
    expect(wrapper.emitted('selectedOption')?.[1]).toStrictEqual(['2']);
    expect(wrapper.emitted('selectedOption')?.[2]).toStrictEqual(['3']);
    expect(wrapper.emitted('selectedOption')?.[3]).toStrictEqual(['4']);
  });

  test('should disable buttons when blockSelection prop is true', () => {
    const wrapper = mount(PokemonOptions, {
      props: {
        correctOption: winOption.id,
        options: pokemonOptions,
        blockSelection: true,
      },
    });

    const buttons = wrapper.findAll('button');

    buttons.forEach((button) => {
      expect(button.classes()).toContain('disabled');
    });
  });

  test('should buttons have the correct class when clicked and option', async () => {
    const wrapper = mount(PokemonOptions, {
      props: {
        correctOption: winOption.id,
        options: pokemonOptions,
        blockSelection: true,
      },
    });

    const buttons = wrapper.findAll('button');

    buttons.forEach((button, index) => {
      expect(button.classes()).toContain(
        pokemonOptions[index].id === winOption.id ? 'correct' : 'incorrect',
      );
    });
  });
});
