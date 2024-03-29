import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      children: [
        {
          path: "lodash-study",
          name: "LodashStudy",
          component: () => import("@/views/LodashStudy.vue"),
        },
        {
          path: "myTable-study",
          name: "MyTable",
          component: () => import("@/views/MyTable.vue"),
        },
        {
          path: "myForm-study",
          name: "MyForm",
          component: () => import("@/views/MyForm.vue"),
        },
        {
          path: "self-directive",
          name: "SelfDirective",
          component: () => import("@/views/SelfDirective.vue"),
        },
        {
          path: "/system/user",
          name: "User",
          component: () => import("@/views/system/user/index.vue"),
        },
        {
          path: "/system/role",
          name: "Role",
          component: () => import("@/views/system/role/index.vue"),
        },
      ],
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
