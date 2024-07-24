<template>
  <dialog id="my_modal_1" class="modal" :open="open">
    <div class="modal-box">
      <h3 class="text-lg font-bold">{{ title }}</h3>
      <p class="py-4">{{ subtitle }}</p>
      <div class="modal-action">
        <form
          @submit.prevent="submitValue"
          method="dialog"
          class="flex flex-col items-center p-4 gap-4 w-full"
        >
          <input
            ref="inputRef"
            type="text"
            v-model="inputValue"
            :placeholder="placeholder ?? 'Nombre del proyecto'"
            class="input input-bordered w-full max-w-96"
          />
          <div class="flex justify-center gap-4">
            <button class="btn w-full max-w-96">Cerrar</button>
            <button type="submit" class="btn btn-primary w-full max-w-96">Aceptar</button>
          </div>
          <!-- if there is a button in form, it will close the modal -->
        </form>
      </div>
    </div>
  </dialog>
  <div
    v-if="open"
    class="fixed top-0 left-0 h-screen !w-screen bg-black/30 backdrop-blur-sm transition-all"
  />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

interface Props {
  open: boolean;
  title: string;
  subtitle?: string;
  placeholder?: string;
}

const props = defineProps<Props>();

watch(props, ({ open }) => {
  open && inputRef.value?.focus();
});

const emits = defineEmits<{
  close: [void];
  value: [text: string];
}>();
const inputValue = ref('');
const inputRef = ref<HTMLInputElement | null>(null);

const submitValue = () => {
  if (!inputValue.value) {
    inputRef.value?.focus();
    return;
  }

  emits('value', inputValue.value.trim());
  emits('close');

  inputValue.value = '';
};
</script>
