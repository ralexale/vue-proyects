<template>
  <div class="text-center">
    <h1 class="text-4xl font-bold tracking-tighter sm:text-5xl">Bienvenido a nuestro sitio web</h1>
    <p class="mx-auto max-w-[600px] text-gray-500 md:text-xl">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </p>

    <div class="flex justify-center items-center gap-4 mt-10">
      <p class="text-3xl">{{ counter }}</p>
      <button @click="counter++" class="bg-white px-2 py-4 rounded-md shadow">Incrementar</button>
    </div>
  </div>
</template>

<script src="./homePage.ts" lang="ts"></script>
