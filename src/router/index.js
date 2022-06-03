import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('@/views/home/TheHome'),
  },
  {
    path: '/login',
    component: () => import('@/views/login/LogIn'),
  },
  {
    path: '/b/:bid',
    component: () => import('@/views/board/BoardPage'),
    children: [
      {
        path: 'c/:cid',
        component: () => import('@/components/card/TheCard'),
      },
    ],
  },
  {
    path: '*',
    redirect: '/404',
  },
  {
    path: '/404',
    component: () => import('@/views/pgNotFound/PageNotFound'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
