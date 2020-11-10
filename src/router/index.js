import {routesMap,rout} from "./router.js"
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = routesMap.concat(rout)
console.log(routes)
const router = new VueRouter({
  mode: 'history',
  routes,
//   routesMap
})

export default router