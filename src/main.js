import Vue from 'vue'
import App from './App.vue'
import {
  router
} from './router'
import store from './store'
// ant-design-plugin
import './plugins/ant-design-vue.js'
// 引入全局的样式
import './styles/index.less';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')