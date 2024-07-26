<template>
  <section class="py-10 bg-gray-100 min-h-full">
    <div class="mx-auto grid max-w-6xl grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 p-6">
      <article
        v-for="(skeleton, index) in new Array(10)"
        :key="index"
        class="rounded-xl bg-white h-[410px] p-3 shadow-lg"
      >
        <!-- image  -->
        <div class="relative flex items-end overflow-hidden rounded-xl w-full">
          <figure class="bg-gray-200 p-3 animate-pulse shadow-lg rounded-xl w-full h-[320px]" />
        </div>

        <!-- body  -->
        <div class="mt-1 p-2 flex flex-col justify-between">
          <h1 class="w-56 h-2 mt-4 bg-gray-200 rounded-lg animate-pulse"></h1>
          <p class="w-24 h-2 mt-4 bg-gray-200 rounded-lg animate-pulse"></p>
          <div class="mt-3 flex items-end justify-between">
            <p class="text-lg font-bold text-blue-500"></p>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
