import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import MainPage from '../views/MainPage.vue';
import { useUserStore } from '../stores/user'; // Assuming Pinia for state management

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/',
    name: 'Main',
    component: MainPage,
    beforeEnter: (to, from, next) => {
      // Simple guard: redirect to login if not authenticated
      const userStore = useUserStore();
      if (!userStore.isAuthenticated) {
        next({ name: 'Login' });
      } else {
        next();
      }
    },
  },
  // Redirect unknown paths to login or main depending on auth state
   {
      path: '/:pathMatch(.*)*',
      redirect: () => {
          const userStore = useUserStore();
          return userStore.isAuthenticated ? '/' : '/login';
      },
   }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;