<template>
  <article
    class="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 min-h-[280px] duration-300"
  >
    <RouterLink :to="`product/${product.id}`">
      <!-- image  -->
      <div class="relative flex items-end overflow-hidden rounded-xl">
        <img :src="product.images[0]" alt="Hotel Photo" />
      </div>

      <!-- body  -->
      <div class="mt-1 p-2 flex flex-col justify-between">
        <h2 class="text-slate-700 font-semibold">{{ product.title }}</h2>
        <div class="mt-3 flex items-end justify-between">
          <p class="text-lg font-bold text-blue-500">${{ product.price }}</p>

          <div
            class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600"
          >
            <CartIcon />
            <button class="text-sm">Add to cart</button>
          </div>
        </div>
      </div>
    </RouterLink>
  </article>
</template>

<script setup lang="ts">
import CartIcon from '@/modules/common/icons/CartIcon.vue';
import type { Product } from '../interfaces';

interface Props {
  product: Product;
}

defineProps<Props>();
</script>

<style scoped></style>
