import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import fastClick from 'fastclick'
import VueLazyload from "vue-lazyload";

import toast from './components/common/toast'

Vue.config.productionTip = false

// 将$bus作为事件总线（跨多级组件发射和监听事件）
Vue.prototype.$bus = new Vue();

// 安装插件
Vue.use(toast);  // 会自动去执行toast/index.js中的install方法
Vue.use(VueLazyload,{
  loading: require('./assets/img/common/placeholder.png')
});

// 解决移动端300ms延迟
fastClick.attach(document.body);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
