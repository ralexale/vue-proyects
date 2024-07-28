<template>
  <h1 class="text-2xl font-semibold mb-4">Registrarse</h1>
  <form @submit.prevent="onRegister">
    <!-- Username Input -->
    <div class="mb-4">
      <label for="name" class="block text-gray-600">Nombre</label>
      <input
        v-model="registerForm.fullName"
        type="text"
        id="name"
        name="name"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>

    <!-- Username Input -->
    <div class="mb-4">
      <label for="username" class="block text-gray-600">Correo</label>
      <input
        v-model="registerForm.email"
        type="text"
        id="username"
        name="username"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>
    <!-- Password Input -->
    <div class="mb-4">
      <label for="password" class="block text-gray-600">Contraseña</label>
      <input
        v-model="registerForm.password"
        type="password"
        id="password"
        name="password"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>

    <!-- Forgot Password Link -->
    <div class="mb-6 text-blue-500">
      <a href="#" class="hover:underline">Olvidaste tu contraseña?</a>
    </div>
    <!-- Login Button -->
    <button
      type="submit"
      class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
    >
      Crear cuenta
    </button>
  </form>
  <!-- Sign up  Link -->
  <div class="mt-6 text-blue-500 text-center">
    <RouterLink :to="{ name: 'login' }" class="hover:underline"
      >¿Ya tienes una cuenta? Inicia sesión</RouterLink
    >
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { useAuthStore } from '../stores/auth.store';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();

const registerForm = reactive({
  fullName: '',
  email: '',
  password: '',
});
const toast = useToast();
const router = useRouter();

const onRegister = async () => {
  try {
    const response = await authStore.register(
      registerForm.fullName,
      registerForm.email,
      registerForm.password,
    );
    if (!response.ok) {
      toast.error(
        `${response.message[0] && response.message[0]} - ${response.message[1] && response.message[1]}`,
      );
      return;
    }

    toast.success('Registrado correctamente');

    setTimeout(() => {
      router.replace({ name: 'home' });
    }, 1000);
  } catch (error) {
    toast.error(error as string);
  }
};
</script>
