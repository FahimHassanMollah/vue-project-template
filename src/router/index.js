import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home/Home.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/Login.vue')
    },
    {
      path: '/blogs',
      name: 'blogList',
      component: () => import('../views/blogs/BlogList.vue')
    }
  ]
})

export default router
