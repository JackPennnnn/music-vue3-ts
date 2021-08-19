import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import recommend from '../views/recommend/Recommend.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: recommend,
    children: [
      {
        path: ':id',
        component: () => import('../views/disc/Disc.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
