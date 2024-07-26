<template>
  <div class="flex justify-center py-10 gap-4 bg-gray-100">
    <button
      @click="$router.push({ query: { page: page - 1 }, path: '/' })"
      :disabled="isFirstPage"
      class="flex items-center bg-blue-500 px-4 py-1.5 rounded-lg text-white space-x-1.5 disabled:bg-gray-300 hover:bg-blue-600 transition-colors"
    >
      <ArrowLeftIcon />
      <span>Anteriores</span>
    </button>

    <button
      @click="$router.push({ query: { page: page + 1 }, path: '/' })"
      :disabled="hasMoreData"
      class="flex items-center bg-blue-500 px-4 py-1.5 rounded-lg text-white space-x-1.5 disabled:bg-gray-300 hover:bg-blue-600 transition-colors"
    >
      <span>Siguiente</span>
      <ArrowRightIcon />
    </button>
  </div>
</template>

<script setup lang="ts">
import ArrowLeftIcon from '@/modules/common/icons/ArrowLeftIcon.vue';
import ArrowRightIcon from '@/modules/common/icons/ArrowRightIcon.vue';

interface Props {
  page: number;
  isFirstPage: boolean;
  hasMoreData: boolean;
}
defineProps<Props>();
</script>

<style scoped></style>
