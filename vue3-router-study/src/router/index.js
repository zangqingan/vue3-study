import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about/:id",
      name: "about",
      // 只有经过身份验证的用户才能创建帖子
      meta: { requiresAuth: true },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
      children: [
        {
          // 当 /about/:id/child1 匹配成功
          // child1 将被渲染到 about 的 <router-view> 内部
          path: "child1",
          component: () => import("../views/child1.vue"),
        },
        {
          // 当 /about/:id/child2 匹配成功
          // child2 将被渲染到 about 的 <router-view> 内部
          path: "child2",
          component: () => import("../views/child2.vue"),
        },
      ],
    },
    {
      path: "/program",
      name: "program",
      component: () => import("../views/program.vue"),
    },
    {
      path: "/nameProp",
      name: "nameProp",
      component: () => import("../views/nameProp.vue"),
    },
    {
      path: "/guide",
      name: "guide",
      component: () => import("../views/guide.vue"),
    },
  ],
});

// 全局前置导航守卫
const isAuthenticated = true;
router.beforeEach((to, from) => {
  if (
    // 检查用户是否已登录
    !isAuthenticated &&
    // ❗️ 避免无限重定向
    to.name !== "Login"
  ) {
    // 将用户重定向到登录页面
    return { name: "Login" };
  }
});
export default router;
