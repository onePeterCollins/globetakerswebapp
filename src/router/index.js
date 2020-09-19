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
    path: '/terms',
    name: 'Terms',
    component: () => import('../views/Terms.vue')
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: () => import('../views/Notifications.vue')
  },
  {
    path: '/view-notification',
    name: 'ViewNotification',
    component: () => import('../views/MessageViewer.vue')
  },
  {
    path: '/notifications/view-notification',
    name: 'ViewUserNotification',
    component: () => import('../views/MessageViewer.vue')
  },

  // students
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
    path: '/student-dashboard/active-forums',
    name: 'Active-forums',
    component: () => import('../components/InteractiveSessionMenu.vue')
  },
  {
    path: '/student-dashboard/interactive-forum',
    name: 'Interactive-forum',
    component: () => import('../views/InteractiveForum.vue')
  },
  {
    path: '/student-dashboard/Lectures',
    name: 'Lectures',
    component: () => import('../views/Lectures.vue')
  },
  {
    path: '/student-dashboard/course-access-denied',
    name: 'Course-access-denied',
    component: () => import('../views/CourseAccessDenied.vue')
  },

  // trainers
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
    path: '/trainer-dashboard/lesson-option',
    name: 'Lesson-option',
    component: () => import('../views/TeachingOption.vue')
  },
  {
    path: '/trainer-dashboard/upload-lesson',
    name: 'Upload-lesson',
    component: () => import('../views/UploadLesson.vue')
  },

  // admin
  {
    path: '/proprietor',
    name: 'proprietor',
    component: () => import('../views/Proprietor.vue')
  },
  {
    path: '/admin-dashboard',
    name: 'admin-dashboard',
    component: () => import('../views/Admin.vue')
  },
  {
    path: '/proprietor/student-manager',
    name: 'student-manager',
    component: () => import('../components/StudentManager.vue')
  },
  {
    path: '/proprietor/trainers-manager',
    name: 'trainers-manager',
    component: () => import('../components/TrainersManager.vue')
  },
  {
    path: '/proprietor/forum-manager',
    name: 'forum-manager',
    component: () => import('../views/InteractiveForumManager.vue')
  },
  {
    path: '/proprietor/session-monitor',
    name: 'session-monitor',
    component: () => import('../components/SessionMonitor.vue')
  },
  {
    path: '/proprietor/student-manager/student-inspector',
    name: 'student-inspector',
    component: () => import('../components/StudentInspector.vue')
  },
  {
    path: '/proprietor/trainers-manager/trainer-inspector',
    name: 'trainer-inspector',
    component: () => import('../components/TrainerInspector.vue')
  },
  {
    path: '/proprietor/student-manager/messenger',
    name: 'StudentMessenger',
    component: () => import('../views/StudentMessenger.vue')
  },
  {
    path: '/proprietor/trainers-manager/messenger',
    name: 'TrainerMessenger',
    component: () => import('../views/TrainerMessenger.vue')
  },
  {
    path: '/proprietor/security',
    name: 'admin-security',
    component: () => import('../components/AdminSecurity.vue')
  },


  // catch all
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
