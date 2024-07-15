import { useChat } from '@/composables/useChat';

describe('useChat', () => {
  test('should add message correctly when onMessage is called', async () => {
    const message = 'hola';
    const { messages, onMessage } = useChat();

    await onMessage(message);

    expect(messages.value.length).toBe(1);
    // expect(messages.value[0].message).toBe(message);
    // expect(messages.value[0].itsMine).toBe(true);
    // expect(messages.value[0].image).toBe(undefined);
    expect(messages.value[0]).toEqual({
      id: expect.any(Number),
      message,
      itsMine: true,
      image: undefined,
    });
  });

  test('should no add message when message is empty', async () => {
    const { messages, onMessage } = useChat();

    await onMessage('');

    expect(messages.value.length).toBe(0);
  });

  test('gets response correctly when message ends with ?', async () => {
    const message = 'hola ?';
    const { messages, onMessage } = useChat();

    await onMessage(message);

    // await new Promise((r) => setTimeout(r, 1000));

    const [myMessage, responseMessage] = messages.value;

    expect(messages.value.length).toBe(2);

    expect(myMessage).toEqual({
      id: expect.any(Number),
      message,
      itsMine: true,
      image: undefined,
    });

    expect(responseMessage).toEqual({
      id: expect.any(Number),
      message: expect.any(String),
      itsMine: false,
      image: expect.any(String),
    });
  });

  test(' mock response - fetch api ', async () => {
    const mockResponse = {
      answer: 'yes',
      image: 'https://picsum.photos/200/300',
      forced: false,
    };

    (window as any).fetch = vi.fn(async () => ({
      json: async () => mockResponse,
    }));

    const message = 'hola ?';

    const { messages, onMessage } = useChat();

    await onMessage(message);

    // await new Promise((r) => setTimeout(r, 1000));
    const [, responseMessage] = messages.value;

    expect(responseMessage).toEqual({
      id: expect.any(Number),
      message: mockResponse.answer,
      image: mockResponse.image,
      itsMine: false,
    });
  });
});
