import PokemonPage from '@/modules/pokemons/pages/PokemonPage.vue';
import router from '@/router';
import { RouterLinkStub, mount } from '@vue/test-utils';

describe('<PokemonPage/>', () => {
  const id = 25;
  const wrapper = mount(PokemonPage, {
    props: {
      id,
    },
    global: {
      plugins: [router],
      stubs: {
        // RouterLink: true,
        RouterLink: RouterLinkStub,
      },
    },
  });

  test('should be render correctly', () => {
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;

    expect(wrapper.find('h1').exists()).toBe(true);
    expect(wrapper.find('h1').text()).toEqual(`Pókemon #${id}`);
    expect(wrapper.find('img').attributes('src')).toBe(imageUrl);
  });

  test('should redirect to the next pokemon', async () => {
    const link = wrapper.findComponent(RouterLinkStub);


    expect(link.props().to).toEqual({
      name: 'pokemon',
      params: {
        id: id + 1,
      },
    });

  });
});
