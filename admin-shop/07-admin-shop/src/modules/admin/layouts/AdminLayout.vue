<template>
  <!-- component -->
  <div class="flex w-screen h-screen text-gray-700">
    <!-- Component Start -->
    <div class="flex flex-col w-56 border-r border-gray-300">
      <button class="relative text-sm focus:outline-none group">
        <div
          class="flex items-center justify-between w-full h-16 px-4 border-b border-gray-300 hover:bg-gray-300"
        >
          <span class="font-medium"> Dropdown </span>
          <svg
            class="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </button>

      <!-- Links -->

      <div class="flex flex-col flex-grow p-4 overflow-auto">
        <RouterLink
          v-for="route in adminRoutes"
          :key="route.name"
          :to="route.path"
          class="flex items-center flex-shrink-0 h-10 px-2 text-sm font-medium rounded hover:bg-gray-300"
          href="#"
        >
          <span class="leading-none">{{ route.name }}</span>
        </RouterLink>
      </div>
    </div>

    <div class="flex flex-col flex-grow">
      <div class="flex items-center flex-shrink-0 h-16 px-8 border-b border-gray-300">
        <h1 class="text-lg font-medium">{{ authStore.user?.fullName }}</h1>
        <button
          class="flex bg-blue-500 text-white items-center justify-center h-10 px-4 ml-auto text-sm font-medium rounded hover:bg-blue-400"
        >
          + New Product
        </button>
      </div>
      <div class="flex-grow p-6 overflow-auto bg-gray-200">
        <!-- content -->
        <RouterView />
      </div>
    </div>
    <!-- Component End  -->
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/modules/auth/stores/auth.store';

const authStore = useAuthStore();

const adminRoutes = [
  {
    path: '/admin',
    name: 'Admin',
  },
  {
    path: '/admin/products',
    name: 'products',
  },
  {
    path: '/',
    name: 'Home',
  },
];
</script>

<style scoped></style>
