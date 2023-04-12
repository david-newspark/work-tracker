import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/default/Main.vue'),
      children: [
        {
          path:'',
          name:'Home',
          component: () => import(/* webpackChunkName: "home" */ '@/views/HomeView.vue'),
        },
        {
          path:'/about',
          name:'About',
          component: () => import(/* webpackChunkName: "about" */ '@/views/AboutView.vue'),
        },
        {
          path:'/chart',
          name:'Chart',
          component: () => import(/* webpackChunkName: "chart" */ '@/views/ChartView.vue'),
        }
      ]
    }
  ]
})

export default router
