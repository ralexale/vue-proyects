import { mount } from '@vue/test-utils';
import PokemonPictures from '@/modules/pokemon/components/PokemonPictures.vue';

describe('<PokemonPictures />', () => {
  const pokemonId = '25';
  const pokemonPicture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`;

  test('should render the hidden image when showPicture prop is false', () => {
    const wrapper = mount(PokemonPictures, {
      props: {
        showPicture: false,
        pokemonId: pokemonId,
      },
    });

    const image = wrapper.find('img');
    const attributes = image.attributes();

    expect(attributes).toEqual(
      expect.objectContaining({
        src: pokemonPicture,
        class: 'fade-in brightness-0',
        alt: 'pokemon',
      }),
    );
  });

  test('should render the image when showPicture prop is true', () => {
    const wrapper = mount(PokemonPictures, {
      props: {
        pokemonId: pokemonId,
        showPicture: true,
      },
    });
    const image = wrapper.find('img');
    const attributes = image.attributes();

    expect(attributes).toEqual(
      expect.objectContaining({
        src: pokemonPicture,
        class: 'fade-in',
        alt: 'pokemon',
      }),
    );
  });
});
