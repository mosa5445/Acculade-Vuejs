import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/auth/Login.vue')
    },
    {
      path: '/singup',
      name: 'register',
      component: () => import('./views/auth/register.vue')
    },
    {
      path: '/reset-password',
      name: 'rest-password',
      component: () => import('./views/auth/forget-password.vue')
    },
    {
      path: '/reset-password/:token',
      name: 'rest-password-proccess',
      component: () => import('./views/auth/forget-password-procces.vue')
    },
    {
      path: '/admin',
      name: 'dashboard',
      component: () => import('./views/admin/admin.vue')
    },
    {
      path: '/admin/courses',
      name: 'courses',
      component: () => import('./views/admin/courses.vue')
    },
    {
      path: '/admin/new-course',
      name: 'new-course',
      component: () => import('./views/admin/new-course.vue')
    },
    {
      path: '/admin/edit-course/:id/:slug',
      name: 'edit-course',
      component: () => import('./views/admin/edit-course.vue')
    },
    {
      path: '/courses/:slug',
      name: 'singlePage',
      component: () => import('./views/singlePage.vue')
    },
    {
       path: "*", 
       name: '404',
       component: () => import('./views/404.vue')
    }
  ]
})
