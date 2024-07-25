<template>
  <div class="overflow-x-auto w-full">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th>Id</th>
          <th>Proyecto</th>
          <th>Tareas</th>
          <th>Avance</th>
        </tr>
      </thead>
      <tbody>
        <!-- row 1 -->
        <tr v-for="(project, index) in projectStore.projectsWithCompletion" :key="project.id">
          <th>{{ index + 1 }}</th>
          <td>{{ project.name }}</td>
          <td>{{ project.tasks.length }}</td>
          <progress
            class="progress progress-primary w-56"
            :value="project.completedTasks"
            max="100"
          ></progress>
        </tr>
        <!-- row 2 -->
      </tbody>
    </table>

    <fab-button @click="modalOpen = true">
      <AddCircle />
    </fab-button>

    <fab-button @click="customModalOpen = true" position="bottom-left">
      <CustomIcon />
    </fab-button>
  </div>

  <InputModal
    :open="modalOpen"
    title="Agrega un proyecto"
    subtitle="Escribe el nombre del proyecto y pulsa aceptar"
    @close="modalOpen = false"
    @value="projectStore.addProject"
  />

  <!-- mandamos información para construir el modal -->
  <CustomModal :open="customModalOpen" @close="customModalOpen = false">
    <template #header>
      <h1>titulo del modal</h1>
    </template>
    <template #body>
      <input type="text" placeholder="Escribe aquí tu texto" class="mt-4 input input-primary" />
    </template>
    <template #actions>
      <div class="flex gap-2">
        <button @click="customModalOpen = false" class="btn">Cerrar</button>
        <button type="submit" class="btn btn-primary">Aceptar</button>
      </div>
    </template>
  </CustomModal>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

import CustomModal from '@/modules/common/components/CustomModal.vue';
import FabButton from '@/modules/common/components/FabButton.vue';
import AddCircle from '@/modules/common/components/icons/AddCircle.vue';
import InputModal from '@/modules/common/components/InputModal.vue';
import CustomIcon from '@/modules/common/components/icons/CustomIcon.vue';
import { useProjectsStore } from '../store/projects.store';

const modalOpen = ref(false);
const customModalOpen = ref(false);

const projectStore = useProjectsStore();
</script>
