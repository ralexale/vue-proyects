import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { Project } from '../interfaces/project.interfaces';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from '@vueuse/core';

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref(useLocalStorage<Project[]>('projects', []));

  const addProyect = (projectName: string) => {
    if (projectName.length === 0) return;

    projects.value.push({
      id: uuidv4(),
      name: projectName,
      tasks: [],
    });
  };

  const getProjectById = (id: string) => {
    return projects.value.find((p) => p.id === id);
  };

  const addTaskToProject = (taskName: string, id: string) => {
    const project = getProjectById(id);
    project?.tasks.push({
      id: uuidv4(),
      name: taskName,
    });
  };

  return {
    // properties
    projects,

    // getters
    projectList: computed(() => [...projects.value]),
    isProjectListEmpty: computed(() => projects.value.length === 0),

    // actions
    addProyect,
    getProjectById,
    addTaskToProject,
  };
});
