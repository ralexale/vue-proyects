<template>
  <aside class="bg-base-200 w-72 min-h-screen">
    <h2 class="text-lg font-bold mx-4">Proyectos</h2>
    <p v-if="projectStore.isProjectListEmpty" class="text-sm text-gray-500 mx-4">
      No Hay Proyectos
    </p>

    <ul v-else class="menu rounded-box w-56">
      <li v-for="project in projectStore.projectList" :key="project.id">
        <template v-if="project.tasks.length !== 0">
          <details>
            <summary>
              <RouterLink :to="`/project/${project.id}`">{{ project.name }}</RouterLink>
            </summary>
            <ul>
              <li v-for="tasks in project.tasks" :key="tasks.id">
                <RouterLink :to="`/project/${project.id}`">{{ tasks.name }}</RouterLink>
              </li>
            </ul>
          </details></template
        >

        <template v-else>
          <RouterLink :to="`/project/${project.id}`">{{ project.name }}</RouterLink>
        </template>
      </li>
    </ul>
  </aside>
</template>

<script lang="ts" setup>
import { useProjectsStore } from '../store/projects.store';

const projectStore = useProjectsStore();
</script>
