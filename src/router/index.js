import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/Index'
import Addsmoothie from '../components/Addsmoothie'
import EditSmoothie from '../components/EditSmoothie'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name:  'index',
      component: index
    },
    {
      path: '/add-smoothie',
      name: 'Addsmoothie',
      component: Addsmoothie
    },
    {
      path: '/adit-smoothie/:smoothie_slug',
      name: 'EditSmoothie',
      component: EditSmoothie
    }
  ]
})
