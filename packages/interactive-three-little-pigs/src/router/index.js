import { createRouter, createWebHistory } from 'vue-router'
import Scene1 from '../views/Scene1.vue'
import Scene2 from '../views/Scene2.vue'
import Scene3 from '../views/Scene3.vue'
import Scene4 from '../views/Scene4.vue'
import Scene5 from '../views/Scene5.vue'
import Scene6 from '../views/Scene6.vue'
import Scene7 from '../views/Scene7.vue'

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
  },
  {
    path: '/scene5',
    name: 'Scene5',
    component: Scene5
  },
  {
    path: '/scene6',
    name: 'Scene6',
    component: Scene6
  },
  {
    path: '/scene7',
    name: 'Scene7',
    component: Scene7
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
