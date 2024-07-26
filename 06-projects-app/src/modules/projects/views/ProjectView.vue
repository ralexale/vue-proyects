<template>
  <div class="full p-4 flex flex-col gap-4 w-full">
    <section>
      <bread-crums :name="project?.name ?? ''" />
    </section>

    <section>
      <div class="overflow-x-auto">
        <table class="table w-full">
          <!-- head -->
          <thead>
            <tr>
              <th class="w-14">Completada</th>
              <th>Tarea</th>
              <th>Completada en</th>
              <th>acciones</th>
            </tr>
          </thead>
          <tbody>
            <!-- row 2 -->
            <tr v-for="task in project?.tasks" :key="task.id" class="hover">
              <th>
                <input
                  type="checkbox"
                  :checked="!!task.completedAt"
                  class="checkbox checkbox-primary"
                  @change="projectStore.toggleTask(project?.id!, task.id)"
                />
              </th>
              <td>{{ task.name }}</td>
              <td>{{ task.completedAt ?? 'No completado' }}</td>
              <td class="flex gap-2">
                <button
                  @click="projectStore.deleteTaskFromProject(project!.id, task.id)"
                  class="btn btn-square btn-outline"
                >
                  <DeleteIcon />
                </button>

                <button @click="handleOpenEditModal(task)" class="btn btn-square btn-outline">
                  <EditIcon />
                </button>
              </td>
            </tr>

            <tr>
              <th></th>
              <td>
                <input
                  v-model="inputValue"
                  @keypress.enter="handleAddTask"
                  type="text"
                  placeholder="Nueva tarea"
                  class="input input-bordered focus:opacity-100 hover:opacity-100 transition-all opacity-60 w-full"
                />
              </td>
            </tr>
          </tbody>
        </table>

        <CustomModal :open="openModal">
          <template #header>
            <h1 class="">Editar tarea</h1>
          </template>

          <template #body>
            <input
              type="text"
              v-model="editInputValue"
              placeholder="Editar Tarea"
              class="input input-bordered mt-4"
            />
          </template>

          <template #actions>
            <div class="flex gap-2">
              <button @click="openModal = false" class="btn">Cerrar</button>
              <button @click="handleEditTask" type="submit" class="btn btn-primary">Aceptar</button>
            </div>
          </template>
        </CustomModal>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useRouter } from 'vue-router';

import BreadCrums from '@/modules/common/components/BreadCrums.vue';
import CustomModal from '@/modules/common/components/CustomModal.vue';
import DeleteIcon from '@/modules/common/components/icons/DeleteIcon.vue';
import EditIcon from '@/modules/common/components/icons/EditIcon.vue';
import { useTaskManage } from '../composables/useTaskManage';
import { useProjectsStore } from '../store/projects.store';

interface Props {
  id: string;
}
const router = useRouter();
const projectStore = useProjectsStore();
const props = defineProps<Props>();

const {
  handleOpenEditModal,
  handleEditTask,
  handleAddTask,
  project,
  openModal,
  editInputValue,
  inputValue,
} = useTaskManage(props);

watch(
  () => props.id,
  () => {
    project.value = projectStore.getProjectById(props.id);

    !project.value && router.replace('/projects');
  },
  {
    immediate: true,
  },
);
</script>
