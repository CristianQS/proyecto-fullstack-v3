import Vue from 'vue'
import Router from 'vue-router'
import CreateRoom from '@/components/CreateRoom'
import Room from '@/components/Room'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CreateRoom',
      component: CreateRoom
    },
    {
      path: '/Room/:name',
      name: 'Room',
      component: Room
    }
  ]
})
