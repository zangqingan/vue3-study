import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/father',
      name: 'father',
      component: () => import('@/views/father.vue')
    }
  ]
})
// 全局路由导航守卫的方法跟vue2中的vue-router一样
// 全局前置路由守卫
router.beforeEach((to, from) => {
  // console.log('路由全局前置守卫', to, from)
  // 返回 false 以取消导航
  // return false
})
// 全局后置路由守卫
router.afterEach((to, from) => {
  // console.log('路由全局后置守卫', to, from)
})
export default router
