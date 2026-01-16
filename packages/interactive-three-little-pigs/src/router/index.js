import { createRouter, createWebHistory } from 'vue-router'
import Scene1 from '../views/Scene1.vue'
import Scene2 from '../views/Scene2.vue'
import Scene3 from '../views/Scene3.vue'
import Scene4 from '../views/Scene4.vue'

const routes = [
  {
    path: '/',
    redirect: '/scene1'
  },
  {
    path: '/scene1',
    name: 'Scene1',
    component: Scene1
  },
  {
    path: '/scene2',
    name: 'Scene2',
    component: Scene2
  },
  {
    path: '/scene3',
    name: 'Scene3',
    component: Scene3
  },
  {
    path: '/scene4',
    name: 'Scene4',
    component: Scene4
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
