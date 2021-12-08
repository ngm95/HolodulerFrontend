import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Schedule from '@/components/Schedule/Schedule'
import Multiview from '@/components/Multiview/Multiview'
import BoardList from '@/components/Board/Board'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/schedule',
      name: 'Schedule',
      component: Schedule
    },
    {
      path: '/multiview',
      name: 'Multiview',
      component: Multiview,
      props: true
    },
    {
      path: '/board',
      name: 'Board',
      component: BoardList
    }
  ]
})
