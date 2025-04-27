import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/main',
      name: 'MainPage',
      component: () => import('../pages/MainPage/MainPage.vue'),
      children: [
        
      ]
    }
  ],
});

export default router;
