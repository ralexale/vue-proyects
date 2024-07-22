<template>
  <div class="flex flex-col h-screen w-screen overflow-y-hidden">
    <!-- top menu  -->
    <top-menu />

    <main class="flex">
      <!-- side menu  -->
      <side-menu />
      <router-view />
    </main>
  </div>
</template>

<script lang="ts" setup>
import TopMenu from '@/modules/common/components/TopMenu.vue';
import SideMenu from '../components/SideMenu.vue';
</script>
