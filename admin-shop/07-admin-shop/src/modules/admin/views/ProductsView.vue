<template>
  <div class="bg-white px-5 py-2 rounded">
    <h1 class="text-3xl">Productos</h1>

    <div class="py-8 w-full m-auto">
      <div class="shadow overflow-hidden w-full rounded border-b border-gray-200">
        <table class="bg-white w-full">
          <thead class="bg-gray-800 text-white">
            <tr>
              <th class="w-10 text-left py-3 px-4 uppercase font-semibold text-sm">Imagen</th>
              <th class="flex-1 text-left py-3 px-4 uppercase font-semibold text-sm">Titulo</th>
              <th class="w-28 py-3 px-4 uppercase font-semibold text-sm">Precio</th>
              <th class="w-60 text-left py-3 px-4 uppercase font-semibold text-sm">Tallas</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <tr class="odd:bg-gray-200" v-for="(product, index) in products" :key="product.id">
              <td class="text-left py-3 px-4">
                <img class="size-10 object-cover" :src="product.images[0]" :alt="product.title" />
              </td>
              <td class="text-left py-3 px-4">
                <RouterLink
                  :to="`/admin/products/${product.id}`"
                  class="underline cursor-pointer hover:text-blue-500 transition-colors"
                >
                  {{ product.title }}</RouterLink
                >
              </td>
              <td class="text-left py-3 px-4">
                <span
                  class="text-blue-500 py-1 flex max-w-10 min-w-16 justify-center rounded-full bg-blue-300/70 font-bold"
                  >$ {{ product.price }}</span
                >
              </td>
              <td class="text-left py-3 px-4">
                <span> {{ product.sizes.join(' - ') }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button-pagination
        :page="page"
        :has-more-data="!!products && products.length < 10"
        :is-first-page="page === 1"
      />
    </div>
  </div>

  <!-- component -->
</template>

<script setup lang="ts">
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { watchEffect } from 'vue';

import { getProductsAction } from '@/modules/products/actions';
import ButtonPagination from '@/modules/common/components/ButtonPagination.vue';
import { usePagination } from '@/modules/common/composables/usePagination';

const { page } = usePagination();
const queryClient = useQueryClient();

const { data: products } = useQuery({
  queryKey: ['products', { page: page }],
  queryFn: () => getProductsAction(page.value),
  staleTime: 1000 * 60 * 5, // 5 minutes
});

watchEffect(() => {
  queryClient.prefetchQuery({
    queryKey: ['products', { page: page.value + 1 }],
    queryFn: () => getProductsAction(page.value + 1),
  });
});
</script>

<style scoped></style>
