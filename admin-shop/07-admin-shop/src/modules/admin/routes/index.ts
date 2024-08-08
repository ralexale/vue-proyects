import isAdminGuard from '@/modules/auth/guards/is-admin.guard';
import isAuthenticatedGuard from '@/modules/auth/guards/is-authenticated.guard';
import type { RouteRecordRaw } from 'vue-router';

export const adminRoutes: RouteRecordRaw = {
  path: '/admin',
  name: 'admin',
  redirect: { name: 'admin-dashboard' },
  beforeEnter: [isAuthenticatedGuard, isAdminGuard],
  component: () => import('@/modules/admin/layouts/AdminLayout.vue'),
  children: [
    {
      component: () => import('@/modules/admin/views/DashboardView.vue'),
      path: 'dashboard',
      name: 'admin-dashboard',
    },
    {
      component: () => import('@/modules/admin/views/ProductsView.vue'),
      path: 'products',
      name: 'admin-products',
    },
    {
      component: () => import('@/modules/admin/views/ProductView.vue'),
      path: 'products/:productId',
      props: true,
      name: 'admin-product',
    },
  ],
};
