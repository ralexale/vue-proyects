import ProjectsLayout from '@/modules/projects/layouts/ProjectsLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: { name: 'projects' },
      component: ProjectsLayout,
      children: [
        {
          name: 'projects',
          path: 'projects',
          component: () => import('@/modules/projects/views/ProjectsView.vue'),
        },
        {
          path: 'project/:id',
          name: 'project',
          props: true,
          component: () => import('@/modules/projects/views/ProjectView.vue'),
        },
      ],
    },
  ],
});

export default router;
