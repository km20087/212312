import {getMenuByRouter} from "@/libs/util"
import { routesMap } from '@/router/router.js'

const state = {
    routerList: routesMap,
  }
const getters = {
    menuList: (state) => getMenuByRouter(state.routerList, 'all')
  }

  export default {
    state,
    getters,
  }