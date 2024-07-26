import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import SideMenu from '@/modules/projects/components/SideMenu.vue';
import { useProjectsStore } from '@/modules/projects/store/projects.store';
import { fakeProjects } from '../../../mocks/projects.fake';
import { nextTick } from 'vue';

describe('<SideMenu />', () => {
  const wrapper = mount(SideMenu, {
    global: {
      stubs: ['RouterLink'],
      plugins: [createTestingPinia()],
    },
  });

  const store = useProjectsStore();

  beforeEach(() => {
    store.$patch({
      projects: [],
    });
  });

  test('should render with no projects', () => {
    expect(wrapper.html()).toContain('No Hay Proyectos');
  });

  test('should render with projects', async () => {
    store.$patch((state) => {
      state.projects = fakeProjects;
    });
    await nextTick();
    expect(wrapper.html()).not.toContain('No Hay Proyectos');
  });
});
