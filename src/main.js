// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import VueTweening from 'vue-tweening'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import {auth} from './firebase'

Vue.use(BootstrapVue)
Vue.use(VueTweening)
Vue.config.productionTip = false

/* eslint-disable no-new */
auth.onAuthStateChanged((firebaseUser) => {
  new Vue({
    el: '#app',
    router,
    components: { App },
    store,
    template: '<App/>'
  })
})
