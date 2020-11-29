import { createRouter, createWebHashHistory } from 'vue-router'

import Map from './views/map.vue'

const routes = [
  {
    path: '/',
    component: Map,
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router