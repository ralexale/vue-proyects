import App from '@/App.vue';
import router from '@/router';
import { mount } from '@vue/test-utils';
import type { RouteLocationNormalizedGeneric } from 'vue-router';

describe('Router', async () => {
  const wrapper = mount(App, {
    global: {
      plugins: [router],
    },
  });
  test('Router HomePage when visiting /', async () => {
    await router.replace('/');
    await router.isReady();
    expect(wrapper.html()).toContain('Bienvenido a nuestro sitio web');
  });

  test('Router FeaturesPage when visiting /features', async () => {
    await router.replace('/features');
    await router.isReady();
    expect(wrapper.html()).toContain('Master Cleanse Reliac Heirloom');
    await router.push({ name: 'features' });
  });

  test('Router PricingPage when visiting /pricing', async () => {
    await router.replace('/pricing');
    await router.isReady();
    expect(wrapper.html()).toContain('Choose a plan that works best');
  });

  test('Router ContactPage when visiting /contact', async () => {
    await router.replace('/contact');
    await router.isReady();
    expect(wrapper.find('iframe')).toBeTruthy();
  });

  test('Router renders login page when visiting /pokemon:id with no authentication', async () => {
    localStorage.clear();
    await router.push({ name: 'pokemon', params: { id: 1 } });
    await router.isReady();

    expect(wrapper.find('.text-2xl.font-semibold.mb-4').text()).toContain('Login');
  });

  test('Router PokemonPage when visiting /pokemon', async () => {
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg`;
    localStorage.setItem('userId', 'ABC-123');

    await router.push({ name: 'pokemon', params: { id: 1 } });
    await router.isReady();

    const pokemonImage = wrapper.find('[alt="pókemon"]');
    expect(pokemonImage.attributes('src')).toBe(imageUrl);
  });

  test('should convert the segment into number', async () => {
    const route: RouteLocationNormalizedGeneric = {
      name: undefined,
      params: { id: '2' },
      matched: [],
      fullPath: '/pokemon/2',
      query: {},
      hash: '',
      redirectedFrom: undefined,
      path: '',
      meta: {},
    };
    const pokemonRoute = router.getRoutes().find((route) => route.name === 'pokemon');

    const { id } = (pokemonRoute?.props as any).default(route);

    expect(pokemonRoute).toBeTruthy();
    expect(id).toBe(2);
  });

  test('should return default value is id is not a number', async () => {
    const route: RouteLocationNormalizedGeneric = {
      name: undefined,
      params: { id: 'asdasd' },
      matched: [],
      fullPath: '/pokemon/2',
      query: {},
      hash: '',
      redirectedFrom: undefined,
      path: '',
      meta: {},
    };
    const pokemonRoute = router.getRoutes().find((route) => route.name === 'pokemon');

    const { id } = (pokemonRoute?.props as any).default(route);

    expect(pokemonRoute).toBeTruthy();
    expect(id).toBe(1);
  });
});
