import { createRouter, createWebHashHistory } from 'vue-router'
import login from '../views/login.vue'
import signup from '../views/signup.vue'
import newsfeed from '../views/newsfeed.vue';
import control from '../views/control.vue'
import edit from '../views/edit.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/signup',
    name: 'signup',
    component: signup
  },
  {
    path: '/newsfeed',
    name: 'newsfeed',
    component: newsfeed
  },
  {
    path: '/control',
    name: 'control',
    component: control
  },
  {
    path: '/edit',
    name: 'edit',
    component: edit
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
