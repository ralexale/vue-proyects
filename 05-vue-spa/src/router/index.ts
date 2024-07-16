import isAuthenticatedGuard from '@/modules/auth/guard/is-authenticated.guard';
import AuthLayout from '@/modules/auth/layouts/AuthLayout.vue';
import LandingLayout from '@/modules/lading/layouts/LandingLayout.vue';
import HomePage from '@/modules/lading/pages/HomePage.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // landing
    {
      path: '/',

      component: LandingLayout,
      children: [
        {
          path: '/',
          name: 'home',
          component: HomePage,
        },
        {
          path: '/features',
          name: 'features',
          component: () => import('@/modules/lading/pages/FeaturesPage.vue'),
        },
        {
          path: '/pricing',
          name: 'pricing',
          component: () => import('@/modules/lading/pages/PricingPage.vue'),
        },
        {
          path: '/contact',
          name: 'contact',
          component: () => import('@/modules/lading/pages/ContactPage.vue'),
        },
        {
          path: '/pokemon/:id',
          name: 'pokemon',

          // props: true,
          beforeEnter: [isAuthenticatedGuard],
          props: (route) => {
            const id = Number(route.params.id);
            return isNaN(id) ? { id: 1 } : { id };
          },
          component: () => import('@/modules/pokemons/pages/PokemonPage.vue'),
        },
      ],
    },

    // auth

    {
      path: '/auth',
      redirect: 'auth/login',
      component: AuthLayout,
      children: [
        {
          path: 'login',
          component: () => import('@/modules/auth/pages/LoginPage.vue'),
          name: 'login',
        },
        {
          path: 'register',
          component: () => import('@/modules/auth/pages/RegisterPage.vue'),
          name: 'register',
        },
      ],
    },

    // not found
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/modules/common/pages/NotFound404.vue'),
    },
  ],
});

export default router;
