import ChatMessages from '@/components/chat/ChatMessages.vue';
import type { ChatMessage } from '@/interfaces/chat-message.interface';
import { mount } from '@vue/test-utils';

const messages: ChatMessage[] = [
  {
    id: 1,
    message: 'hola',
    itsMine: true,
  },
  {
    id: 2,
    message: 'no',
    itsMine: false,
    image: 'https://picsum.photos/200/300?random=1',
  },
];

describe('<ChatMessage />', () => {
  const wrapper = mount(ChatMessages, {
    props: {
      messages,
    },
  });
  test('renders chat messages correctly', () => {
    const chatBubbles = wrapper.findAllComponents({ name: 'ChatBubble' });
    expect(chatBubbles.length).toBe(messages.length);
  });

  test('should scroll down to the bottom when a new message is added', async () => {
    const scrollToMock = vi.fn();
    const chatRef = wrapper.vm.$refs.chatRef as HTMLDivElement;
    chatRef.scrollTo = scrollToMock;

    await wrapper.setProps({
      messages: [
        ...messages,
        {
          id: 3,
          message: 'hola',
          itsMine: true,
        },
      ],
    });

    await new Promise((r) => setTimeout(r, 150));

    expect(scrollToMock).toHaveBeenCalledTimes(1);
    expect(scrollToMock).toHaveBeenCalledWith({
        // top: chatRef.scrollHeight,
        top: expect.any(Number),
        behavior: 'smooth',
    });
  });
});
