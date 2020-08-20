import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import menu from './modules/menu'
import tab from './modules/tab'
import user from './modules/user'
export default new Vuex.Store({
  modules: {
    menu,
    tab,
    user
  }
})