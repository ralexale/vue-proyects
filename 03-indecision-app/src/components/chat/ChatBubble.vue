<template>
  <div v-if="itsMine" class="flex gap-2 justify-end">
    <div class="bg-blue-200 text-black p-2 rounded-lg max-w-xs">{{ message }}</div>
  </div>

  <!-- Example Received Message -->
  <div v-else class="flex gap-2">
    <div class="bg-gray-300 text-black p-2 rounded-lg max-w-xs">
      <span>{{ message }}</span>
      <img v-if="image" :src="image" alt="profile" class="size-52 object-cover rounded-md" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  message: string;
  itsMine: boolean;
  image?: string;
}

const props = defineProps<Props>();

const itsMine = ref(props.itsMine);
const image = ref(props.image);
const message = ref(props.message);
</script>
