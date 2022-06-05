import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const requireAuth = (to, from, next) => {
  // 로컬스토리지에 토큰 정보 유무 확인
  const isAuth = localStorage.getItem("token");
  const loginPath = `/login?rPath=${encodeURIComponent(to.path)}`;
  // 로컬스토리지에 토큰이 있으면 페이지 이동, 없으면 로그인 페이지로 이동 (with 인코딩된 URI)
  isAuth ? next() : next(loginPath);
};

const routes = [
  {
    path: "/",
    component: () => import("@/views/home/TheHome"),
    // Home으로 가기 전에 토큰 정보 확인
    beforeEnter: requireAuth,
  },
  {
    path: "/login",
    component: () => import("@/views/login/LogIn"),
  },
  {
    path: "/b/:bid",
    component: () => import("@/views/board/BoardPage"),
    beforeEnter: requireAuth,
    children: [
      {
        path: "c/:cid",
        component: () => import("@/components/card/TheCard"),
        beforeEnter: requireAuth,
      },
    ],
  },
  {
    path: "*",
    redirect: "/404",
  },
  {
    path: "/404",
    component: () => import("@/views/pgNotFound/PageNotFound"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
