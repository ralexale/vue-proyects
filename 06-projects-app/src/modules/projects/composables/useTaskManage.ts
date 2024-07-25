import { ref } from 'vue';
import type { Task, Project } from '../interfaces/project.interfaces';
import { useProjectsStore } from '../store/projects.store';

export const useTaskManage = (props: { id: string }) => {
  const currentTask = ref<Task | undefined>();
  const editInputValue = ref('');
  const inputValue = ref('');
  const projectStore = useProjectsStore();

  const project = ref<Project | undefined>();
  const openModal = ref(false);

  const handleAddTask = () => {
    projectStore.addTaskToProject(inputValue.value, props.id);
    inputValue.value = '';
  };

  const handleEditTask = () => {
    if (!currentTask.value) return;

    projectStore.editTaskInProject(currentTask.value.id, editInputValue.value, props.id);
    openModal.value = false;

    inputValue.value = '';
  };

  const handleOpenEditModal = (task: Task) => {
    editInputValue.value = task.name ?? '';
    currentTask.value = task;
    openModal.value = true;
  };

  return {
    inputValue,
    editInputValue,
    openModal,
    handleOpenEditModal,
    handleEditTask,
    handleAddTask,
    project,
  };
};
