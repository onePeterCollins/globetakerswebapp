import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact.vue')
  },
  {
    path: '/student-dashboard',
    name: 'Student-dashboard',
    component: () => import('../views/StudentDashboard.vue')
  },
  {
    path: '/trainer',
    name: 'Trainer',
    component: () => import('../views/Contact.vue')
  },
  {
    path: '/trainer-dashboard',
    name: 'Trainer-dashboard',
    component: () => import('../views/TrainerDashboard.vue')
  },
  {
    path: '/*',
    name: 'Uncharted',
    component: () => import('../views/Uncharted.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
