<template>
  <!-- Title -->
  <div class="pt-32 bg-white">
    <h1 class="text-center text-2xl font-bold text-gray-800">All Products</h1>
  </div>
  <!-- tab menu  -->
  <tab-menu />

  <!-- Product List -->
  <products-skeleton v-if="!products" />
  <product-list v-else :products="products" />
  <button-pagination
    :page="page"
    :has-more-data="!!products && products.length < 10"
    :is-first-page="page === 1"
  />
</template>

<script setup lang="ts">
import { useQuery, useQueryClient } from '@tanstack/vue-query';

import { getProductsAction } from '@/modules/products/actions';
import ButtonPagination from '@/modules/common/components/ButtonPagination.vue';
import ProductList from '@/modules/products/components/ProductList.vue';
import ProductsSkeleton from '@/modules/products/components/ProductsSkeleton.vue';
import TabMenu from '../components/TabMenu.vue';
import { useRoute } from 'vue-router';
import { ref, watch, watchEffect } from 'vue';

const route = useRoute();
const page = ref(Number(route.query?.page ?? 1));
const queryClient = useQueryClient();

const { data: products } = useQuery({
  queryKey: ['products', { page: page }],
  queryFn: () => getProductsAction(page.value),
  staleTime: 1000 * 60 * 5, // 5 minutes
});

watch(
  () => route.query.page,
  (newPage) => {
    page.value = Number(newPage ?? 1);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  },
);

watchEffect(() => {
  queryClient.prefetchQuery({
    queryKey: ['products', { page: page.value + 1 }],
    queryFn: () => getProductsAction(page.value + 1),
  });
});
</script>

<style scoped></style>
