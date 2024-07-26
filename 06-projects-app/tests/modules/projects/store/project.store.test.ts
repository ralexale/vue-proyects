import { useProjectsStore } from '@/modules/projects/store/projects.store';
import { createPinia, setActivePinia } from 'pinia';
import { fakeProjects } from '../../../mocks/projects.fake';

describe('project store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  test('should return default values', () => {
    const {
      addProject,
      getProjectById,
      addTaskToProject,
      deleteTaskFromProject,
      editTaskInProject,
      toggleTask,
      projectsWithCompletion,
      isProjectListEmpty,
      projects,
      projectList,
    } = useProjectsStore();

    expect(isProjectListEmpty).toBe(true);

    expect(projectsWithCompletion).toEqual([]);
    expect(projects).toEqual([]);
    expect(projectList).toEqual([]);

    expect(getProjectById).toBeInstanceOf(Function);
    expect(editTaskInProject).toBeInstanceOf(Function);
    expect(addTaskToProject).toBeInstanceOf(Function);
    expect(deleteTaskFromProject).toBeInstanceOf(Function);
    expect(toggleTask).toBeInstanceOf(Function);
    expect(addProject).toBeInstanceOf(Function);
  });

  test('should add a project when calling addProject', () => {
    const newTaskName = 'New Task';
    const store = useProjectsStore();

    expect(store.projectList.length).toBe(0);

    store.addProject(newTaskName);
    expect(store.projectList.length).toBe(1);

    expect(store.projectList[0]).toEqual({
      id: expect.any(String),
      name: newTaskName,
      tasks: [],
    });
  });

  test('should load from local storage', () => {
    localStorage.setItem('projects', JSON.stringify(fakeProjects));

    const store = useProjectsStore();

    const [project1, project2] = store.projectList;

    expect(store.projectList.length).toBe(3);
    expect(project1).toEqual({
      ...fakeProjects[0],
      tasks: expect.any(Array),
    });
    expect(project2).toEqual({
      ...fakeProjects[1],
      tasks: expect.any(Array),
    });
  });

  test('should add a task to a project', () => {
    const store = useProjectsStore();
    store.addProject('Project 1');
    const project = store.projectList[0];
    const taskName = 'Task 1';

    store.addTaskToProject(taskName, project.id);

    expect(project.tasks.length).toBe(1);
    expect(project.tasks[0]).toEqual({
      name: taskName,
      id: expect.any(String),
      completedAt: undefined,
    });
  });

  test('toggle a task', () => {
    const store = useProjectsStore();

    store.addProject('Project 1');
    const project = store.projectList[0];
    const taskName = 'Task 1';

    store.addTaskToProject(taskName, project.id);

    store.toggleTask(project.id, project.tasks[0].id);

    expect(project.tasks.at(0)!.completedAt).toEqual(expect.any(Date));
  });

  test('should return the project with completion', () => {
    const store = useProjectsStore();
    store.$patch((state) => {
      state.projects = fakeProjects;
    });

    expect(store.projectsWithCompletion).toEqual([
      {
        id: '1',
        name: 'Project 1',
        tasksNumber: 4,
        completedTasks: 25,
      },
      {
        id: '2',
        name: 'Project 2',
        tasksNumber: 0,
        completedTasks: 0,
      },
      {
        id: '3',
        name: 'Project 3',
        tasksNumber: 2,
        completedTasks: 50,
      },
    ]);
  });
});
