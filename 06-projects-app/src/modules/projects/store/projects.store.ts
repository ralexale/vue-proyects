import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { Project } from '../interfaces/project.interfaces';

const initialLoad = (): Project[] => {
  return [
    {
      id: 1,
      name: 'Project 1',
      tasks: [],
    },
    {
      id: 2,
      name: 'Project 2',
      tasks: [],
    },
  ];
};

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<Project[]>(initialLoad());

  return {
    // properties
    // projects,

    // getters
    projectList: computed(() => [...projects.value]),

    // actions
  };
});
