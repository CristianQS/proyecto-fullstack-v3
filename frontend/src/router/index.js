import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Room from '@/components/Room'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/Room/:name',
      name: 'Room',
      component: Room
    }
  ]
})
