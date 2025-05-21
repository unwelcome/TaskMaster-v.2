import { createRouter, createWebHistory } from 'vue-router';
import { API_GetUserInfo } from '@/api/user.api';
import { useUserStore } from '@/stores/userStore';
import type { IGetUserInfoAnswer } from '@/helpers/constants';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/main',
      name: 'MainPage',
      component: () => import('../pages/MainPage/MainPage.vue'),
      meta: { authRequired: true },
      children: [
        {
          path: 'seminars',
          name: 'SeminarsPage',
          component: () => import('../pages/MainPage/SubPages/SeminarsPage/SeminarsPage.vue'),
          meta: { authRequired: true },
        },
        {
          path: 'chat',
          name: 'ChatPage',
          component: () => import('../pages/MainPage/SubPages/ChatPage/ChatPage.vue'),
          meta: { authRequired: true },
        },
        {
          path: 'performance',
          name: 'PerformancePage',
          component: () => import('../pages/MainPage/SubPages/PerformancePage/PerformancePage.vue'),
          meta: { authRequired: true },
        },
        {
          path: 'settings',
          name: 'SettingsPage',
          component: () => import('../pages/MainPage/SubPages/SettingsPage/SettingsPage.vue'),
          meta: { authRequired: true },
        },
        {
          path: 'topic',
          name: 'TopicsPage',
          component: () => import('../pages/MainPage/SubPages/TopicsPage/TopicsPage.vue'),
          meta: { authRequired: true },
        }
      ]
    },
    {
      path: '/auth',
      name: 'AuthPage',
      component: () => import('../pages/AuthPage/AuthPage.vue'),
      redirect: {name: 'LoginForm'},
      meta: { authRequired: false },
      children: [
        {
          path: 'login',
          name: 'LoginForm',
          component: () => import('../pages/AuthPage/widgets/loginForm.vue'),
          meta: { authRequired: false },
        },
        {
          path: 'signup',
          name: 'SignUpForm',
          component: () => import('../pages/AuthPage/widgets/signUpForm.vue'),
          meta: { authRequired: false },
        },
      ]
    }
  ],
});

router.beforeEach( async (to, from) => {
  const userStore = useUserStore();

  if(userStore.isAuthorized === null){
    try{
      const profileInfo:IGetUserInfoAnswer = await API_GetUserInfo();
      userStore.isAuthorized = true;

      userStore.id = profileInfo.id;
      userStore.first_name = profileInfo.first_name;
      userStore.last_name = profileInfo.last_name;
      userStore.middle_name = profileInfo.middle_name;
      userStore.avatar_url = profileInfo.avatar_url;
    }catch(e){
      userStore.isAuthorized = false;
    }
  }

  if(to.meta.authRequired){
    if(userStore.isAuthorized) {
      return true;
    }
    else return { name: 'AuthPage' };
  }
  return true;
});

export default router;
