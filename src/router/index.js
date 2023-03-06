import { createRouter, createWebHistory } from 'vue-router'
import AuthenticationPage from '../views/AuthenticationPage.vue'

const routes = [
  {
    path: '/reg',
    name: 'reg',
    component: AuthenticationPage,
    props: {buttonText:'Зарегистрироваться', url:"registration/"}
  },
  {
    path: '/auth',
    name:'auth',
    component: AuthenticationPage,
    props: {buttonText:'Войти', url:"authorization/"}
  },
  {
    path: '/mess',
    name: 'mess',
    component: () => import('../views/MessagesPage.vue')
  },
  {
    path:'/',
    name:'home',
    component: () => import('../views/HomePage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
