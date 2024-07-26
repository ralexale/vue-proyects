<template>
  <!-- Title -->
  <div class="pt-32 bg-white">
    <h1 class="text-center text-2xl font-bold text-gray-800">All Products</h1>
  </div>
  <!-- tab menu  -->
  <tab-menu />

  <!-- Product List -->
  <product-list v-if="products" :products="products" />

  <products-skeleton v-else />
</template>

<script setup lang="ts">
import { getProductsAction } from '@/modules/products/actions';
import ProductList from '@/modules/products/components/ProductList.vue';
import { useQuery } from '@tanstack/vue-query';
import TabMenu from '../components/TabMenu.vue';
import ProductsSkeleton from '@/modules/products/components/ProductsSkeleton.vue';

const { data: products } = useQuery({
  queryKey: ['products', { page: 1 }],
  queryFn: () => getProductsAction(),
  staleTime: 1000 * 60 * 5, // 5 minutes
});
</script>

<style scoped></style>
