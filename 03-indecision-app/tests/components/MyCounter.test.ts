import { mount } from '@vue/test-utils';

import MyCounter from '@/components/MyCounter.vue';

describe('MyCounter', () => {
  test('should compare the counter value with the square value from the snapshot', () => {
    // preparación
    const wrapper = mount(MyCounter, {
      props: {
        value: 10,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders the counter value and square value properly', () => {
    // preparación
    const value = 5;
    const wrapper = mount(MyCounter, {
      props: {
        value: value,
      },
    });
    const [h3Counter, h3Square] = wrapper.findAll('h3');

    // cuando usamos find el primero que encuentre es el que toma
    expect(wrapper.find('h3').text()).toContain(`Counter: ${value}`);
    expect(wrapper.find('[data-testid="square-label"]').text()).toContain(
      `Square: ${value * value}`,
    );

    expect(h3Counter.text()).toContain(`Counter: ${value}`);
    expect(h3Square.text()).toContain(`Square: ${value * value}`);
  });

  test('increments the counter +1 button is clicked', async () => {
    // preparación
    const value = 7;
    const wrapper = mount(MyCounter, {
      props: {
        value: value,
      },
    });
    const [h3Counter, h3Square] = wrapper.findAll('h3');

    // estimulo
    const btnIncrement = wrapper.find('button');
    await btnIncrement.trigger('click');

    // comportamiento esperado
    expect(h3Counter.text()).toContain(`Counter: ${value + 1}`);
    expect(h3Square.text()).toContain(`Square: ${(value + 1) * (value + 1)}`);
  });

  test('decrements the counter -2 button is clicked twice', async () => {
    // preparación
    const value = 7;
    const wrapper = mount(MyCounter, {
      props: {
        value: value,
      },
    });
    const [h3Counter, h3Square] = wrapper.findAll('h3');

    // estimulo
    const [, btnDecrement] = wrapper.findAll('button');
    await btnDecrement.trigger('click');
    await btnDecrement.trigger('click');

    // comportamiento esperado
    expect(h3Counter.text()).toContain(`Counter: ${value - 2}`);
    expect(h3Square.text()).toContain(`Square: ${(value - 2) * (value - 2)}`);
  });
});
