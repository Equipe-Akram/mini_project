import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const routes = [
  {
    path: '/',
    redirect: '/auth/login',
  },
  {
    path: '/auth',
    component: () => import('@/views/AuthView.vue'),
    children: [
      { path: 'login', component: () => import('@/components/Login.vue') },
      { path: 'register', component: () => import('@/components/LoginForm.vue') },
      { path: 'forgot-password', component: () => import('@/components/ForgotPassword.vue') },
    ],
  },
  {
    path: '/students',
    component: () => import('@/views/StudentsView.vue'),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.accessToken) {
    next('/auth/login');
  } else {
    next();
  }
});

export default router;