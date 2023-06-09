import { createRouter, createWebHistory } from 'vue-router'
import auth from '../middleware/auth';
import middlewarePipeline from './helper/middlewarePipeline';
import store from '../store';
import guest from '../middleware/guest';
import PageNotFound from '../components/partials/PageNotFound.vue' 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home/Home.vue'),
      meta: {
        middleware: [auth]
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/Login.vue'),
      meta: {
        middleware: [guest]
      }
     
    },
    {
      path: '/blogs',
      name: 'blogList',
      component: () => import('../views/blogs/BlogList.vue'),
      meta: {
        middleware: [auth]
      }
    
    },
    {
      path: '/blog-create',
      name: 'blogCreate',
      component: () => import('../views/blogs/BlogCreate.vue'),
      meta: {
        middleware: [auth]
      }
    
    },
    {
      path: '/blog-edit/:id',
      name: 'blogEdit',
      component: () => import('../views/blogs/BlogEdit.vue'),
      meta: {
        middleware: [auth]
      }
    
    },
    { path: '/:pathMatch(.*)*',name:'notFound', component: PageNotFound },
  ]
})



router.beforeEach((to, from, next) => {
  console.log("beforeEach");

  /** Navigate to next if middleware is not applied */
  if (!to.meta.middleware) {
      return next()
  }
  console.log('asdf');

  const middleware = to.meta.middleware;
  const context = {
    to,
    from,
    next,
    store
  }

  return middleware[0]({
      ...context,
      next:middlewarePipeline(context, middleware,1)
  })
})

export default router
