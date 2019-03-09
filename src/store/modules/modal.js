const namespaced = true

const state = {
  title: '',
  message: '',
  code: '',
  type: 'info',
  show: false,
  action_type: '',
  payload: {}
}

const getters = {
  getModalObj: state => state
}

const actions = {
  openModal ({ commit }, obj) {
    commit('openModal', obj)
  },
  closeModal ({ commit }) {
    commit('closeModal')
  }
}

const mutations = {
  openModal (state, obj) {
    state.title = (obj.code) ? (obj.code === '200' ? 'Success' : 'Error') : obj.title
    state.message = obj.message
    state.code = obj.code
    state.type = obj.type
    state.action_type = obj.action_type
    state.payload = obj.payload
    state.show = true
  },
  closeModal () {
    state.title = ''
    state.message = ''
    state.code = ''
    state.type = 'info'
    state.show = false
    state.action_type = ''
    state.payload = {}
  }
}

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
