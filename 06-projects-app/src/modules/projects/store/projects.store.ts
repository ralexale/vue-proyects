import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { Project } from '../interfaces/project.interfaces';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from '@vueuse/core';

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref(useLocalStorage<Project[]>('projects', []));

  const projectsWithCompletion = computed(() => {
    return projects.value.map((project) => {
      const taskNumber = project.tasks.length;
      const completedTasks = project.tasks.filter((task) => !!task.completedAt);
      const percentageTask = Math.round((completedTasks.length / taskNumber) * 100) || 0;

      return {
        id: project.id,
        name: project.name,
        tasksNumber: taskNumber,
        completedTasks: percentageTask,
      };
    });
  });

  const addProject = (projectName: string) => {
    if (projectName.trim().length === 0) return;

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

  const editTaskInProject = (taskId: string, newName: string, projectId: string) => {
    const currentProject = getProjectById(projectId);
    if (!currentProject) return;

    const currentTask = currentProject.tasks.find((t) => t.id === taskId);

    if (!currentTask) return;

    currentTask.name = newName;
  };

  const deleteTaskFromProject = (projectId: string, taskId: string) => {
    const currentProject = getProjectById(projectId);
    const newTasks = currentProject?.tasks.filter((t) => t.id !== taskId);

    projects.value.forEach((p) => {
      if (p.id === projectId) {
        p.tasks = newTasks!;
      }
    });
  };

  const toggleTask = (projectId: string, taskId: string) => {
    const project = getProjectById(projectId);
    if (!project) return;

    const task = project?.tasks.find((task) => task.id === taskId);
    if (!task) return;

    task.completedAt = task.completedAt ? undefined : new Date();
  };

  return {
    // properties
    projects,

    // getters
    projectList: computed(() => [...projects.value]),
    isProjectListEmpty: computed(() => projects.value.length === 0),
    projectsWithCompletion,
    // actions
    addProject,
    getProjectById,
    addTaskToProject,
    deleteTaskFromProject,
    editTaskInProject,
    toggleTask,
  };
});
