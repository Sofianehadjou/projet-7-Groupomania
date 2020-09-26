import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueRouter from 'vue-router'
import Routes from './router/index'


Vue.config.productionTip = false

Vue.use(VueRouter)

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
})
new Vue({
  render: h => h(App),
  router: router,
  created: function(){
    document.title = 'Groupomania| Réseau social interne.'
  }
}).$mount('#app')
