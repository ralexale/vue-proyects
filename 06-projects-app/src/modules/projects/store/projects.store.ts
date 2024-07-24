import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { Project, Task } from '../interfaces/project.interfaces';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from '@vueuse/core';

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref(useLocalStorage<Project[]>('projects', []));

  const addProject = (projectName: string) => {
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

  const addTaskToProject = (taskName: string, projectId: string) => {
    const project = getProjectById(projectId);
    project?.tasks.push({
      id: uuidv4(),
      name: taskName,
    });
  };

  const editTaskInProject = (task: Task, projectId: string) => {
    projects.value.forEach((project) => {
      if (project.id === projectId) {
        project.tasks.forEach((t) => {
          if (t.id === task.id) {
            t = task;
          }
        });
      }
    });
  };

  const deleteTaskFromProject = (projectId: string, taskId: string) => {
    const project = getProjectById(projectId);

    const index = project?.tasks.findIndex((t) => t.id === taskId);

    project?.tasks.slice(index, 1);
  };

  return {
    // properties
    projects,

    // getters
    projectList: computed(() => [...projects.value]),
    isProjectListEmpty: computed(() => projects.value.length === 0),

    // actions
    addProject,
    getProjectById,
    addTaskToProject,
    deleteTaskFromProject,
    editTaskInProject,
  };
});
