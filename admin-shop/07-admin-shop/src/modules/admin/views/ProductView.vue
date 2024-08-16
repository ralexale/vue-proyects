<template>
  <div class="bg-white px-5 py-2 rounded">
    <h1 class="text-3xl">
      Producto: <small class="text-blue-500">{{ title }}</small>
    </h1>
    <hr class="my-4" />
  </div>

  <form @submit="onSubmit" class="grid grid-cols-1 sm:grid-cols-2 bg-white px-5 gap-5">
    <div class="first-col">
      <!-- Primera parte del formulario -->
      <div class="mb-4">
        <label for="title" class="form-label">Título</label>
        <custom-input v-model="title" v-bind="titleAttrs" :error="errors.title" />
      </div>

      <div class="mb-4">
        <label for="slug" class="form-label">Slug</label>
        <custom-input v-model="slug" v-bind="slugAttrs" :error="errors.slug" />
      </div>

      <div class="mb-4">
        <label for="description" class="form-label">Descripción</label>
        <custom-text-area
          v-model="description"
          v-bind="descriptionAttrs"
          :error="errors.description"
        />
      </div>

      <div class="flex flex-row gap-3">
        <div class="mb-4">
          <label for="price" class="form-label">Precio</label>
          <custom-input
            v-model.number="price"
            v-bind="priceAttrs"
            :error="errors.price"
            type="number"
          />
        </div>

        <div class="mb-4">
          <label for="stock" class="form-label">Inventario</label>
          <custom-input
            v-model.number="stock"
            v-bind="stockAttrs"
            :error="errors.stock"
            type="number"
          />
        </div>
      </div>

      <div class="mb-4">
        <span for="sizes" class="form-label">Tallas</span>

        <div class="flex flex-wrap gap-2">
          <button
            v-for="size in allSizes"
            :key="size"
            type="button"
            @click="toggleSize(size)"
            :class="[
              'bg-blue-400  hover:bg-blue-600 hover:text-white p-2 rounded w-14 transition-colors duration-75',
              {
                'bg-blue-600 text-white': hasSize(size),
              },
            ]"
          >
            {{ size }}
          </button>
        </div>
      </div>
    </div>

    <!-- Segunda columna -->
    <div class="first-col">
      <label for="stock" class="form-label">Imágenes</label>
      <!-- Row with scrollable horizontal -->
      <div
        class="flex p-2 overflow-x-auto overflow-y-hidden gap-4 w-full h-[275px] bg-gray-200 rounded"
      >
        <div v-for="image in images" :key="image.value" class="flex-shrink-0">
          <img :src="image.value" :alt="title" class="w-[250px] h-[250px] object-cover" />
        </div>

        <div v-for="imageFile in imageFiles" :key="imageFile.name" class="flex-shrink-0">
          <img
            :src="temporalImageUrl(imageFile)"
            :alt="title"
            class="w-[250px] h-[250px] object-cover"
          />
        </div>
      </div>

      <!-- Upload image -->
      <div class="col-span-2 my-2">
        <label for="image" class="form-label">Subir imagen</label>

        <input
          multiple
          type="file"
          accept="image/*"
          id="image"
          class="form-control"
          @change="onFileChange"
        />
      </div>

      <div class="mb-4">
        <label for="stock" class="form-label">Género</label>
        <select v-model="gender" v-bind="genderAttrs" class="form-control">
          <!-- <option value="">Seleccione</option> -->
          <option value="kid">Niño</option>
          <option value="women">Mujer</option>
          <option value="men">Hombre</option>
        </select>
        <span class="text-red-500" v-if="errors.gender">{{ errors.gender }}</span>
      </div>

      <!-- Botón para guardar -->
      <div class="my-4 text-right">
        <button
          type="submit"
          :disabled="isPending"
          class="bg-blue-500 hover:bg-blue-700 transition-colors text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
        >
          Guardar
        </button>
      </div>
    </div>
  </form>
</template>

<script src="./product-view.ts" lang="ts" />

<style scoped>
.form-label {
  @apply block text-gray-700 text-sm font-bold mb-2;
}

.form-control {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none;
}
</style>
