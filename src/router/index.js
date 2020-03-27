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
    path: '/student-dashboard/learning-option',
    name: 'Learning-option',
    component: () => import('../views/LearningOption.vue')
  },
  {
    path: '/student-dashboard/course-access-denied',
    name: 'Course-access-denied',
    component: () => import('../views/CourseAccessDenied.vue')
  },
  {
    path: '/student-dashboard/Lectures',
    name: 'Lectures',
    component: () => import('../views/Lectures.vue')
  },
  {
    path: '/trainer',
    name: 'Trainer',
    component: () => import('../views/Trainer.vue')
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
