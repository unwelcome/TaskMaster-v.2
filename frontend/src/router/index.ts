import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/main',
      name: 'MainPage',
      component: () => import('../pages/MainPage/MainPage.vue'),
      children: [
        {
          path: 'seminars',
          name: 'SeminarsPage',
          component: () => import('../pages/MainPage/SubPages/SeminarsPage/SeminarsPage.vue')
        }
      ]
    }
  ],
});

export default router;
