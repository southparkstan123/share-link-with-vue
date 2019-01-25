import Vue from 'vue'
import Vuex from 'vuex'
import link from './modules/link'
import user from './modules/user'
import message from './modules/message'
import siteConfig from './modules/siteConfig'
import modal from './modules/modal'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    link,
    user,
    message,
    siteConfig,
    modal
  }
})
