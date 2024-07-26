<template>
  <!-- Header Navbar -->
  <top-menu />

  <!-- Router View -->
  <router-view />

  <!-- Footer -->
  <custom-footer />
</template>

<script lang="ts" setup>
import CustomFooter from '../components/CustomFooter.vue';
import TopMenu from '../components/TopMenu.vue';
</script>
