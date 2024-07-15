import { mount } from '@vue/test-utils';
import ChatMessages from '@/components/chat/ChatMessages.vue';
import IndecisionView from '@/views/IndecisionView.vue';
import MessageBox from '@/components/chat/MessageBox.vue';

const mockChatMessages = {
  template: '<div data-testid="mock-messages">Mock ChatMessages</div>',
};
describe('<IndecisionView />', () => {
  test('should renders the chat messages and the message box', () => {
    const wrapper = mount(IndecisionView);
    const chatMessages = wrapper.findComponent(ChatMessages);
    const messageBox = wrapper.findComponent(MessageBox);

    expect(chatMessages.exists()).toBe(true);
    expect(messageBox.exists()).toBe(true);
  });

  test('calls on message when sending a message', async () => {
    const message = 'hola mundo';
    const wrapper = mount(IndecisionView, {
      global: {
        stubs: {
          ChatMessages: mockChatMessages,
        },
      },
    });
    // const chatMessages = wrapper.findComponent(ChatMessages);
    const messageBox = wrapper.findComponent(MessageBox);
    messageBox.vm.$emit('sendMessage', message);
    await new Promise((r) => setTimeout(r, 150));

    expect(messageBox.emitted('sendMessage')?.[0]).toEqual([message]);
    expect(wrapper.html()).toMatchSnapshot()
  });
});
