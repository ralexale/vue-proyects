<template>
  <section class="py-10 bg-gray-100 min-h-full">
    <div class="mx-auto grid max-w-6xl grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 p-6">
      <product-card v-for="product in products" :key="product.id" :product="product" />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Product } from '../interfaces';
import ProductCard from './ProductCard.vue';

interface Props {
  products: Product[];
}

defineProps<Props>();
</script>

<style scoped></style>
