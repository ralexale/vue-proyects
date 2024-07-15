import { sleep } from '@/helpers/sleep';
import type { ApiResponse } from '@/interfaces/api-response.interface';
import type { ChatMessage } from '@/interfaces/chat-message.interface';
import { ref } from 'vue';

export const useChat = () => {
  const messages = ref<ChatMessage[]>([]);

  const getResponse = async (): Promise<ApiResponse> => {
    try {
      const { answer, image, forced }: ApiResponse = await fetch('https://yesno.wtf/api').then(
        (res) => res.json(),
      );

      return {
        answer,
        forced,
        image,
      };
    } catch (error) {
      console.error('Error fetching response:', error);
      throw new Error('Error fetching response');
    }
  };

  const onMessage = async (message: string) => {
    if (!message) return;
    messages.value.push({
      id: new Date().getTime(),
      message,
      itsMine: true,
    });

    if (!message.endsWith('?')) return;

    await sleep(1);
    const { answer, image } = await getResponse();

    messages.value.push({
      id: new Date().getTime(),
      message: answer,
      itsMine: false,
      image: image,
    });
  };
  return {
    messages,
    onMessage,
  };
};
