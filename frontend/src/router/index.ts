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
          component: () => import('../pages/MainPage/SubPages/SeminarsPage/SeminarsPage.vue'),
        },
        {
          path: 'chat',
          name: 'ChatPage',
          component: () => import('../pages/MainPage/SubPages/ChatPage/ChatPage.vue'),
        },
        {
          path: 'performance',
          name: 'PerformancePage',
          component: () => import('../pages/MainPage/SubPages/PerformancePage/PerformancePage.vue'),
        },
        {
          path: 'settings',
          name: 'SettingsPage',
          component: () => import('../pages/MainPage/SubPages/SettingsPage/SettingsPage.vue'),
        },
        {
          path: 'topic',
          name: 'TopicsPage',
          component: () => import('../pages/MainPage/SubPages/TopicsPage/TopicsPage.vue'),
        }
      ]
    },
    {
      path: '/auth',
      name: 'AuthPage',
      component: () => import('../pages/AuthPage/AuthPage.vue'),
      redirect: {name: 'LoginForm'},
      children: [
        {
          path: 'login',
          name: 'LoginForm',
          component: () => import('../pages/AuthPage/widgets/loginForm.vue'),
        },
        {
          path: 'signup',
          name: 'SignUpForm',
          component: () => import('../pages/AuthPage/widgets/signUpForm.vue'),
        },
      ]
    }
  ],
});

export default router;
