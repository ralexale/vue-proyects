import { mount } from '@vue/test-utils';
import MessageBox from '@/components/chat/MessageBox.vue';

describe('<MessageBox />', () => {
  const wrapper = mount(MessageBox);
  const input = wrapper.find('input[type="text"]');
  const button = wrapper.find('button');

  test('should render inputs and buttons correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
    expect(input.exists()).toBe(true);
    expect(button.exists()).toBe(true);
    expect(wrapper.find('button img').exists()).toBe(true);
  });

  test('emits sendMessage event when button is clicked and have a message', async () => {
    // preparación
    const message = 'hola mundo';

    await input.setValue(message);
    await button.trigger('click');

    expect(wrapper.emitted('sendMessage')).toBeTruthy();
    expect(wrapper.emitted('sendMessage')?.[0]).toEqual([message]);
    expect((wrapper.vm as any).message).toBe('');
  });

  test('emits sendMessage event when enter key is pressed and have a message', async () => {
    // preparación
    const message = 'hola mundo';

    await input.setValue(message);
    await input.trigger('keypress.enter');

    expect(wrapper.emitted('sendMessage')).toBeTruthy();
    expect(wrapper.emitted('sendMessage')?.[0]).toEqual([message]);
    expect((wrapper.vm as any).message).toBe('');
  });

  test('no emits sendMessage event when enter key and button is pressed if message is empty', async () => {
    const wrapper = mount(MessageBox);

    await input.trigger('keypress.enter');
    await button.trigger('click');
    
    expect(wrapper.emitted('sendMessage')).toBeFalsy();
  });
});
