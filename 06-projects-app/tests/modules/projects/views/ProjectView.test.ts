import { useProjectsStore } from '@/modules/projects/store/projects.store';
import ProjectView from '@/modules/projects/views/ProjectView.vue';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { fakeProjects } from '../../../mocks/projects.fake';
import { useRouter } from 'vue-router';
import type { Mock } from 'vitest';

vi.mock('vue-router');
vi.mock('@/modules/projects/store/projects.store');

describe('<ProjectView />', () => {
  test('should be render with project', () => {
    (useProjectsStore as any).mockReturnValue({
      projectList: fakeProjects,
      getProjectById: vi.fn().mockReturnValue(fakeProjects[0]),
    });

    const wrapper = mount(ProjectView, {
      props: {
        id: '1',
      },
      global: {
        stubs: ['RouterLink'],
        plugins: [createTestingPinia()],
      },
    });

    const tableRows = wrapper.findAll('tr.hover');
    expect(wrapper.html()).toContain('Project 1');
    expect(tableRows.length).toBe(fakeProjects[0].tasks.length);
  });

  test('should redirect if the project is not found', () => {
    (useProjectsStore as any).mockReturnValue({
      projectList: [],
      getProjectById: vi.fn().mockReturnValue(undefined),
    });
    const replaceSpy = vi.fn();
    (useRouter as Mock).mockReturnValue({
      replace: replaceSpy,
    });
    
    mount(ProjectView, {
      props: {
        id: '1',
      },
      global: {
        stubs: ['RouterLink'],
        plugins: [createTestingPinia()],
      },
    });

    expect(replaceSpy).toHaveBeenCalledWith('/projects');
  });
});
