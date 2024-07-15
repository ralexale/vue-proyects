import ChatBubble from '@/components/chat/ChatBubble.vue';
import { mount } from '@vue/test-utils';

describe('<ChatBubble />', () => {
  test('renders own message correctly', () => {
    // preparación
    const message = 'hola mundo';

    // estimulo
    const wrapper = mount(ChatBubble, {
      props: {
        message,
        itsMine: true,
      },
    });

    // comportamiento esperado
    expect(wrapper.find('.bg-blue-200').exists()).toBe(true);
    expect(wrapper.find('.bg-blue-200').exists()).toBeTruthy();
    expect(wrapper.find('.bg-blue-200').text()).toContain(message);

    expect(wrapper.find('.bg-gray-300').exists()).toBeFalsy();
  });

  test('renders received message correctly', () => {
    // preparación
    const message = 'hola mundo';
    // estimulo
    const wrapper = mount(ChatBubble, {
      props: {
        message,
        itsMine: false,
      },
    });
    // comportamiento esperado
    expect(wrapper.find('.bg-gray-300').exists()).toBe(true);
    expect(wrapper.find('.bg-gray-300').exists()).toBeTruthy();
    expect(wrapper.find('.bg-gray-300').text()).toContain(message);

    expect(wrapper.find('.bg-blue-200').exists()).toBeFalsy();
    expect(wrapper.find('img').exists()).toBeFalsy();
  });

  test('renders received image and message correctly', () => {
    // preparación
    const message = 'hola mundo';
    const image = 'https://picsum.photos/200';

    // estimulo
    const wrapper = mount(ChatBubble, {
      props: {
        message,
        itsMine: false,
        image,
      },
    });

    // comportamiento esperado
    expect(wrapper.find('.bg-gray-300').exists()).toBe(true);
    expect(wrapper.find('.bg-gray-300').exists()).toBeTruthy();
    expect(wrapper.find('.bg-gray-300').text()).toContain(message);

    expect(wrapper.find('.bg-blue-200').exists()).toBeFalsy();

    expect(wrapper.find('img').exists()).toBe(true);
    expect(wrapper.find('img').attributes('src')).toBe(image);
  });
});
