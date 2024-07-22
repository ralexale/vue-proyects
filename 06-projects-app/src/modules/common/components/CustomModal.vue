<template>
  <dialog class="modal" :open="open">
    <div class="modal-box">
      <div class="border-b border-gray-400 p-4">
        <!-- header -->
        <slot name="header" />
      </div>

      <div>
        <!-- body -->
        <slot name="body" />
      </div>

      <div class="modal-action">
        <slot name="actions" />
      </div>
    </div>
  </dialog>
  <div
    v-if="open"
    class="fixed top-0 left-0 h-screen !w-screen bg-black/30 backdrop-blur-sm transition-all"
  />
</template>

<script lang="ts" setup>
interface Props {
  open?: boolean;
}

withDefaults(defineProps<Props>(), {
  open: false,
});
</script>
