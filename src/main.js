import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import {auth} from './firebase'

Vue.use(BootstrapVue)
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
