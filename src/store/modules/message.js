const namespaced = true

const state = {
  code: '',
  message: '',
  show: false
}

const getters = {
  getMessageObj: state => state
}

const actions = {
  closeMessage ({ commit }) {
    commit('closeMessage')
  }
}

const mutations = {
  setMessage (state, obj) {
    state.code = obj.code
    state.message = obj.message
    state.show = true
  },
  closeMessage () {
    state.code = ''
    state.message = ''
    state.show = false
  }
}
export default {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
