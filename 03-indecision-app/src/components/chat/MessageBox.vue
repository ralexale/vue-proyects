<template>
  <div class="bg-white p-4 flex items-center">
    <input
      type="text"
      v-model="message"
      @keypress.enter="sendMessage"
      placeholder="Type your message..."
      class="flex-1 border rounded-full px-4 py-2 focus:outline-none"
    />
    <button
      @click="sendMessage"
      class="bg-blue-500 text-white rounded-full p-2 ml-2 hover:bg-blue-600 focus:outline-none"
    >
      <img src="/icons/chat/sendIcon.svg" alt="send icon" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const message = ref<string>('');

const emit = defineEmits<{
  sendMessage: [message: string];
}>();

const sendMessage = async () => {
  if (!message.value) return;
  emit('sendMessage', message.value);
  message.value = '';
};
</script>
