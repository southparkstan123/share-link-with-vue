const namespaced = true

const state = {
  title: '',
  message: '',
  code: '',
  show: false
}

const getters = {
  getModalObj: state => state
}

const actions = {
  openMessage ({ commit }, obj) {
    commit('openModal', obj)
  },
  closeMessage ({ commit }) {
    commit('closeModal')
  }
}

const mutations = {
  openModal (state, obj) {
    state.title = (obj.code) ? (obj.code === '200' ? 'Success' : 'Error') : obj.title
    state.message = obj.message
    state.code = obj.code
    state.show = true
  },
  closeModal () {
    state.title = ''
    state.message = ''
    state.code = ''
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
