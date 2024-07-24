<template>
  <div class="full p-4 flex flex-col gap-4">
    <section>
      <bread-crums :name="project?.name ?? ''" />
    </section>

    <section>
      <div class="overflow-x-auto">
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th class="w-14">Completada</th>
              <th>Tarea</th>
              <th>Completada en</th>
            </tr>
          </thead>
          <tbody>
            <!-- row 2 -->
            <tr class="hover">
              <th>2</th>
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
              <td>Purple</td>
            </tr>

            <tr class="hover">
              <th></th>
              <td>
                <input
                  v-model="inputValue"
                  @keypress.enter="projectStore.addTaskToProject(inputValue, project?.id!)"
                  type="text"
                  placeholder="Nueva tarea"
                  class="input input-bordered focus:opacity-100 hover:opacity-100 transition-all opacity-60 w-full"
                />
              </td>

              <td>Purple</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import BreadCrums from '@/modules/common/components/BreadCrums.vue';
import { useProjectsStore } from '../store/projects.store';
import type { Project } from '../interfaces/project.interfaces';

interface Props {
  id: string;
}
const inputValue = ref('');
const projectStore = useProjectsStore();
const router = useRouter();
const props = defineProps<Props>();
const project = ref<Project | undefined>();

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

// const route = useRoute();
</script>
